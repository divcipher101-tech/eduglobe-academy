"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitQuizAttempt(quizId: string, score: number, timeSpentSec: number) {
  const session = await auth();
  
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  // Create the quiz attempt
  await prisma.quizAttempt.create({
    data: {
      quizId,
      studentId: session.user.id,
      score,
      timeSpentSec,
      status: "GRADED",
      startedAt: new Date(Date.now() - timeSpentSec * 1000),
      completedAt: new Date(),
    }
  });

  revalidatePath("/student/quizzes");
  revalidatePath("/student");
}
