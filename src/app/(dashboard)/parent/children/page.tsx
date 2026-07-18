import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Plus, Link as LinkIcon, UserPlus, BookOpen, Star, AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function ChildrenDirectory() {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  const parentLinks = await prisma.parentStudentLink.findMany({
    where: { parentId: session.user.id },
    include: {
      student: {
        include: {
          courseEnrollments: { include: { course: true } },
          assignmentSubmissions: { include: { assignment: true } },
          quizAttempts: { include: { quiz: true } },
        }
      }
    }
  });

  const children = parentLinks.map(link => link.student);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Children Directory</h1>
          <p className="text-text-secondary mt-1">Manage and track your linked student accounts</p>
        </div>
        <button className="btn btn-primary shadow-sm shadow-primary-500/20">
          <LinkIcon className="w-4 h-4 mr-2" /> Link New Child
        </button>
      </div>

      {children.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-glass-border text-center shadow-sm">
          <div className="w-16 h-16 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-text-tertiary" />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">No Children Linked</h3>
          <p className="text-text-secondary max-w-md mx-auto mb-8">
            You haven't linked any student accounts yet. Ask your child for their Student Link Code found in their settings.
          </p>
          <div className="max-w-sm mx-auto flex gap-2">
            <input 
              type="text" 
              placeholder="Enter Student Link Code..." 
              className="flex-1 px-4 py-3 rounded-xl border border-glass-border focus:border-primary-500 outline-none"
            />
            <button className="btn btn-primary px-6">Link</button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {children.map(child => (
            <div key={child.id} className="bg-white rounded-3xl border border-glass-border shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-start">
                
                {/* Child Profile Column */}
                <div className="w-full md:w-72 shrink-0 flex flex-col items-center text-center p-6 bg-bg-secondary rounded-2xl border border-glass-border">
                  <div className="w-24 h-24 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-3xl border-4 border-white shadow-sm mb-4">
                    {child.firstName[0]}{child.lastName[0]}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">{child.firstName} {child.lastName}</h3>
                  <p className="text-sm text-text-secondary mb-4">{child.email}</p>
                  
                  <div className="w-full space-y-2 mt-auto">
                    <div className="flex justify-between text-sm p-3 bg-white rounded-xl border border-glass-border">
                      <span className="text-text-secondary">Enrolled</span>
                      <span className="font-bold text-text-primary">{child.courseEnrollments.length} Courses</span>
                    </div>
                    <div className="flex justify-between text-sm p-3 bg-white rounded-xl border border-glass-border">
                      <span className="text-text-secondary">Quizzes</span>
                      <span className="font-bold text-text-primary">{child.quizAttempts.length} Completed</span>
                    </div>
                  </div>
                </div>

                {/* Child Academics Column */}
                <div className="flex-1 w-full space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary-500" /> Active Courses
                    </h4>
                    {child.courseEnrollments.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {child.courseEnrollments.map(enrollment => (
                          <div key={enrollment.id} className="p-4 border border-glass-border rounded-xl hover:bg-bg-secondary transition-colors">
                            <p className="font-bold text-text-primary mb-1 truncate">{enrollment.course.title}</p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-text-secondary">Progress</span>
                              <span className="font-bold text-success-600">{Number(enrollment.progressPct)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-bg-tertiary rounded-full mt-2">
                              <div className="h-full bg-success-500 rounded-full" style={{ width: `${Number(enrollment.progressPct)}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-text-secondary italic bg-bg-secondary p-4 rounded-xl">No active courses.</p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-warning-500" /> Recent Grades
                    </h4>
                    {child.quizAttempts.length > 0 || child.assignmentSubmissions.length > 0 ? (
                      <div className="space-y-3">
                        {child.quizAttempts.map(attempt => (
                          <div key={attempt.id} className="flex items-center justify-between p-4 border border-glass-border rounded-xl">
                            <div>
                              <p className="font-bold text-text-primary text-sm">{attempt.quiz.title}</p>
                              <p className="text-xs text-text-secondary">Quiz</p>
                            </div>
                            <span className="px-3 py-1 bg-success-50 text-success-700 font-bold text-sm rounded-lg border border-success-200">
                              {Number(attempt.score)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-text-secondary italic bg-bg-secondary p-4 rounded-xl">No recent grades available.</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
