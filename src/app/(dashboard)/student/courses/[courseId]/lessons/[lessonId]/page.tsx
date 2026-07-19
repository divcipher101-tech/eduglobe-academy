import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LessonViewerClient from "./LessonViewerClient";

export default async function LessonPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const unwrappedParams = await params;

  // Verify enrollment
  const enrollment = await prisma.courseEnrollment.findFirst({
    where: {
      courseId: unwrappedParams.courseId,
      studentId: session.user.id
    }
  });

  if (!enrollment) {
    redirect(`/student/courses/${unwrappedParams.courseId}`);
  }

  // Fetch lesson data
  const lesson = await prisma.courseLesson.findUnique({
    where: { id: unwrappedParams.lessonId },
    include: {
      module: {
        include: {
          course: {
            include: {
              modules: {
                orderBy: { sortOrder: 'asc' },
                include: {
                  lessons: {
                    orderBy: { sortOrder: 'asc' }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!lesson || lesson.module.courseId !== unwrappedParams.courseId) {
    return <div className="p-8 text-center text-text-secondary">Lesson not found.</div>;
  }

  // We need to pass curriculum data (all modules and lessons) to the sidebar
  const curriculum = lesson.module.course.modules;

  return (
    <LessonViewerClient 
      courseId={unwrappedParams.courseId} 
      lesson={lesson} 
      curriculum={curriculum} 
    />
  );
}
