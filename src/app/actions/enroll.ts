"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function enrollInCourse(courseId: string) {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  // Check if already enrolled
  const existing = await prisma.courseEnrollment.findUnique({
    where: {
      courseId_studentId: {
        courseId,
        studentId: session.user.id
      }
    }
  });

  if (!existing) {
    // Enroll the user
    await prisma.courseEnrollment.create({
      data: {
        courseId,
        studentId: session.user.id,
        status: "ACTIVE",
        progressPct: 0
      }
    });

    // Also simulate creating an invoice/payment if it's not a free course
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (course && course.price && Number(course.price) > 0) {
      await prisma.invoice.create({
        data: {
          userId: session.user.id,
          amount: course.price,
          currency: course.currency,
          status: "PAID",
          dueDate: new Date(),
        }
      });
    }
  }

  revalidatePath("/student");
  revalidatePath("/student/courses");
  redirect("/student/courses");
}
