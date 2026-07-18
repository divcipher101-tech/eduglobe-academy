import { FileText, Clock, CheckCircle2, AlertCircle, FileUp, ArrowRight, ClipboardList } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AssignmentsDashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch real assignments
  // To get a student's pending assignments, we typically find assignments for courses they are enrolled in.
  const enrollments = await prisma.courseEnrollment.findMany({
    where: { studentId: session.user.id },
    include: { course: true }
  });

  const courseIds = enrollments.map(e => e.courseId);

  // For this simplified version, let's fetch submissions the user has, and active assignments in their courses.
  // Since we haven't seeded real assignments for courses yet, we will just use their submissions list.
  const submissions = await prisma.assignmentSubmission.findMany({
    where: { studentId: session.user.id },
    include: {
      assignment: {
        include: { course: true }
      }
    },
    orderBy: { submittedAt: 'desc' }
  });

  // Since brand new students won't have assignments (because no courses and no assignments seeded),
  // we map the real data (which will be empty) to the UI.
  const pendingCount = submissions.filter(s => s.status === "RESUBMIT").length;
  const submittedCount = submissions.filter(s => s.status === "SUBMITTED").length;
  const gradedCount = submissions.filter(s => s.status === "GRADED").length;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">My Assignments</h1>
          <p className="text-text-secondary">
            {submissions.length === 0 
              ? "You have no assignments yet." 
              : `You have ${pendingCount} assignments left to complete.`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80">
        <div className="bg-white rounded-2xl p-6 border border-glass-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-danger-50 text-danger-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Pending</p>
            <h3 className="text-2xl font-bold text-text-primary">{pendingCount}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-glass-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-info-50 text-info-600 flex items-center justify-center shrink-0">
            <FileUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Submitted</p>
            <h3 className="text-2xl font-bold text-text-primary">{submittedCount}</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-glass-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success-50 text-success-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Graded</p>
            <h3 className="text-2xl font-bold text-text-primary">{gradedCount}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-glass-border overflow-hidden shadow-sm">
        <div className="border-b border-glass-border px-6 py-4 bg-bg-secondary flex justify-between items-center">
          <h2 className="text-lg font-bold text-text-primary">All Assignments</h2>
        </div>
        
        {submissions.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
             <ClipboardList className="w-16 h-16 text-text-tertiary mb-4" />
             <h3 className="text-xl font-bold text-text-primary mb-2">No Assignments Found</h3>
             <p className="text-text-secondary max-w-md">
               You don't have any assignments yet. When your tutors assign homework or projects, they will appear here.
             </p>
          </div>
        ) : (
          <div className="divide-y divide-glass-border">
            {submissions.map((sub) => (
              <Link 
                key={sub.id} 
                href={`/student/assignments/${sub.assignmentId}`}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 hover:bg-bg-secondary transition-colors group"
              >
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={cn(
                      "text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider",
                      sub.status === "RESUBMIT" ? "bg-danger-100 text-danger-700" :
                      sub.status === "SUBMITTED" ? "bg-info-100 text-info-700" :
                      "bg-success-100 text-success-700"
                    )}>
                      {sub.status}
                    </span>
                    {sub.status === "GRADED" && (
                      <span className="text-xs font-bold px-2 py-1 rounded-md bg-bg-tertiary text-text-secondary">
                        {Number(sub.marksObtained)}/{Number(sub.assignment.totalMarks)} Points
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-primary-600 transition-colors truncate">
                    {sub.assignment.title}
                  </h3>
                  <p className="text-sm font-medium text-text-secondary truncate">
                    {sub.assignment.course.title}
                  </p>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 sm:gap-8 border-t sm:border-t-0 border-glass-border pt-4 sm:pt-0 mt-2 sm:mt-0">
                  <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                    <Clock className="w-4 h-4 text-text-tertiary" />
                    <span className={cn(sub.status === "RESUBMIT" && "text-danger-600 font-bold")}>
                      Due {new Date(sub.assignment.dueDate!).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border border-glass-border flex items-center justify-center text-text-tertiary group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-all shadow-sm">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
