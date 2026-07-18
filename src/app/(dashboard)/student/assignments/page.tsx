"use client";

import { FileText, Clock, CheckCircle2, AlertCircle, FileUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const assignments = [
  {
    id: "assn-1",
    title: "Algebraic Fractions Practice",
    course: "IGCSE Mathematics",
    dueDate: "Today, 11:59 PM",
    status: "PENDING",
    points: 20,
    urgent: true,
  },
  {
    id: "assn-2",
    title: "Quantum Mechanics Essay",
    course: "A-Level Physics",
    dueDate: "Fri, Oct 25, 11:59 PM",
    status: "PENDING",
    points: 50,
    urgent: false,
  },
  {
    id: "assn-3",
    title: "Python Data Structures Lab",
    course: "Introduction to Python Programming",
    dueDate: "Mon, Oct 28, 11:59 PM",
    status: "SUBMITTED",
    points: 100,
    urgent: false,
  },
  {
    id: "assn-4",
    title: "Shakespeare Character Analysis",
    course: "IGCSE English Literature",
    dueDate: "Last Week",
    status: "GRADED",
    points: 100,
    score: 92,
    urgent: false,
  }
];

export default function AssignmentsDashboard() {
  const pendingCount = assignments.filter(a => a.status === "PENDING").length;
  
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">My Assignments</h1>
          <p className="text-text-secondary">You have {pendingCount} assignments left to complete.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <h3 className="text-2xl font-bold text-text-primary">1</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-glass-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success-50 text-success-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Graded</p>
            <h3 className="text-2xl font-bold text-text-primary">1</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-glass-border overflow-hidden shadow-sm">
        <div className="border-b border-glass-border px-6 py-4 bg-bg-secondary flex justify-between items-center">
          <h2 className="text-lg font-bold text-text-primary">All Assignments</h2>
        </div>
        
        <div className="divide-y divide-glass-border">
          {assignments.map((assignment) => (
            <Link 
              key={assignment.id} 
              href={`/student/assignments/${assignment.id}`}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 hover:bg-bg-secondary transition-colors group"
            >
              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider",
                    assignment.status === "PENDING" && assignment.urgent ? "bg-danger-100 text-danger-700" :
                    assignment.status === "PENDING" ? "bg-warning-100 text-warning-700" :
                    assignment.status === "SUBMITTED" ? "bg-info-100 text-info-700" :
                    "bg-success-100 text-success-700"
                  )}>
                    {assignment.status}
                  </span>
                  {assignment.status === "GRADED" && (
                    <span className="text-xs font-bold px-2 py-1 rounded-md bg-bg-tertiary text-text-secondary">
                      {assignment.score}/{assignment.points} Points
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-primary-600 transition-colors truncate">
                  {assignment.title}
                </h3>
                <p className="text-sm font-medium text-text-secondary truncate">
                  {assignment.course}
                </p>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 sm:gap-8 border-t sm:border-t-0 border-glass-border pt-4 sm:pt-0 mt-2 sm:mt-0">
                <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                  <Clock className="w-4 h-4 text-text-tertiary" />
                  <span className={cn(assignment.urgent && "text-danger-600 font-bold")}>
                    Due {assignment.dueDate}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white border border-glass-border flex items-center justify-center text-text-tertiary group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-all shadow-sm">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
