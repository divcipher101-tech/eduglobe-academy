"use client";

import { useState } from "react";
import { ArrowLeft, Clock, FileText, UploadCloud, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { use } from "react";

export default function AssignmentDetailPage({ params }: { params: Promise<{ assignmentId: string }> }) {
  const resolvedParams = use(params);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [textSubmission, setTextSubmission] = useState("");

  const assignment = {
    id: resolvedParams.assignmentId,
    title: "Algebraic Fractions Practice",
    course: "IGCSE Mathematics",
    dueDate: "Today, 11:59 PM",
    points: 20,
    status: isSubmitted ? "SUBMITTED" : "PENDING",
    urgent: true,
    description: `
      <p>Please complete the following exercises on algebraic fractions. Show all your working out clearly.</p>
      <br/>
      <p><strong>Tasks:</strong></p>
      <ul>
        <li>Simplify the expressions on page 42, questions 1-15 (odd numbers only).</li>
        <li>Solve the equations on page 45, questions 2, 4, and 6.</li>
      </ul>
      <br/>
      <p>You may submit your answers by typing them below, or by uploading a scanned PDF of your handwritten work.</p>
    `
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up pb-12">
      <Link href="/student/assignments" className="inline-flex items-center text-sm font-bold text-text-secondary hover:text-primary-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Assignments
      </Link>

      <div className="bg-white rounded-3xl border border-glass-border overflow-hidden shadow-xl shadow-primary-900/5">
        {/* Header */}
        <div className="p-8 md:p-10 border-b border-glass-border bg-gradient-to-br from-bg-secondary to-white">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={cn(
              "text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider",
              assignment.status === "PENDING" && assignment.urgent ? "bg-danger-100 text-danger-700" :
              assignment.status === "PENDING" ? "bg-warning-100 text-warning-700" :
              "bg-success-100 text-success-700"
            )}>
              {assignment.status}
            </span>
            <span className="text-sm font-bold text-text-secondary bg-white px-3 py-1.5 rounded-lg border border-glass-border shadow-sm">
              {assignment.points} Points Possible
            </span>
            <span className="text-sm font-bold text-text-secondary bg-white px-3 py-1.5 rounded-lg border border-glass-border shadow-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-500" /> Due {assignment.dueDate}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4 leading-tight">
            {assignment.title}
          </h1>
          <p className="text-lg font-medium text-text-secondary">
            {assignment.course}
          </p>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 prose prose-primary max-w-none border-b border-glass-border text-text-primary" dangerouslySetInnerHTML={{ __html: assignment.description }}>
        </div>

        {/* Submission Area */}
        <div className="p-8 md:p-10 bg-bg-secondary">
          <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-500" /> 
            Your Submission
          </h2>

          {isSubmitted ? (
            <div className="bg-success-50 border-2 border-success-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center animate-fade-in-up">
              <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-success-800 mb-2">Assignment Submitted Successfully!</h3>
              <p className="text-success-600 font-medium">Your work has been sent to your tutor for grading. You&apos;ll receive a notification when it&apos;s graded.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* File Upload Box */}
              <div className="border-2 border-dashed border-primary-200 hover:border-primary-400 bg-white rounded-2xl p-8 transition-colors group cursor-pointer text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">Click to upload files</h3>
                <p className="text-sm text-text-secondary font-medium">or drag and drop PDF, Word, or Image files here</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-px bg-glass-border flex-1"></div>
                <span className="text-xs font-bold text-text-tertiary uppercase tracking-widest">OR</span>
                <div className="h-px bg-glass-border flex-1"></div>
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">
                  Text Submission
                </label>
                <textarea 
                  value={textSubmission}
                  onChange={(e) => setTextSubmission(e.target.value)}
                  className="w-full h-48 p-4 bg-white border border-glass-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none text-text-primary"
                  placeholder="Type your answers here..."
                ></textarea>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Assignment
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
