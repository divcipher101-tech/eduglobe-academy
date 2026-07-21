import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tutorUser = await prisma.user.findFirst({ where: { email: 'tutor@example.com' } });
    const tutorId = tutorUser ? tutorUser.id : undefined;

    const courses = [
      {
        title: "IGCSE Additional Mathematics (0606)",
        slug: "igcse-add-maths",
        description: "Master IGCSE Additional Mathematics with our comprehensive 12-week program.",
        thumbnailUrl: "bg-gradient-to-br from-blue-500 to-indigo-600",
        price: 45000,
        currency: "NGN",
        status: "PUBLISHED" as const,
        tutorId
      },
      {
        title: "A-Level Physics (9702) Full Syllabus",
        slug: "a-level-physics",
        description: "Deep dive into A-Level Physics concepts from mechanics to quantum physics.",
        thumbnailUrl: "bg-gradient-to-br from-emerald-400 to-teal-600",
        price: 60000,
        currency: "NGN",
        status: "PUBLISHED" as const,
        tutorId
      },
      {
        title: "Introduction to Python Programming",
        slug: "intro-python",
        description: "Learn the fundamentals of Python programming from scratch. Perfect for beginners.",
        thumbnailUrl: "bg-gradient-to-br from-amber-400 to-orange-600",
        price: 35000,
        currency: "NGN",
        status: "PUBLISHED" as const,
        tutorId
      }
    ];

    for (const c of courses) {
      await prisma.course.upsert({
        where: { slug: c.slug },
        update: {},
        create: {
          title: c.title,
          slug: c.slug,
          description: c.description,
          thumbnailUrl: c.thumbnailUrl,
          price: c.price,
          currency: c.currency,
          status: c.status,
          tutorId: c.tutorId
        }
      });
    }

    return NextResponse.json({ success: true, message: "Courses seeded successfully!" });
  } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
