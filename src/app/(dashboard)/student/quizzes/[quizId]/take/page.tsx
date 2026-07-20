import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getQuizForTaking } from "@/app/actions/quiz";
import { QuizTaker } from "@/components/quiz/QuizTaker";

export default async function TakeQuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  let quiz;
  try {
    quiz = await getQuizForTaking(quizId);
  } catch (error: any) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">Cannot Take Quiz</h1>
        <p className="text-text-secondary">{error.message || "An error occurred while loading the quiz."}</p>
      </div>
    );
  }

  // Convert Decimal to number for the client
  const clientQuiz = {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    totalMarks: Number(quiz.totalMarks),
    questions: quiz.questions.map(q => ({
      id: q.id,
      questionText: q.questionText,
      options: q.options.map(o => ({
        id: o.id,
        optionText: o.optionText,
      }))
    }))
  };

  return <QuizTaker quiz={clientQuiz} />;
}
