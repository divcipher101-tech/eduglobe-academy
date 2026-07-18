import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Users, GraduationCap, TrendingUp, AlertCircle, Calendar, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function ParentDashboard() {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

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
        <div className="bg-white p-6 rounded-2xl border border-glass-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Linked Children</p>
            <h3 className="text-2xl font-bold text-text-primary">{totalChildren}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-glass-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-success-50 text-success-600 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Active Enrollments</p>
            <h3 className="text-2xl font-bold text-text-primary">{activeCourses}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-glass-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-warning-50 text-warning-600 flex items-center justify-center shrink-0">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {children.map(child => (
            <div key={child.id} className="bg-white rounded-2xl border border-glass-border shadow-sm overflow-hidden flex flex-col group hover:border-primary-300 transition-all">
              <div className="p-6 border-b border-glass-border flex items-center gap-4 bg-bg-secondary/50">
                <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xl border-2 border-white shadow-sm">
                  {child.firstName[0]}{child.lastName[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{child.firstName} {child.lastName}</h3>
                  <p className="text-sm text-text-secondary">Student ID: {child.id.substring(0, 8)}</p>
                </div>
                <Link href={`/parent/children`} className="ml-auto text-sm font-bold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                  Details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-6 flex-1">
                <h4 className="text-sm font-bold text-text-tertiary uppercase tracking-wider mb-4">Enrolled Courses</h4>
                {child.courseEnrollments.length > 0 ? (
                  <div className="space-y-4">
                    {child.courseEnrollments.map(enrollment => (
                      <div key={enrollment.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary text-sm">{enrollment.course.title}</p>
                            <div className="w-full h-1.5 bg-bg-tertiary rounded-full mt-2 w-32">
                              <div className="h-full bg-success-500 rounded-full" style={{ width: `${Number(enrollment.progressPct)}%` }}></div>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-success-600">{Number(enrollment.progressPct)}%</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-secondary italic">Not enrolled in any courses.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming & Alerts (Mock Data for Enterprise Dashboard feel) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        <div className="bg-white rounded-2xl border border-glass-border shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-danger-500" />
            <h3 className="text-lg font-bold text-text-primary">Recent Alerts</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-danger-50 border border-danger-100 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-danger-500 mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-danger-900">Missed Assignment</p>
                <p className="text-sm text-danger-700 mt-1">David missed the deadline for "Algebraic Fractions Quiz" in IGCSE Mathematics.</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-warning-50 border border-warning-100 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-warning-500 mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-warning-900">Low Attendance</p>
                <p className="text-sm text-warning-700 mt-1">Sarah has missed 2 Live Classes this week.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-glass-border shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-primary-500" />
            <h3 className="text-lg font-bold text-text-primary">Upcoming Schedule</h3>
          </div>
          <div className="space-y-0">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4 p-4 border-b border-glass-border last:border-0 hover:bg-bg-secondary transition-colors">
                <div className="text-center shrink-0 w-12">
                  <p className="text-xs font-bold text-text-tertiary uppercase">Oct</p>
                  <p className="text-xl font-bold text-text-primary">{24 + i}</p>
                </div>
                <div>
                  <p className="font-bold text-text-primary">Physics Live Session</p>
                  <p className="text-sm text-text-secondary mt-1">Sarah • 10:00 AM - 11:30 AM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
