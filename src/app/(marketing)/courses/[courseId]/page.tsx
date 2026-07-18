import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Star, Clock, BookOpen, CheckCircle2, ChevronRight, PlayCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { enrollInCourse } from "@/app/actions/enroll";
import { auth } from "@/lib/auth";

export default async function CourseDetails({ params }: { params: { courseId: string } }) {
  const session = await auth();

  const course = await prisma.course.findUnique({
    where: { id: params.courseId },
    include: {
      tutor: true,
      subject: true
    }
  });

  if (!course) {
    notFound();
  }

  // Check if enrolled
  let isEnrolled = false;
  if (session?.user?.id) {
    const existing = await prisma.courseEnrollment.findUnique({
      where: {
        courseId_studentId: {
          courseId: course.id,
          studentId: session.user.id
        }
      }
    });
    if (existing) {
      isEnrolled = true;
    }
  }

  return (
    <div className="bg-bg-primary min-h-screen pt-24 pb-32">
      <div className="container">
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 space-y-10">
            <div className="animate-fade-in-up">
              <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 mb-6 hover:text-primary-700 transition-colors">
                <ChevronRight className="w-4 h-4 rotate-180" /> Back to Catalog
              </Link>
              
              <div className="flex gap-2 mb-4">
                <span className="bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full">
                  {course.subject?.name || 'General'}
                </span>
                <span className="bg-success-100 text-success-700 text-xs font-bold px-3 py-1 rounded-full">
                  Beginner Friendly
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6 leading-tight">
                {course.title}
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-text-secondary border-b border-glass-border pb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-warning-500 fill-current" />
                  <span className="text-text-primary font-bold">4.8</span> (124 reviews)
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" /> 12 Weeks
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> 48 Lessons
                </div>
              </div>
            </div>

            {/* What you'll learn */}
            <div className="bg-white p-8 rounded-3xl border border-glass-border shadow-sm animate-fade-in-up delay-100">
              <h2 className="text-2xl font-bold text-text-primary mb-6">What you'll learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Master fundamental concepts with hands-on exercises",
                  "Build real-world projects and portfolio pieces",
                  "Understand advanced theories and practical applications",
                  "Prepare thoroughly for international examinations"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success-500 shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar / Checkout Card */}
          <div className="w-full lg:w-[400px] shrink-0 animate-fade-in-up delay-200">
            <div className="sticky top-32 bg-white rounded-3xl border border-glass-border p-8 shadow-xl shadow-primary-900/5">
              <div className={`w-full h-48 rounded-2xl mb-6 ${course.thumbnailUrl || 'bg-gradient-to-br from-blue-500 to-indigo-600'} flex items-center justify-center`}>
                <PlayCircle className="w-16 h-16 text-white/80 hover:text-white transition-colors cursor-pointer" />
              </div>
              
              <div className="text-4xl font-bold text-text-primary mb-6">
                {course.currency === 'NGN' ? '₦' : course.currency}{Number(course.price).toLocaleString()}
              </div>

              {isEnrolled ? (
                <Link href="/student/courses" className="w-full btn btn-primary flex justify-center mb-4">
                  Go to Course
                </Link>
              ) : (
                <form action={async () => {
                  "use server";
                  await enrollInCourse(course.id);
                }}>
                  <button type="submit" className="w-full btn btn-primary flex justify-center mb-4 text-lg">
                    Enroll Now
                  </button>
                </form>
              )}

              <p className="text-sm text-text-secondary text-center mb-6">
                Full lifetime access • Certificate of completion
              </p>

              <div className="space-y-4 pt-6 border-t border-glass-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
                    {course.tutor ? course.tutor.firstName[0] : 'E'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">
                      {course.tutor ? `${course.tutor.firstName} ${course.tutor.lastName}` : 'EduGlobe Tutor'}
                    </p>
                    <p className="text-xs text-text-secondary">Course Instructor</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-success-50 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-success-600 shrink-0 mt-0.5" />
                <p className="text-xs text-success-800 font-medium">30-Day Money-Back Guarantee. No questions asked.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
