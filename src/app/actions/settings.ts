"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const dateOfBirthStr = formData.get("dateOfBirth") as string;

  let dateOfBirth: Date | null = null;
  if (dateOfBirthStr) {
    dateOfBirth = new Date(dateOfBirthStr);
  }

  // Update user in DB
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      firstName,
      lastName,
      email, // Optionally we could require re-verification if email changes, but simple update for now
      phone,
      dateOfBirth
    }
  });

  revalidatePath("/(dashboard)/student/settings", "page");
  revalidatePath("/(dashboard)/tutor/settings", "page");
  revalidatePath("/(dashboard)/parent/settings", "page");
  revalidatePath("/(dashboard)/admin/settings", "page");

  return { success: true };
}

export async function updatePassword(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) {
    throw new Error("New passwords do not match.");
  }

  // Find user to get current password hash
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user || !user.passwordHash) {
    throw new Error("Account not found or password not set.");
  }

  // Verify old password
  const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isValid) {
    throw new Error("Incorrect current password.");
  }

  // Hash new password
  const passwordHash = await bcrypt.hash(newPassword, 12);

  // Update DB
  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash }
  });

  return { success: true };
}
