/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitQuizAttempt } from "@/app/actions/quiz";
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type ClientQuiz = {
  id: string;
  title: string;
  description?: string | null;
  totalMarks: number;
  questions: {
    id: string;
    questionText: string;
    options: {
      id: string;
      optionText: string;
    }[];
  }[];
};

export function QuizTaker({ quiz }: { quiz: ClientQuiz }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean | null; totalMarks: number } | null>(null);
  const [error, setError] = useState("");

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    // Check if all answered
    const unanswered = quiz.questions.filter(q => !answers[q.id]);
    if (unanswered.length > 0) {
      if (!window.confirm(`You have ${unanswered.length} unanswered questions. Are you sure you want to submit?`)) {
        return;
      }
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = Object.keys(answers).map(qId => ({
        questionId: qId,
        selectedOptionId: answers[qId]
      }));

      const res = await submitQuizAttempt(quiz.id, payload);
      setResult({ score: res.score, passed: res.passed, totalMarks: res.totalMarks });
    } catch (err: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
      setError(err.message || "Failed to submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="bg-white rounded-3xl border border-glass-border p-12 text-center max-w-2xl mx-auto animate-fade-in-up shadow-sm">
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 bg-primary-50 text-primary-500">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-display font-bold text-text-primary mb-4">Quiz Completed!</h2>
        <p className="text-text-secondary mb-8">Your answers have been automatically graded.</p>
        
        <div className="bg-bg-secondary rounded-2xl p-8 mb-8 border border-glass-border">
          <p className="text-sm text-text-tertiary uppercase tracking-wider font-bold mb-2">Final Score</p>
          <p className="text-5xl font-display font-bold text-primary-600">
            {result.score} <span className="text-2xl text-text-tertiary">/ {result.totalMarks}</span>
          </p>
          {result.passed !== null && (
            <div className={cn(
              "mt-4 inline-flex px-4 py-1.5 rounded-full text-sm font-bold",
              result.passed ? "bg-success-50 text-success-600" : "bg-danger-50 text-danger-600"
            )}>
              {result.passed ? "PASSED" : "FAILED"}
            </div>
          )}
        </div>

        <button 
          onClick={() => router.push("/student/quizzes")}
          className="btn btn-primary"
        >
          Return to Quizzes
        </button>
      </div>
    );
  }

  const question = quiz.questions[currentQ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary mb-2">{quiz.title}</h1>
          <p className="text-text-secondary text-sm">Question {currentQ + 1} of {quiz.questions.length}</p>
        </div>
        
        <div className="w-32 bg-bg-secondary h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary-500 h-full transition-all duration-300" 
            style={{ width: `${((currentQ + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-danger-50 border border-danger-200 text-danger-600 rounded-xl text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <div className="bg-white border border-glass-border rounded-3xl p-8 mb-6 shadow-sm min-h-[400px] flex flex-col">
        <h2 className="text-xl font-bold text-text-primary mb-8">{question.questionText}</h2>

        <div className="space-y-3 flex-1">
          {question.options.map(option => {
            const isSelected = answers[question.id] === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(question.id, option.id)}
                className={cn(
                  "w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 group",
                  isSelected 
                    ? "border-primary-500 bg-primary-50/50" 
                    : "border-glass-border hover:border-primary-200 hover:bg-bg-secondary"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                  isSelected ? "border-primary-500" : "border-glass-border group-hover:border-primary-200"
                )}>
                  {isSelected && <div className="w-3 h-3 rounded-full bg-primary-500 animate-fade-in" />}
                </div>
                <span className={cn("text-lg", isSelected ? "text-primary-900 font-medium" : "text-text-secondary")}>
                  {option.optionText}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          disabled={currentQ === 0 || isSubmitting}
          onClick={() => setCurrentQ(prev => prev - 1)}
          className="btn btn-secondary disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </button>

        {currentQ === quiz.questions.length - 1 ? (
          <button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="btn btn-primary min-w-[140px]"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Submit Quiz"}
          </button>
        ) : (
          <button
            onClick={() => setCurrentQ(prev => prev + 1)}
            className="btn btn-primary"
          >
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
