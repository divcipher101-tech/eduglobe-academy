import Link from "next/link";
import { Search, Filter, Star, Clock, BookOpen, ChevronRight } from "lucide-react";

export default function CourseCatalog() {
  const MOCK_COURSES = [
    {
      id: 1,
      title: "IGCSE Additional Mathematics (0606)",
      category: "Mathematics",
      level: "Secondary",
      rating: 4.8,
      students: 1240,
      duration: "12 weeks",
      lessons: 48,
      image: "bg-gradient-to-br from-blue-500 to-indigo-600",
      tutor: "Dr. Alan Smith"
    },
    {
      id: 2,
      title: "A-Level Physics (9702) Full Syllabus",
      category: "Science",
      level: "A-Level",
      rating: 4.9,
      students: 850,
      duration: "16 weeks",
      lessons: 64,
      image: "bg-gradient-to-br from-emerald-400 to-teal-600",
      tutor: "Prof. Sarah Jenkins"
    },
    {
      id: 3,
      title: "Early Years Phonics & Reading",
      category: "Languages",
      level: "Preschool",
      rating: 5.0,
      students: 2100,
      duration: "8 weeks",
      lessons: 24,
      image: "bg-gradient-to-br from-pink-400 to-rose-600",
      tutor: "Ms. Emma Brown"
    },
    {
      id: 4,
      title: "O-Level Chemistry Mastery",
      category: "Science",
      level: "Secondary",
      rating: 4.7,
      students: 930,
      duration: "10 weeks",
      lessons: 40,
      image: "bg-gradient-to-br from-amber-400 to-orange-600",
      tutor: "Mr. David Lee"
    },
  ];

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

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-fade-in-up delay-200">
          {MOCK_COURSES.map((course) => (
            <div key={course.id} className="card p-0 overflow-hidden flex flex-col group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
              <div className={`h-48 w-full ${course.image} relative`}>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                    {course.level}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3 text-sm text-text-secondary">
                  <div className="flex items-center text-warning-500 font-medium">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {course.rating}
                  </div>
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 flex-1">
                  By {course.tutor}
                </p>

                <div className="flex items-center justify-between text-sm text-text-secondary border-t border-glass-border pt-4 mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" /> {course.lessons} lessons
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in-up delay-300">
          <button className="btn btn-ghost">Load More Courses</button>
        </div>
      </div>
    </div>
  );
}
