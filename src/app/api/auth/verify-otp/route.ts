import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ message: "Email and code are required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    if (user.isEmailVerified) {
      return NextResponse.json({ message: "Email already verified." }, { status: 400 });
    }

    if (user.emailVerificationToken !== code) {
      return NextResponse.json({ message: "Invalid verification code." }, { status: 400 });
    }

    // Mark as verified and clear token
    await prisma.user.update({
      where: { email },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null
      }
    });

    return NextResponse.json({ message: "Email verified successfully." }, { status: 200 });

  } catch (error) {
    console.error("[OTP_VERIFY_ERROR]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
