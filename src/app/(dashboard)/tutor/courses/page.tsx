import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BookOpen, Users, Star, Plus } from "lucide-react";
import Link from "next/link";

export default async function TutorCoursesPage() {
  const session = await auth();

  if (!session || !session.user || (session.user.role !== "TUTOR" && session.user.role !== "ADMIN")) {
    redirect("/login");
  }

  // Mock data for Tutor Courses
  const courses = [
    { id: 1, title: "A-Level Physics: Quantum Mechanics", students: 45, rating: 4.8, status: "Published", img: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80" },
    { id: 2, title: "IGCSE Mathematics: Core Concepts", students: 120, rating: 4.9, status: "Published", img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80" },
    { id: 3, title: "Secondary English: Literature Analysis", students: 34, rating: 4.7, status: "Published", img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80" },
    { id: 4, title: "Advanced Calculus Preparatory", students: 0, rating: 0, status: "Draft", img: null },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">My Courses</h1>
          <p className="text-text-secondary mt-1">Manage your curriculum and track student engagement.</p>
        </div>
        <button className="btn btn-primary shadow-sm shadow-primary-500/20">
          <Plus className="w-4 h-4 mr-2" /> Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="card p-0 overflow-hidden flex flex-col group hover:shadow-lg transition-all border border-glass-border hover:border-primary-300">
            <div className="w-full h-40 bg-bg-tertiary relative flex items-center justify-center">
              {course.img ? (
                <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-text-tertiary">
                  <BookOpen className="w-10 h-10 mb-2" />
                  <span className="text-sm font-medium">No Thumbnail</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-text-primary shadow-sm">
                {course.status}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-text-primary mb-4 group-hover:text-primary-600 transition-colors line-clamp-2">
                {course.title}
              </h3>
              
              <div className="mt-auto grid grid-cols-2 gap-4 border-t border-glass-border pt-4">
                <div>
                  <p className="text-xs text-text-secondary mb-1">Enrolled</p>
                  <p className="font-bold text-text-primary flex items-center gap-1">
                    <Users className="w-3 h-3 text-primary-500" /> {course.students}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Rating</p>
                  <p className="font-bold text-text-primary flex items-center gap-1">
                    <Star className="w-3 h-3 text-warning-400" /> {course.rating > 0 ? course.rating : "N/A"}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <button className="btn btn-secondary flex-1 text-sm">Edit</button>
                <button className="btn btn-secondary flex-1 text-sm border-primary-100 text-primary-600 hover:bg-primary-50">Manage</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
