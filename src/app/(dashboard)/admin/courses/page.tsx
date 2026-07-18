import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { BookOpen, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";

export default async function AdminCourses() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const courses = await prisma.course.findMany({
    include: { tutor: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8 animate-fade-in-up max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Course Management
          </h1>
          <p className="text-text-secondary">
            Review, approve, and manage all courses created by tutors.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-glass-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-secondary border-b border-glass-border">
                <th className="px-6 py-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Tutor</th>
                <th className="px-6 py-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-text-tertiary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg ${course.thumbnailUrl || 'bg-primary-100'} flex items-center justify-center shrink-0`}>
                        <BookOpen className="w-5 h-5 text-white mix-blend-overlay" />
                      </div>
                      <div>
                        <Link href={`/courses/${course.id}`} className="font-bold text-text-primary hover:text-primary-600 transition-colors">
                          {course.title}
                        </Link>
                        <div className="text-sm text-text-secondary mt-1">
                          {course.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {course.tutor ? (
                      <span className="font-medium text-text-primary">{course.tutor.firstName} {course.tutor.lastName}</span>
                    ) : (
                      <span className="text-text-secondary italic">No Tutor Assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-text-primary">
                    {course.currency === 'NGN' ? '₦' : course.currency}{Number(course.price).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {course.status === 'PUBLISHED' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-success-50 text-success-700 border border-success-200">
                        <CheckCircle className="w-3 h-3 mr-1" /> Published
                      </span>
                    )}
                    {course.status === 'DRAFT' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-warning-50 text-warning-700 border border-warning-200">
                        <Clock className="w-3 h-3 mr-1" /> Draft
                      </span>
                    )}
                    {course.status === 'ARCHIVED' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-bg-tertiary text-text-secondary border border-glass-border">
                        <XCircle className="w-3 h-3 mr-1" /> Archived
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-bg-secondary text-text-secondary hover:bg-bg-tertiary transition-colors border border-glass-border">
                        Edit
                      </button>
                      <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors border border-primary-200">
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {courses.length === 0 && (
          <div className="p-12 text-center text-text-secondary">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-text-tertiary" />
            <p className="text-lg font-medium text-text-primary">No courses found</p>
            <p>Courses created by tutors will appear here for review.</p>
          </div>
        )}
      </div>
    </div>
  );
}
