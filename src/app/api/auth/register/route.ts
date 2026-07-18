import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Input validation schema
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  role: z.enum(["STUDENT", "TUTOR", "PARENT"]),
  secretCode: z.string().optional(),
  specializations: z.array(z.string()).optional(),
});

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

    const { email, password, firstName, lastName, role, secretCode, specializations } = validatedData.data;

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

    // Use a Prisma transaction to ensure all related records are created together
    const newUser = await prisma.$transaction(async (tx) => {
      // 1. Create User
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
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
      // PARENT doesn't have a specific parent profile table in this schema, 
      // they use ParentStudentLink to map to students.

      return user;
    });

    // TODO: Send verification email here (mocking for now)
    console.log(`[Email Mock] Sent Welcome & Verification email to ${newUser.email}`);

    return NextResponse.json(
      { message: "User registered successfully", userId: newUser.id },
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
