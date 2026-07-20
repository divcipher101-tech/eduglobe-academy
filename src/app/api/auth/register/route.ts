import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Input validation schema
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Password must contain at least one number or special character"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  role: z.enum(["STUDENT", "TUTOR", "PARENT"]), // ADMIN is strictly excluded here
  secretCode: z.string().optional(),
  specializations: z.array(z.string()).optional(),
});

// Common TempMail domains to block
const BLOCKED_DOMAINS = ["tempmail.com", "10minutemail.com", "mailinator.com", "yopmail.com", "guerrillamail.com"];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = registerSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: validatedData.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName, phone, dateOfBirth, role, secretCode, specializations } = validatedData.data;

    // TempMail Check
    const domain = email.split("@")[1]?.toLowerCase();
    if (BLOCKED_DOMAINS.includes(domain)) {
      return NextResponse.json(
        { message: "Disposable email addresses are not allowed. Please use a real email." },
        { status: 403 }
      );
    }

    // Secret Code Authorization Check
    if (role === "TUTOR") {
      const validSecret = process.env.TUTOR_SECRET_CODE || "EDUGLOBE-TUTOR-2026";
      if (secretCode !== validSecret) {
        return NextResponse.json(
          { message: "Invalid authorization code for Tutor registration." },
          { status: 403 }
        );
      }
    }

    if (role === "PARENT") {
      const validSecret = process.env.PARENT_SECRET_CODE || "EDUGLOBE-PARENT-2026";
      if (secretCode !== validSecret) {
        return NextResponse.json(
          { message: "Invalid authorization phrase for Parent registration." },
          { status: 403 }
        );
      }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "A user with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Get the corresponding Role record from DB
    const roleRecord = await prisma.role.findUnique({
      where: { name: role },
    });

    if (!roleRecord) {
      return NextResponse.json(
        { message: "Internal server error: Role not found in database" },
        { status: 500 }
      );
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    let parsedDob: Date | null = null;
    if (dateOfBirth) {
      parsedDob = new Date(dateOfBirth);
    }

    // Use a Prisma transaction to ensure all related records are created together
    const newUser = await prisma.$transaction(async (tx) => {
      // 1. Create User
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
          phone,
          dateOfBirth: parsedDob,
          isEmailVerified: false,
          emailVerificationToken: otpCode
        },
      });

      // 2. Assign Role
      await tx.userRole.create({
        data: {
          userId: user.id,
          roleId: roleRecord.id,
        },
      });

      // 3. Create specific profile based on role
      if (role === "STUDENT") {
        await tx.studentProfile.create({
          data: {
            userId: user.id,
          },
        });
      } else if (role === "TUTOR") {
        await tx.tutorProfile.create({
          data: {
            userId: user.id,
            specializations: specializations || [],
          },
        });
      }

      return user;
    });

    // TODO: Connect to Resend to actually email the code!
    console.log(`\n\n=========================================`);
    console.log(`🚨 [OTP GENERATED FOR ${newUser.email}] 🚨`);
    console.log(`CODE: ${otpCode}`);
    console.log(`=========================================\n\n`);

    return NextResponse.json(
      { message: "User registered successfully. Please verify your email.", userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("[AUTH_REGISTER_ERROR]", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
