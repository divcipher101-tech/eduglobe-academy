import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({ where: { userRoles: { some: { role: { name: "ADMIN" } } } } });
  if (!admin) {
    console.log("No admin user found to act as creator.");
    process.exit(1);
  }

  // Find a course to attach it to, or just make it standalone
  const course = await prisma.course.findFirst();

  const quiz = await prisma.quiz.create({
    data: {
      title: "General Knowledge Assessment",
      description: "A quick test to ensure you understand the basic platform rules.",
      timeLimitMin: 15,
      totalMarks: 30,
      passingMarks: 20,
      maxAttempts: 3,
      status: "PUBLISHED",
      createdById: admin.id,
      courseId: course?.id || undefined, // Only attach if course exists
      questions: {
        create: [
          {
            questionText: "What is the capital of France?",
            questionType: "MULTIPLE_CHOICE",
            marks: 10,
            sortOrder: 1,
            options: {
              create: [
                { optionText: "London", isCorrect: false },
                { optionText: "Berlin", isCorrect: false },
                { optionText: "Paris", isCorrect: true },
                { optionText: "Madrid", isCorrect: false },
              ]
            }
          },
          {
            questionText: "Which planet is known as the Red Planet?",
            questionType: "MULTIPLE_CHOICE",
            marks: 10,
            sortOrder: 2,
            options: {
              create: [
                { optionText: "Earth", isCorrect: false },
                { optionText: "Mars", isCorrect: true },
                { optionText: "Jupiter", isCorrect: false },
                { optionText: "Venus", isCorrect: false },
              ]
            }
          },
          {
            questionText: "What is 7 multiplied by 8?",
            questionType: "MULTIPLE_CHOICE",
            marks: 10,
            sortOrder: 3,
            options: {
              create: [
                { optionText: "54", isCorrect: false },
                { optionText: "56", isCorrect: true },
                { optionText: "64", isCorrect: false },
                { optionText: "48", isCorrect: false },
              ]
            }
          }
        ]
      }
    }
  });

  console.log("Quiz created successfully!", quiz.id);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
