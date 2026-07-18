import { prisma } from "@/lib/prisma";
import CourseCatalogClient from "./CourseCatalogClient";

export const metadata = {
  title: "Course Catalog | EduGlobe Academy",
  description: "Explore our global curriculum of world-class courses.",
};

export default async function CourseCatalog() {
  const courses = await prisma.course.findMany({
    where: { status: "PUBLISHED" },
    include: {
      tutor: true,
      subject: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return <CourseCatalogClient initialCourses={courses} />;
}
