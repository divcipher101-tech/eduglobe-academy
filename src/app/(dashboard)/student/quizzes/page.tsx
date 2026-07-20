import { HelpCircle, Clock, Trophy, PlayCircle, BarChart2, CheckCircle2, FileQuestion } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function QuizzesDashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch real quiz attempts
  const attempts = await prisma.quizAttempt.findMany({
    where: { studentId: session.user.id },
    include: {
      quiz: {
        include: { course: true }
      }
    },
    orderBy: { startedAt: 'desc' }
  });

  // Fetch available quizzes that haven't been maxed out
  const allQuizzes = await prisma.quiz.findMany({
    include: { course: true },
    where: { status: "PUBLISHED" }
  });

  const availableQuizzes = allQuizzes.filter(q => {
    const attemptCount = attempts.filter(a => a.quizId === q.id).length;
    return attemptCount < q.maxAttempts;
  });

  const completedAttempts = attempts.filter(a => a.completedAt);
  const averageScore = completedAttempts.length > 0
    ? completedAttempts.reduce((acc, curr) => acc + (Number(curr.score) || 0), 0) / completedAttempts.length 
    : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">My Quizzes</h1>
          <p className="text-text-secondary">
            Test your knowledge and track your progress.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-glass-border shadow-sm flex items-center gap-4 hover:border-warning-300 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-warning-50 text-warning-600 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Available Quizzes</p>
            <h3 className="text-2xl font-bold text-text-primary">{availableQuizzes.length}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-glass-border shadow-sm flex items-center gap-4 hover:border-success-300 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-success-50 text-success-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Completed</p>
            <h3 className="text-2xl font-bold text-text-primary">{completedAttempts.length}</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-glass-border shadow-sm flex items-center gap-4 hover:border-primary-300 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Average Score</p>
            <h3 className="text-2xl font-bold text-text-primary">{averageScore.toFixed(0)}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Quizzes */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Clock className="w-5 h-5 text-warning-500" /> Available to Take
          </h2>
          {availableQuizzes.length === 0 && <p className="text-sm text-text-tertiary p-4 border border-dashed border-glass-border rounded-xl text-center">No new quizzes available right now.</p>}
          {availableQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-2xl border border-glass-border p-6 shadow-sm hover:shadow-md hover:border-primary-300 transition-all group flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold text-primary-700 bg-primary-100 px-2 py-1 rounded-md uppercase tracking-wider">
                  New Quiz
                </span>
                <div className="flex items-center gap-3 text-sm font-medium text-text-secondary">
                  <span className="flex items-center gap-1"><HelpCircle className="w-4 h-4"/> {quiz.timeLimitMin || '--'} mins</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-primary-600 transition-colors">
                {quiz.title}
              </h3>
              <p className="text-sm font-medium text-text-secondary mb-6">
                {quiz.course?.title || "General Assessment"}
              </p>
              <Link 
                href={`/student/quizzes/${quiz.id}/take`}
                className="w-full py-2.5 px-4 bg-primary-50 hover:bg-primary-600 text-primary-700 hover:text-white rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 mt-auto"
              >
                <PlayCircle className="w-5 h-5" /> Start Quiz
              </Link>
            </div>
          ))}
        </div>

        {/* Completed Quizzes */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success-500" /> Completed
          </h2>
          {completedAttempts.length === 0 && <p className="text-sm text-text-tertiary p-4 border border-dashed border-glass-border rounded-xl text-center">No completed quizzes.</p>}
          {completedAttempts.map((attempt) => (
            <div key={attempt.id} className="bg-white rounded-2xl border border-glass-border p-6 shadow-sm flex flex-col hover:border-glass-border/80">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold text-success-700 bg-success-100 px-2 py-1 rounded-md uppercase tracking-wider">
                  Completed
                </span>
                <span className={cn(
                  "text-lg font-bold px-3 py-1 rounded-lg",
                  Number(attempt.score) >= (Number(attempt.quiz.passingMarks) || 50) ? "text-success-700 bg-success-50" : 
                  "text-danger-700 bg-danger-50"
                )}>
                  {Number(attempt.score)} / {Number(attempt.quiz.totalMarks)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-1">
                {attempt.quiz.title}
              </h3>
              <p className="text-sm font-medium text-text-secondary mb-6">
                {attempt.quiz.course?.title || "General Assessment"}
              </p>
              <button className="w-full py-2.5 px-4 bg-bg-secondary hover:bg-bg-tertiary text-text-secondary rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 mt-auto">
                <BarChart2 className="w-5 h-5" /> Review Results
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
