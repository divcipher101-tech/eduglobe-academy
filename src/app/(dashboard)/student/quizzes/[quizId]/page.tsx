"use client";

import { useState, useEffect } from "react";
import { Clock, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const mockQuiz = {
  id: "quiz-1",
  title: "Mid-Term Assessment: Algebraic Fractions",
  course: "IGCSE Mathematics",
  timeLimit: 5 * 60, // 5 mins in seconds
  questions: [
    {
      id: 1,
      text: "Which of the following is equivalent to (2x + 4) / 2?",
      options: ["x", "x + 4", "2x + 2", "x + 2"],
      correctAnswer: 3,
    },
    {
      id: 2,
      text: "Simplify: (x² - 9) / (x - 3)",
      options: ["x + 3", "x - 3", "x² - 3", "x - 9"],
      correctAnswer: 0,
    },
    {
      id: 3,
      text: "Solve for x: 3/x = 6/10",
      options: ["3", "10", "5", "15"],
      correctAnswer: 2,
    },
  ]
};

import { use } from "react";

export default function QuizTakingInterface({ params }: { params: Promise<{ quizId: string }> }) {
  const resolvedParams = use(params);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(mockQuiz.timeLimit);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) {
      if (timeLeft <= 0 && !isSubmitted) {
        handleSubmit();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    let calculatedScore = 0;
    mockQuiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        calculatedScore++;
      }
    });
    const finalScore = Math.round((calculatedScore / mockQuiz.questions.length) * 100);
    setScore(finalScore);
    
    setIsSubmitting(true);
    try {
      // Import the server action dynamically to avoid build issues in client components if needed,
      // but in Next 14 we can just import it at the top. Let's assume we import it.
      const { submitQuizAttempt } = await import("@/app/actions/quiz");
      await submitQuizAttempt(resolvedParams.quizId, finalScore, mockQuiz.timeLimit - timeLeft);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = mockQuiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuiz.questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto pt-10 animate-fade-in-up">
        <div className="bg-white rounded-3xl border border-glass-border overflow-hidden shadow-xl shadow-primary-900/5 text-center p-12">
          <div className="w-24 h-24 rounded-full bg-success-100 text-success-600 flex items-center justify-center mx-auto mb-6">
            <TrophyIcon className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-display font-bold text-text-primary mb-4">Quiz Completed!</h1>
          <p className="text-lg text-text-secondary mb-8">You have successfully completed the "{mockQuiz.title}" assessment.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
            <div className="bg-bg-secondary p-6 rounded-2xl border border-glass-border">
              <p className="text-sm font-bold text-text-tertiary uppercase tracking-widest mb-1">Your Score</p>
              <h2 className={cn(
                "text-5xl font-bold",
                score >= 80 ? "text-success-600" : score >= 60 ? "text-primary-600" : "text-danger-600"
              )}>{score}%</h2>
            </div>
            <div className="bg-bg-secondary p-6 rounded-2xl border border-glass-border">
              <p className="text-sm font-bold text-text-tertiary uppercase tracking-widest mb-1">Time Taken</p>
              <h2 className="text-5xl font-bold text-text-primary">{formatTime(mockQuiz.timeLimit - timeLeft)}</h2>
            </div>
          </div>

          <Link href="/student/quizzes" className="inline-flex px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20">
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col animate-fade-in-up">
      
      {/* Header & Timer */}
      <div className="bg-white rounded-t-3xl border-t border-l border-r border-glass-border p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary mb-1">{mockQuiz.title}</h1>
          <p className="text-sm font-medium text-text-secondary">{mockQuiz.course}</p>
        </div>
        
        <div className={cn(
          "flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-colors shadow-sm",
          timeLeft < 300 ? "bg-danger-50 text-danger-600 border border-danger-200 animate-pulse" : "bg-bg-secondary text-text-primary border border-glass-border"
        )}>
          <Clock className="w-5 h-5" />
          <span className="text-lg tracking-widest">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-bg-secondary relative shrink-0">
        <div className="h-full bg-primary-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Question Area */}
      <div className="flex-1 bg-white border-l border-r border-glass-border overflow-y-auto p-6 sm:p-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg uppercase tracking-wider">
              Question {currentQuestionIndex + 1} of {mockQuiz.questions.length}
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-10 leading-tight">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestionIndex] === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  className={cn(
                    "w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group",
                    isSelected 
                      ? "border-primary-500 bg-primary-50 shadow-md shadow-primary-500/10" 
                      : "border-glass-border bg-white hover:border-primary-300 hover:bg-bg-secondary"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-colors shrink-0",
                    isSelected ? "border-primary-500 bg-primary-500 text-white" : "border-glass-border text-text-secondary group-hover:border-primary-300"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={cn(
                    "text-lg font-medium",
                    isSelected ? "text-primary-900 font-bold" : "text-text-primary"
                  )}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-bg-secondary rounded-b-3xl border border-glass-border p-6 flex items-center justify-between shrink-0 shadow-inner">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 bg-white border border-glass-border text-text-primary rounded-xl font-bold transition-all hover:bg-bg-tertiary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Previous
        </button>

        {currentQuestionIndex === mockQuiz.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-success-600 hover:bg-success-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-success-600/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20 flex items-center gap-2"
          >
            Next <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Warning if unanswered on last page */}
      {currentQuestionIndex === mockQuiz.questions.length - 1 && answeredCount < mockQuiz.questions.length && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-warning-50 border border-warning-200 text-warning-800 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in-up">
          <AlertCircle className="w-5 h-5 text-warning-600" />
          <span className="font-bold text-sm">You have unanswered questions. You may still submit.</span>
        </div>
      )}
    </div>
  );
}

function TrophyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
