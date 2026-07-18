import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateSlug = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const subjects = [
  // Primary Level
  { title: "Primary Mathematics Foundation", category: "Primary", level: "Primary", price: 15.00 },
  { title: "Primary Science Adventures", category: "Primary", level: "Primary", price: 12.00 },
  { title: "Basic English Phonics", category: "Primary", level: "Primary", price: 10.00 },
  { title: "Intro to Social Studies", category: "Primary", level: "Primary", price: 10.00 },
  { title: "Creative Arts for Kids", category: "Primary", level: "Primary", price: 15.00 },
  { title: "Beginner Computer Science", category: "Primary", level: "Primary", price: 20.00 },

  // Junior Secondary
  { title: "JSS1 Mathematics Core", category: "Junior Secondary", level: "JSS1", price: 25.00 },
  { title: "JSS1 Basic Science", category: "Junior Secondary", level: "JSS1", price: 25.00 },
  { title: "JSS2 English Language", category: "Junior Secondary", level: "JSS2", price: 25.00 },
  { title: "JSS3 Pre-WAEC Mathematics", category: "Junior Secondary", level: "JSS3", price: 30.00 },
  { title: "JSS3 Basic Technology", category: "Junior Secondary", level: "JSS3", price: 28.00 },
  { title: "JSS French Language", category: "Languages", level: "JSS", price: 20.00 },

  // Senior Secondary / WAEC
  { title: "WAEC Mathematics Prep", category: "Senior Secondary", level: "SS3", price: 40.00 },
  { title: "WAEC Physics Mastery", category: "Senior Secondary", level: "SS3", price: 45.00 },
  { title: "WAEC Chemistry Practicals", category: "Senior Secondary", level: "SS3", price: 45.00 },
  { title: "SS1 Biology Foundations", category: "Senior Secondary", level: "SS1", price: 30.00 },
  { title: "SS2 Economics & Commerce", category: "Senior Secondary", level: "SS2", price: 35.00 },
  { title: "WAEC English Language", category: "Senior Secondary", level: "SS3", price: 40.00 },
  { title: "Government and Civic Education", category: "Senior Secondary", level: "SS2", price: 30.00 },
  { title: "Further Mathematics Advanced", category: "Senior Secondary", level: "SS3", price: 50.00 },

  // IGCSE / Cambridge
  { title: "IGCSE Mathematics (Extended)", category: "IGCSE", level: "IGCSE", price: 60.00 },
  { title: "IGCSE Physics (0625)", category: "IGCSE", level: "IGCSE", price: 60.00 },
  { title: "IGCSE Chemistry (0620)", category: "IGCSE", level: "IGCSE", price: 60.00 },
  { title: "IGCSE Biology (0610)", category: "IGCSE", level: "IGCSE", price: 60.00 },
  { title: "IGCSE Computer Science (0478)", category: "IGCSE", level: "IGCSE", price: 65.00 },
  { title: "IGCSE Business Studies", category: "IGCSE", level: "IGCSE", price: 55.00 },
  { title: "IGCSE English as a Second Language", category: "IGCSE", level: "IGCSE", price: 50.00 },

  // A-Levels
  { title: "A-Level Pure Mathematics", category: "A-Level", level: "A-Level", price: 75.00 },
  { title: "A-Level Physics (OCR)", category: "A-Level", level: "A-Level", price: 75.00 },
  { title: "A-Level Chemistry (AQA)", category: "A-Level", level: "A-Level", price: 75.00 },
  { title: "A-Level Biology (Edexcel)", category: "A-Level", level: "A-Level", price: 75.00 },
  { title: "A-Level Psychology", category: "A-Level", level: "A-Level", price: 70.00 },
  
  // Tech & Skills
  { title: "Python Programming for Teens", category: "Technology", level: "Beginner", price: 45.00 },
  { title: "Web Development Bootcamp", category: "Technology", level: "Intermediate", price: 60.00 },
  { title: "Robotics and IoT", category: "Technology", level: "Advanced", price: 80.00 },
  { title: "Data Science Fundamentals", category: "Technology", level: "Intermediate", price: 70.00 },
  { title: "Introduction to AI", category: "Technology", level: "Beginner", price: 50.00 },
  { title: "Digital Art & Design", category: "Creative Arts", level: "Beginner", price: 40.00 },

  // Languages
  { title: "Conversational Spanish", category: "Languages", level: "Beginner", price: 35.00 },
  { title: "Advanced French Literature", category: "Languages", level: "Advanced", price: 55.00 },
  { title: "Mandarin for Beginners", category: "Languages", level: "Beginner", price: 45.00 },

  // Extra padding to reach 50+
  { title: "SAT Mathematics Prep", category: "Test Prep", level: "SAT", price: 80.00 },
  { title: "SAT Reading & Writing", category: "Test Prep", level: "SAT", price: 80.00 },
  { title: "IELTS Speaking & Listening", category: "Test Prep", level: "IELTS", price: 65.00 },
  { title: "IELTS Reading & Writing", category: "Test Prep", level: "IELTS", price: 65.00 },
  { title: "JAMB Use of English", category: "Test Prep", level: "JAMB", price: 25.00 },
  { title: "JAMB Mathematics Prep", category: "Test Prep", level: "JAMB", price: 25.00 },
  { title: "JAMB Physics Prep", category: "Test Prep", level: "JAMB", price: 25.00 },
  { title: "JAMB Chemistry Prep", category: "Test Prep", level: "JAMB", price: 25.00 },
  { title: "Financial Literacy for Teens", category: "Life Skills", level: "Beginner", price: 20.00 },
  { title: "Public Speaking Mastery", category: "Life Skills", level: "Intermediate", price: 30.00 }
];

async function main() {
  console.log('Seeding 50+ courses into the database...');

  // Ensure there is at least one tutor
  const tutorRole = await prisma.role.findUnique({ where: { name: 'TUTOR' } });
  if (!tutorRole) throw new Error("TUTOR role not found. Please run regular seed first.");

  let tutorUser = await prisma.user.findFirst({
    where: {
      userRoles: {
        some: {
          roleId: tutorRole.id
        }
      }
    }
  });

  if (!tutorUser) {
    console.log("No tutor found. Creating a generic tutor...");
    tutorUser = await prisma.user.create({
      data: {
        firstName: "Master",
        lastName: "Tutor",
        email: "master.tutor@example.com",
        passwordHash: "$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // Dummy hash
        userRoles: {
          create: {
            roleId: tutorRole.id
          }
        }
      }
    });
  }

  let count = 0;

  for (const sub of subjects) {
    // Check if subject exists
    let subject = await prisma.subject.findFirst({
      where: { name: sub.category }
    });

    if (!subject) {
      subject = await prisma.subject.create({
        data: {
          name: sub.category,
          code: generateSlug(sub.category)
        }
      });
    }

    // Check if course exists
    const courseSlug = generateSlug(sub.title);
    const existingCourse = await prisma.course.findUnique({
      where: { slug: courseSlug }
    });

    if (!existingCourse) {
      await prisma.course.create({
        data: {
          title: sub.title,
          slug: courseSlug,
          description: `This is a comprehensive course on ${sub.title}. Perfect for students at the ${sub.level} level looking to excel in ${sub.category}.\n\nMaster ${sub.title} with expert guidance.`,
          thumbnailUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(sub.title)}&background=random&color=fff&size=512`,
          price: sub.price,
          currency: "USD",
          status: "PUBLISHED",
          subjectId: subject.id,
          tutorId: tutorUser.id,
        }
      });
      count++;
    }
  }

  console.log(`Successfully seeded ${count} new courses.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
