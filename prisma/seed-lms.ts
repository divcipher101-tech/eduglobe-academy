import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding LMS Data (Modules, Lessons, and Student Enrollment)...');

  // 1. Ensure STUDENT role exists
  const studentRole = await prisma.role.findUnique({ where: { name: 'STUDENT' } });
  if (!studentRole) throw new Error("STUDENT role not found. Please run regular seed first.");

  // 2. Get or Create a test student
  let testStudent = await prisma.user.findFirst({
    where: { email: 'test.student@example.com' }
  });

  if (!testStudent) {
    testStudent = await prisma.user.create({
      data: {
        firstName: "Test",
        lastName: "Student",
        email: "test.student@example.com",
        passwordHash: "$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        userRoles: {
          create: {
            roleId: studentRole.id
          }
        },
        studentProfile: {
          create: {}
        }
      }
    });
    console.log("Created test student: test.student@example.com");
  }

  // 3. Get some courses to enroll the student in
  const courses = await prisma.course.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  if (courses.length === 0) {
    throw new Error("No courses found. Please run seed-courses.ts first.");
  }

  // 4. For each course, add modules, lessons, and enroll the student
  for (const course of courses) {
    // Add modules if none exist
    const existingModules = await prisma.courseModule.findMany({
      where: { courseId: course.id }
    });

    if (existingModules.length === 0) {
      console.log(`Adding modules and lessons to course: ${course.title}`);
      
      const module1 = await prisma.courseModule.create({
        data: {
          courseId: course.id,
          title: "Module 1: Introduction",
          description: "Getting started with the basics.",
          sortOrder: 1
        }
      });

      await prisma.courseLesson.createMany({
        data: [
          {
            moduleId: module1.id,
            title: "Lesson 1: Welcome",
            contentText: "Welcome to the course!",
            contentUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            contentType: "VIDEO",
            durationMinutes: 2,
            sortOrder: 1
          },
          {
            moduleId: module1.id,
            title: "Lesson 2: Core Concepts",
            contentText: "Understanding the core concepts.",
            contentUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            contentType: "VIDEO",
            durationMinutes: 5,
            sortOrder: 2
          }
        ]
      });

      const module2 = await prisma.courseModule.create({
        data: {
          courseId: course.id,
          title: "Module 2: Advanced Topics",
          description: "Diving deeper into the subject.",
          sortOrder: 2
        }
      });

      await prisma.courseLesson.createMany({
        data: [
          {
            moduleId: module2.id,
            title: "Lesson 3: In-depth Analysis",
            contentText: "Analyzing complex scenarios.",
            contentUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            contentType: "VIDEO",
            durationMinutes: 8,
            sortOrder: 1
          }
        ]
      });
    }

    // Enroll the test student if not already enrolled
    const existingEnrollment = await prisma.courseEnrollment.findFirst({
      where: {
        studentId: testStudent.id,
        courseId: course.id
      }
    });

    if (!existingEnrollment) {
      await prisma.courseEnrollment.create({
        data: {
          studentId: testStudent.id,
          courseId: course.id,
          status: 'ACTIVE',
          progressPct: Math.floor(Math.random() * 50) + 10 // Random progress between 10% and 60%
        }
      });
      console.log(`Enrolled test student in ${course.title}`);
    }
  }

  console.log('LMS Data Seeding Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
