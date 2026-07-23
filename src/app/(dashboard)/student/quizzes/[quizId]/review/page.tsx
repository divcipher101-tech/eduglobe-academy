import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function QuizReviewPage({ params }: { params: { quizId: string } }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const quizId = params.quizId;

  const attempt = await prisma.quizAttempt.findFirst({
    where: { 
      quizId, 
      studentId: session.user.id 
    },
    include: {
      quiz: {
        include: {
          questions: {
            include: {
              options: true
            }
          }
        }
      },
      answers: true
    },
    orderBy: { startedAt: "desc" }
  });

  if (!attempt) {
    redirect("/student/quizzes");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up pb-12">
      <Link href="/student/quizzes" className="inline-flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-primary-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Quizzes
      </Link>

      <div className="bg-white rounded-3xl border border-glass-border p-8 shadow-sm">
        <h1 className="text-2xl font-display font-bold text-text-primary mb-2">Review: {attempt.quiz.title}</h1>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="text-text-secondary">Final Score: <strong className="text-primary-600">{Number(attempt.score || 0)} / {Number(attempt.quiz.totalMarks)}</strong></span>
          <span className={cn("px-2 py-0.5 rounded-md text-xs font-bold", attempt.passed ? "bg-success-50 text-success-700" : "bg-danger-50 text-danger-700")}>
            {attempt.passed ? "PASSED" : "FAILED"}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {attempt.quiz.questions.map((question: any, index: number) => {
          const userAnswer = attempt.answers.find((a: any) => a.questionId === question.id);
          const correctOption = question.options.find((o: any) => o.isCorrect);
          
          const isCorrect = userAnswer?.selectedOptionId === correctOption?.id;

          return (
            <div key={question.id} className="bg-white rounded-2xl border border-glass-border p-6 shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm",
                  isCorrect ? "bg-success-100 text-success-700" : "bg-danger-100 text-danger-700"
                )}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-text-primary text-lg leading-snug">
                    {question.questionText}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider">{question.marks} Points</span>
                  </div>
                </div>
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-success-500 shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-danger-500 shrink-0" />
                )}
              </div>

              <div className="space-y-3 pl-12">
                {question.options.map((option: any) => {
                  const isSelected = userAnswer?.selectedOptionId === option.id;
                  const isCorrectOption = option.isCorrect;

                  return (
                    <div 
                      key={option.id}
                      className={cn(
                        "p-4 rounded-xl border flex items-center justify-between transition-all",
                        isSelected && isCorrectOption ? "bg-success-50 border-success-200" :
                        isSelected && !isCorrectOption ? "bg-danger-50 border-danger-200" :
                        isCorrectOption ? "bg-success-50/50 border-success-100" :
                        "bg-bg-secondary border-glass-border opacity-60"
                      )}
                    >
                      <span className={cn(
                        "font-medium",
                        isSelected || isCorrectOption ? "text-text-primary" : "text-text-secondary"
                      )}>
                        {option.optionText}
                      </span>
                      {isSelected && <span className="text-xs font-bold bg-white/50 px-2 py-1 rounded-md ml-2">Your Answer</span>}
                      {isCorrectOption && !isSelected && <span className="text-xs font-bold text-success-600 bg-success-100 px-2 py-1 rounded-md ml-2">Correct Answer</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
