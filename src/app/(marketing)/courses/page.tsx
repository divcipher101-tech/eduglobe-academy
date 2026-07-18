import Link from "next/link";
import { Search, Filter, Star, Clock, BookOpen, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function CourseCatalog() {
  const courses = await prisma.course.findMany({
    where: { status: "PUBLISHED" },
    include: {
      tutor: true,
      subject: true
    }
  });

  return (
    <div className="bg-bg-primary min-h-screen pt-24 pb-32">
      <div className="container">
        {/* Header Section */}
        <div className="max-w-3xl mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
            Explore Our Global Curriculum
          </h1>
          <p className="text-xl text-text-secondary">
            World-class education tailored to international standards. Find the perfect course to advance your learning journey.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 animate-fade-in-up delay-100">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input 
              type="text" 
              placeholder="Search for subjects, topics, or exam boards..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-glass-border bg-glass backdrop-blur-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all shadow-sm text-text-primary"
            />
          </div>
          <button className="btn btn-secondary px-6 flex items-center justify-center gap-2 h-[58px]">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-fade-in-up delay-200">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <div className="card p-0 overflow-hidden flex flex-col group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                <div className={`h-48 w-full ${course.thumbnailUrl || 'bg-gradient-to-br from-blue-500 to-indigo-600'} relative`}>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                      {course.subject?.name || 'General'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3 text-sm text-text-secondary">
                    <div className="flex items-center text-warning-500 font-medium">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      4.8
                    </div>
                    <span className="font-bold text-success-600">
                      {course.currency === 'NGN' ? '₦' : course.currency}{Number(course.price).toLocaleString()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 flex-1 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-text-secondary border-t border-glass-border pt-4 mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        By {course.tutor ? `${course.tutor.firstName} ${course.tutor.lastName}` : 'EduGlobe Tutor'}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in-up delay-300">
          <button className="btn btn-ghost">Load More Courses</button>
        </div>
      </div>
    </div>
  );
}
