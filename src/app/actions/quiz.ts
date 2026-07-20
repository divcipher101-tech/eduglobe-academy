"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function getQuizForTaking(quizId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        orderBy: { sortOrder: 'asc' },
        include: {
          options: {
            orderBy: { sortOrder: 'asc' },
            select: {
              id: true,
              optionText: true,
              questionId: true,
              sortOrder: true,
              // Intentionally NOT selecting isCorrect here so the client doesn't know the answer
            }
          }
        }
      }
    }
  });

  if (!quiz) throw new Error("Quiz not found");

  // Check if they already attempted
  const previousAttempts = await prisma.quizAttempt.count({
    where: { quizId, studentId: session.user.id }
  });

  if (previousAttempts >= quiz.maxAttempts) {
    throw new Error(`You have reached the maximum number of attempts (${quiz.maxAttempts})`);
  }

  return quiz;
}

export async function submitQuizAttempt(
  quizId: string, 
  studentAnswers: { questionId: string; selectedOptionId: string }[]
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        include: {
          options: true
        }
      }
    }
  });

  if (!quiz) throw new Error("Quiz not found");

  // Determine attempt number
  const prevAttemptsCount = await prisma.quizAttempt.count({
    where: { quizId, studentId: session.user.id }
  });

  if (prevAttemptsCount >= quiz.maxAttempts) {
    throw new Error("Max attempts reached");
  }

  const attemptNumber = prevAttemptsCount + 1;
  let totalEarnedScore = 0;
  
  // Grade each answer
  const gradedAnswers = studentAnswers.map(ans => {
    const question = quiz.questions.find(q => q.id === ans.questionId);
    if (!question) return null;

    const selectedOption = question.options.find(o => o.id === ans.selectedOptionId);
    const isCorrect = !!selectedOption?.isCorrect;
    const marksAwarded = isCorrect ? Number(question.marks) : 0;

    totalEarnedScore += marksAwarded;

    return {
      questionId: question.id,
      selectedOptionId: ans.selectedOptionId,
      isCorrect,
      marksAwarded: new Prisma.Decimal(marksAwarded)
    };
  }).filter(Boolean) as any[];

  // Calculate pass/fail
  const passed = quiz.passingMarks ? totalEarnedScore >= Number(quiz.passingMarks) : null;

  // Save attempt
  const attempt = await prisma.quizAttempt.create({
    data: {
      quizId,
      studentId: session.user.id,
      attemptNumber,
      score: new Prisma.Decimal(totalEarnedScore),
      passed,
      completedAt: new Date(),
      answers: {
        create: gradedAnswers
      }
    }
  });

  revalidatePath("/(dashboard)/student/quizzes");
  revalidatePath(`/(dashboard)/student/quizzes/${quizId}/take`);

  return {
    attemptId: attempt.id,
    score: totalEarnedScore,
    passed,
    totalMarks: Number(quiz.totalMarks)
  };
}
