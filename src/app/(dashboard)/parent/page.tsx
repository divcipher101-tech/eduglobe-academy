import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Users, GraduationCap, TrendingUp, AlertCircle, Calendar, ChevronRight, BookOpen, Clock, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function ParentDashboard() {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "PARENT") redirect("/login");

  // Fetch children
  const parentLinks = await prisma.parentStudentLink.findMany({
    where: { parentId: session.user.id },
    include: {
      student: {
        include: {
          courseEnrollments: { include: { course: true } },
          assignmentSubmissions: true
        }
      }
    }
  });

  const children = parentLinks.map(link => link.student);
  
  // Calculate mock or real metrics
  const totalChildren = children.length;
  const activeCourses = children.reduce((acc, child) => acc + child.courseEnrollments.length, 0);
  
  // Mock recent grades for display
  const recentGrades = [
    { subject: "A-Level Physics", grade: "A*", date: "2 days ago" },
    { subject: "IGCSE Mathematics", grade: "A", date: "1 week ago" },
    { subject: "Secondary English", grade: "B+", date: "2 weeks ago" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Parent Portal</h1>
          <p className="text-text-secondary mt-1">Monitor your children's academic progress</p>
        </div>
        <Link href="/parent/children" className="btn btn-primary shadow-sm shadow-primary-500/20">
          <Users className="w-4 h-4 mr-2" /> Link New Child
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-glass-border shadow-sm flex items-center gap-4 group hover:border-primary-300 transition-colors">
          <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Linked Children</p>
            <h3 className="text-2xl font-bold text-text-primary">{totalChildren}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-glass-border shadow-sm flex items-center gap-4 group hover:border-success-300 transition-colors">
          <div className="w-12 h-12 rounded-full bg-success-50 text-success-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Active Enrollments</p>
            <h3 className="text-2xl font-bold text-text-primary">{activeCourses}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-glass-border shadow-sm flex items-center gap-4 group hover:border-warning-300 transition-colors">
          <div className="w-12 h-12 rounded-full bg-warning-50 text-warning-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Average Score</p>
            <h3 className="text-2xl font-bold text-text-primary">85%</h3>
          </div>
        </div>
      </div>

      {/* Children Overview */}
      <h2 className="text-xl font-bold text-text-primary pt-4">Your Children</h2>
      {children.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-glass-border text-center shadow-sm">
          <div className="w-16 h-16 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-text-tertiary" />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">No Children Linked Yet</h3>
          <p className="text-text-secondary max-w-md mx-auto mb-6">
            Link your child's account to start monitoring their grades, attendance, and course progress.
          </p>
          <Link href="/parent/children" className="btn btn-primary mx-auto">
            Link a Child Account
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {children.map(child => (
            <div key={child.id} className="bg-white rounded-3xl border border-glass-border shadow-sm overflow-hidden flex flex-col group hover:border-primary-300 transition-all">
              {/* Child Header Card */}
              <div className="p-8 border-b border-glass-border flex flex-col md:flex-row md:items-center justify-between gap-6 bg-bg-secondary/30">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white flex items-center justify-center font-display font-bold text-3xl shadow-lg shadow-primary-500/20">
                    {child.firstName[0]}{child.lastName[0]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-text-primary">{child.firstName} {child.lastName}</h3>
                    <p className="text-sm font-medium text-primary-600 bg-primary-50 inline-flex px-3 py-1 rounded-full mt-2">Student ID: {child.id.substring(0, 8)}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="btn btn-secondary bg-white">View Full Report</button>
                  <button className="btn btn-secondary bg-white text-primary-600 border-primary-200 hover:bg-primary-50">Message Tutors</button>
                </div>
              </div>
              
              <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Courses */}
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="font-bold text-text-primary border-b border-glass-border pb-2">Active Courses & Progress</h4>
                  {child.courseEnrollments.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {child.courseEnrollments.map(enrollment => (
                        <div key={enrollment.id} className="p-4 rounded-xl border border-glass-border bg-bg-secondary/20 hover:bg-bg-secondary/50 transition-colors">
                          <h5 className="font-bold text-text-primary mb-2 line-clamp-1">{enrollment.course.title}</h5>
                          <div className="flex justify-between text-xs text-text-secondary font-medium mb-1.5">
                            <span>Progress</span>
                            <span>{Number(enrollment.progressPct) || 0}%</span>
                          </div>
                          <div className="w-full bg-glass-border rounded-full h-2">
                            <div className="bg-primary-500 h-2 rounded-full transition-all" style={{ width: `${Number(enrollment.progressPct) || 0}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-glass-border text-center text-sm text-text-secondary">
                      No active enrollments for this child.
                    </div>
                  )}
                </div>

                {/* Recent Grades */}
                <div className="space-y-4">
                  <h4 className="font-bold text-text-primary border-b border-glass-border pb-2">Recent Grades</h4>
                  <div className="space-y-3">
                    {recentGrades.map((grade, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-glass-border bg-white hover:border-success-300 transition-colors group/grade">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-success-50 text-success-600 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text-primary line-clamp-1">{grade.subject}</p>
                            <p className="text-xs text-text-tertiary">{grade.date}</p>
                          </div>
                        </div>
                        <div className="text-lg font-display font-bold text-success-600 bg-success-50 px-2 py-0.5 rounded-md">
                          {grade.grade}
                        </div>
                      </div>
                    ))}
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
