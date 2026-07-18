import { BookOpen, Clock, PlayCircle, Lock, Award, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function CourseSyllabusPage({ params }: { params: Promise<{ courseId: string }> }) {
  const session = await auth();
  const unwrappedParams = await params;

  // Mock course data
  const course = {
    id: unwrappedParams.courseId,
    title: "IGCSE Additional Mathematics (0606)",
    description: "Master the fundamentals of Additional Mathematics with comprehensive video lessons, interactive quizzes, and AI-powered tutoring support tailored for the Cambridge IGCSE syllabus.",
    instructor: "Dr. Alan Smith",
    progress: 12,
    modules: [
      {
        id: "m1",
        title: "Module 1: Functions",
        lessons: [
          { id: "l1", title: "Introduction to Functions & Mappings", duration: "14:20", type: "video", completed: true },
          { id: "l2", title: "Composite Functions", duration: "22:15", type: "video", completed: true },
          { id: "l3", title: "Inverse Functions", duration: "18:45", type: "video", completed: false },
          { id: "l4", title: "Functions Assignment", duration: "45:00", type: "quiz", completed: false },
        ]
      },
      {
        id: "m2",
        title: "Module 2: Quadratic Functions",
        lessons: [
          { id: "l5", title: "Completing the Square", duration: "25:10", type: "video", completed: false },
          { id: "l6", title: "Maximum and Minimum Values", duration: "19:30", type: "video", completed: false },
          { id: "l7", title: "Quadratic Inequalities", duration: "21:00", type: "video", completed: false },
        ]
      },
      {
        id: "m3",
        title: "Module 3: Equations, Inequalities and Graphs",
        lessons: [
          { id: "l8", title: "Solving Simultaneous Equations", duration: "28:15", type: "video", completed: false, locked: true },
          { id: "l9", title: "Modulus Functions", duration: "24:40", type: "video", completed: false, locked: true },
        ]
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-20">
      {/* Course Header */}
      <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4 text-primary-100 text-sm font-medium">
              <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Mathematics</span>
              <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">IGCSE</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{course.title}</h1>
            <p className="text-primary-100 mb-6 leading-relaxed max-w-3xl">
              {course.description}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                   {course.instructor.charAt(0)}
                </div>
                {course.instructor}
              </div>
              <div className="flex items-center gap-2 text-primary-100">
                <BookOpen className="w-4 h-4" /> 3 Modules
              </div>
              <div className="flex items-center gap-2 text-primary-100">
                <Award className="w-4 h-4" /> Certificate of Completion
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-xl p-6 text-text-primary shadow-xl w-full md:w-72 shrink-0">
            <h3 className="font-bold text-lg mb-2">Your Progress</h3>
            <div className="flex justify-between items-end mb-2">
              <span className="text-3xl font-display font-bold text-primary-600">{course.progress}%</span>
              <span className="text-sm text-text-secondary mb-1">Completed</span>
            </div>
            <div className="w-full bg-bg-tertiary rounded-full h-2 mb-6">
              <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
            </div>
            <Link href={`/student/courses/${course.id}/lessons/${course.modules[0].lessons[2].id}`} className="btn btn-primary w-full">
              Continue Learning
            </Link>
          </div>
        </div>
      </div>

      {/* Syllabus */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-text-primary">Course Syllabus</h2>
        
        <div className="space-y-4">
          {course.modules.map((module, mIdx) => (
            <div key={module.id} className="card p-0 overflow-hidden border border-glass-border">
              <div className="bg-bg-tertiary p-4 md:px-6 border-b border-glass-border flex justify-between items-center">
                <h3 className="font-bold text-lg text-text-primary">{module.title}</h3>
                <span className="text-sm text-text-secondary">{module.lessons.length} lessons</span>
              </div>
              <div className="divide-y divide-glass-border">
                {module.lessons.map((lesson, lIdx) => (
                  <div key={lesson.id} className={`p-4 md:px-6 flex items-center justify-between transition-colors ${lesson.locked ? 'bg-bg-secondary/50 opacity-75' : 'hover:bg-bg-secondary'}`}>
                    <div className="flex items-center gap-4">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-secondary-500 shrink-0" />
                      ) : lesson.locked ? (
                        <Lock className="w-6 h-6 text-text-tertiary shrink-0" />
                      ) : lesson.type === 'video' ? (
                        <PlayCircle className="w-6 h-6 text-primary-400 shrink-0" />
                      ) : (
                        <FileText className="w-6 h-6 text-accent-400 shrink-0" />
                      )}
                      
                      <div>
                        <h4 className={`font-medium ${lesson.locked ? 'text-text-secondary' : 'text-text-primary'}`}>
                          {mIdx + 1}.{lIdx + 1} {lesson.title}
                        </h4>
                        <p className="text-xs text-text-tertiary mt-1 flex items-center gap-1">
                          {lesson.type === 'video' ? <PlayCircle className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                          {lesson.type === 'video' ? 'Video' : 'Assignment'} • {lesson.duration}
                        </p>
                      </div>
                    </div>

                    {!lesson.locked && (
                      <Link href={`/student/courses/${course.id}/lessons/${lesson.id}`} className="btn btn-ghost btn-sm">
                        {lesson.completed ? 'Review' : 'Start'}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
