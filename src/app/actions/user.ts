"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(formData: FormData) {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Only Admins can perform this action");
  }

  const userId = formData.get("userId") as string;
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    // Soft delete: We cannot hard delete easily without wiping out course enrollments, payments, etc.
    // Setting isActive to false prevents login, and randomizing the email frees it up for re-registration.
    await prisma.user.update({
      where: { id: userId },
      data: { 
        isActive: false,
        email: `deleted_${Date.now()}_${userId}@eduglobe.local`
      }
    });

    revalidatePath("/admin/users");
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Failed to delete user.");
  }
}
