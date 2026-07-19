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
    // Delete the user from the database. 
    // Prisma cascading deletes should handle related records (sessions, accounts, roles, profiles, etc.)
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users");
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Failed to delete user. They might have related records preventing deletion.");
  }
}
