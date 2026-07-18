"use client";

import { HelpCircle, Clock, Trophy, PlayCircle, BarChart2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const quizzes = [
  {
    id: "quiz-1",
    title: "Mid-Term Assessment: Algebraic Fractions",
    course: "IGCSE Mathematics",
    questions: 20,
    timeLimit: "45 mins",
    status: "PENDING",
    dueDate: "Tomorrow",
    score: null,
  },
  {
    id: "quiz-2",
    title: "Thermodynamics Quiz 1",
    course: "A-Level Physics",
    questions: 10,
    timeLimit: "15 mins",
    status: "PENDING",
    dueDate: "Next Week",
    score: null,
  },
  {
    id: "quiz-3",
    title: "Variables and Data Types",
    course: "Introduction to Python Programming",
    questions: 15,
    timeLimit: "20 mins",
    status: "COMPLETED",
    dueDate: "Past",
    score: 95,
  },
  {
    id: "quiz-4",
    title: "Macbeth Act 1 Analysis",
    course: "IGCSE English Literature",
    questions: 25,
    timeLimit: "30 mins",
    status: "COMPLETED",
    dueDate: "Past",
    score: 82,
  }
];

export default function QuizzesDashboard() {
  const pendingQuizzes = quizzes.filter(q => q.status === "PENDING");
  const completedQuizzes = quizzes.filter(q => q.status === "COMPLETED");
  const averageScore = completedQuizzes.reduce((acc, curr) => acc + (curr.score || 0), 0) / completedQuizzes.length || 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">My Quizzes</h1>
          <p className="text-text-secondary">Test your knowledge and track your progress.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* AI Quiz Generator Button */}
          <button className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary-500/20 transition-all hover:scale-105">
            <span className="w-4 h-4 text-white">✨</span>
            Generate AI Practice Quiz
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-glass-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning-50 text-warning-600 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Pending Quizzes</p>
            <h3 className="text-2xl font-bold text-text-primary">{pendingQuizzes.length}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-glass-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success-50 text-success-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Completed</p>
            <h3 className="text-2xl font-bold text-text-primary">{completedQuizzes.length}</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-glass-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Average Score</p>
            <h3 className="text-2xl font-bold text-text-primary">{averageScore.toFixed(0)}%</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Quizzes */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Clock className="w-5 h-5 text-warning-500" /> Pending
          </h2>
          {pendingQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-2xl border border-glass-border p-6 shadow-sm hover:shadow-md hover:border-primary-300 transition-all group flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold text-warning-700 bg-warning-100 px-2 py-1 rounded-md uppercase tracking-wider">
                  Due {quiz.dueDate}
                </span>
                <div className="flex items-center gap-3 text-sm font-medium text-text-secondary">
                  <span className="flex items-center gap-1"><HelpCircle className="w-4 h-4"/> {quiz.questions} Qs</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {quiz.timeLimit}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-primary-600 transition-colors">
                {quiz.title}
              </h3>
              <p className="text-sm font-medium text-text-secondary mb-6">
                {quiz.course}
              </p>
              <Link 
                href={`/student/quizzes/${quiz.id}`}
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
          {completedQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-2xl border border-glass-border p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold text-success-700 bg-success-100 px-2 py-1 rounded-md uppercase tracking-wider">
                  Completed
                </span>
                <span className={cn(
                  "text-lg font-bold px-3 py-1 rounded-lg",
                  quiz.score! >= 90 ? "text-success-700 bg-success-50" : 
                  quiz.score! >= 70 ? "text-primary-700 bg-primary-50" : 
                  "text-warning-700 bg-warning-50"
                )}>
                  {quiz.score}%
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-1">
                {quiz.title}
              </h3>
              <p className="text-sm font-medium text-text-secondary mb-6">
                {quiz.course}
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
