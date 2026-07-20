import { BookOpen, Clock, PlayCircle, Lock, Award, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function CourseSyllabusPage({ params }: { params: Promise<{ courseId: string }> }) {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const { courseId } = await params;

  // Fetch course data from DB
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      tutor: true,
      subject: true,
      modules: {
        orderBy: { sortOrder: 'asc' },
        include: {
          lessons: {
            orderBy: { sortOrder: 'asc' }
          }
        }
      },
      enrollments: {
        where: { studentId: session.user.id }
      }
    }
  });

  if (!course) {
    return <div className="p-8 text-center text-text-secondary">Course not found.</div>;
  }

  const enrollment = course.enrollments[0];
  const progressPct = enrollment ? enrollment.progressPct : 0;
  
  // Format tutor name
  const tutorName = course.tutor ? `${course.tutor.firstName} ${course.tutor.lastName}` : "Unknown Instructor";

  // Calculate total lessons
  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);

  // Determine the first lesson ID for the "Continue Learning" button
  let nextLessonId = course.modules[0]?.lessons[0]?.id || "";

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-20">
      {/* Course Header */}
      <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-white/10 blur-3xl transform rotate-12 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4 text-primary-100 text-sm font-medium">
              {course.subject && <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">{course.subject.name}</span>}
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{course.title}</h1>
            <p className="text-primary-100 mb-6 leading-relaxed max-w-3xl whitespace-pre-wrap">
              {course.description}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                   {tutorName.charAt(0)}
                </div>
                {tutorName}
              </div>
              <div className="flex items-center gap-2 text-primary-100">
                <BookOpen className="w-4 h-4" /> {course.modules.length} Modules
              </div>
              <div className="flex items-center gap-2 text-primary-100">
                <Award className="w-4 h-4" /> Certificate of Completion
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-xl p-6 text-text-primary shadow-xl w-full md:w-72 shrink-0">
            {enrollment ? (
              <>
                <h3 className="font-bold text-lg mb-2">Your Progress</h3>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-display font-bold text-primary-600">{Number(progressPct)}%</span>
                  <span className="text-sm text-text-secondary mb-1">Completed</span>
                </div>
                <div className="w-full bg-bg-tertiary rounded-full h-2 mb-6">
                  <div className="bg-primary-500 h-2 rounded-full transition-all" style={{ width: `${Number(progressPct)}%` }}></div>
                </div>
                {nextLessonId ? (
                  <Link href={`/student/courses/${course.id}/lessons/${nextLessonId}`} className="btn btn-primary w-full">
                    {Number(progressPct) > 0 ? "Continue Learning" : "Start Course"}
                  </Link>
                ) : (
                  <button disabled className="btn w-full bg-bg-tertiary text-text-tertiary">No lessons available</button>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                 <Lock className="w-10 h-10 text-text-tertiary mx-auto mb-3" />
                 <h3 className="font-bold text-lg mb-2">Not Enrolled</h3>
                 <p className="text-sm text-text-secondary mb-4">You are not currently enrolled in this course.</p>
                 <button className="btn btn-primary w-full shadow-lg hover:shadow-primary-500/25">Enroll Now</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Syllabus */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-text-primary">Course Syllabus</h2>
        
        {course.modules.length === 0 ? (
           <div className="card p-12 text-center text-text-secondary border border-dashed border-glass-border">
             No modules have been added to this course yet.
           </div>
        ) : (
          <div className="space-y-4">
            {course.modules.map((module, mIdx) => (
              <div key={module.id} className="card p-0 overflow-hidden border border-glass-border">
                <div className="bg-bg-tertiary p-4 md:px-6 border-b border-glass-border flex justify-between items-center">
                  <h3 className="font-bold text-lg text-text-primary">{module.title}</h3>
                  <span className="text-sm text-text-secondary">{module.lessons.length} lessons</span>
                </div>
                <div className="divide-y divide-glass-border">
                  {module.lessons.map((lesson, lIdx) => {
                    // Placeholder logic: assume first module first lesson is unlocked, others locked if no progress
                    // We can refine this later with real progress tracking records
                    const isCompleted = false; 
                    const isLocked = !enrollment; // For now, if not enrolled, it's locked.
                    
                    return (
                      <div key={lesson.id} className={`p-4 md:px-6 flex items-center justify-between transition-colors ${isLocked ? 'bg-bg-secondary/50 opacity-75' : 'hover:bg-bg-secondary'}`}>
                        <div className="flex items-center gap-4">
                          {isCompleted ? (
                            <CheckCircle2 className="w-6 h-6 text-secondary-500 shrink-0" />
                          ) : isLocked ? (
                            <Lock className="w-6 h-6 text-text-tertiary shrink-0" />
                          ) : lesson.contentType === 'VIDEO' ? (
                            <PlayCircle className="w-6 h-6 text-primary-400 shrink-0" />
                          ) : (
                            <FileText className="w-6 h-6 text-accent-400 shrink-0" />
                          )}
                          
                          <div>
                            <h4 className={`font-medium ${isLocked ? 'text-text-secondary' : 'text-text-primary'}`}>
                              {mIdx + 1}.{lIdx + 1} {lesson.title}
                            </h4>
                            <p className="text-xs text-text-tertiary mt-1 flex items-center gap-1">
                              {lesson.contentType === 'VIDEO' ? <PlayCircle className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                              {lesson.contentType === 'VIDEO' ? 'Video' : 'Document'} • {lesson.durationMinutes || 0} mins
                            </p>
                          </div>
                        </div>

                        {!isLocked && (
                          <Link href={`/student/courses/${course.id}/lessons/${lesson.id}`} className="btn btn-ghost btn-sm">
                            {isCompleted ? 'Review' : 'Start'}
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
