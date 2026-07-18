import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, PlayCircle, Clock, CheckCircle } from "lucide-react";

export default async function MyCoursesPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch real enrollments from the database
  const enrollments = await prisma.courseEnrollment.findMany({
    where: { studentId: session.user.id },
    include: {
      course: {
        include: {
          subject: true,
          tutor: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          My Courses
        </h1>
        <p className="text-text-secondary">
          Track your progress and continue where you left off.
        </p>
      </div>

      {enrollments.length === 0 ? (
        <div className="card flex flex-col items-center justify-center p-16 text-center border border-dashed border-glass-border">
          <div className="w-20 h-20 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center mb-6">
            <BookOpen className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">No Courses Found</h2>
          <p className="text-text-secondary mb-8 max-w-md">
            You are not currently enrolled in any courses. Explore our catalog to find your next subject!
          </p>
          <Link href="/courses" className="btn btn-primary">
            Browse Course Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => (
            <Link 
              key={enrollment.id}
              href={`/student/courses/${enrollment.course.slug || enrollment.courseId}`} 
              className="block card p-0 overflow-hidden flex flex-col group cursor-pointer hover:shadow-xl transition-all border border-glass-border hover:border-primary-300"
            >
              <div className="w-full h-48 bg-bg-tertiary relative flex shrink-0 items-center justify-center group-hover:bg-primary-50 transition-colors">
                 {/* Placeholder thumbnail */}
                 <PlayCircle className="w-16 h-16 text-text-tertiary group-hover:text-primary-500 transition-colors z-10" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md uppercase tracking-wider">
                    {enrollment.course.subject?.name || "Subject"}
                  </span>
                  {enrollment.status === "COMPLETED" && (
                    <span className="text-xs font-bold text-success-600 bg-success-50 px-2 py-1 rounded-md flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Completed
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {enrollment.course.title}
                </h3>
                
                {enrollment.course.tutor && (
                  <p className="text-sm text-text-secondary mb-4">
                    Tutor: {enrollment.course.tutor.firstName} {enrollment.course.tutor.lastName}
                  </p>
                )}
                
                <div className="mt-auto pt-4 border-t border-glass-border">
                  <div className="flex justify-between text-xs text-text-secondary font-medium mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Progress
                    </span>
                    <span>{enrollment.progressPct ? Number(enrollment.progressPct).toFixed(0) : 0}%</span>
                  </div>
                  <div className="w-full bg-bg-tertiary rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-primary-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${enrollment.progressPct || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
          
          {/* Mock up for demonstration if they only have a few real courses */}
          {enrollments.length > 0 && (
            <Link href="/student/courses/crs-101" className="block card p-0 overflow-hidden flex flex-col group cursor-pointer hover:shadow-xl transition-all border border-glass-border hover:border-secondary-300 opacity-60 grayscale hover:grayscale-0">
              <div className="w-full h-48 bg-bg-tertiary relative flex shrink-0 items-center justify-center group-hover:bg-secondary-50 transition-colors">
                 <PlayCircle className="w-16 h-16 text-text-tertiary group-hover:text-secondary-500 transition-colors z-10" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-secondary-600 bg-secondary-50 px-2 py-1 rounded-md uppercase tracking-wider">
                    IGCSE Mathematics
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-secondary-600 transition-colors">
                  Algebraic Fractions (Demo)
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Tutor: Mock Data
                </p>
                <div className="mt-auto pt-4 border-t border-glass-border">
                  <div className="flex justify-between text-xs text-text-secondary font-medium mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Progress
                    </span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-bg-tertiary rounded-full h-2.5 overflow-hidden">
                    <div className="bg-secondary-500 h-2.5 rounded-full transition-all" style={{ width: "65%" }} />
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
