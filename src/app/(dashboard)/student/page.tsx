import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BookOpen, Calendar, Clock, Trophy, PlayCircle } from "lucide-react";
import Link from "next/link";

export default async function StudentDashboard() {
  const session = await auth();

  // Route protection should already handle this in middleware, but double check
  if (!session || !session.user) {
    redirect("/login");
  }

  // Check role
  if (session.user.role !== "STUDENT" && session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Welcome back, {session.user.firstName}!
          </h1>
          <p className="text-text-secondary">
            Ready to continue learning? You have 2 classes coming up today.
          </p>
        </div>
        
        <Link href="/dashboard/student/ai-assistant" className="btn btn-secondary">
          <Trophy className="w-4 h-4 mr-2" /> Ask AI Assistant
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center p-6">
          <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center mr-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Enrolled Courses</p>
            <h3 className="text-2xl font-bold text-text-primary">4</h3>
          </div>
        </div>
        
        <div className="card flex items-center p-6">
          <div className="w-12 h-12 rounded-lg bg-secondary-100 text-secondary-600 flex items-center justify-center mr-4">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Live Classes</p>
            <h3 className="text-2xl font-bold text-text-primary">12</h3>
          </div>
        </div>
        
        <div className="card flex items-center p-6">
          <div className="w-12 h-12 rounded-lg bg-accent-100 text-accent-600 flex items-center justify-center mr-4">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Hours Learned</p>
            <h3 className="text-2xl font-bold text-text-primary">34.5</h3>
          </div>
        </div>

        <div className="card flex items-center p-6">
          <div className="w-12 h-12 rounded-lg bg-info-100 text-info-600 flex items-center justify-center mr-4">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Achievements</p>
            <h3 className="text-2xl font-bold text-text-primary">8</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-text-primary">Continue Learning</h2>
          
          {/* Mock Course Card */}
          <Link href="/student/courses/crs-101" className="block card p-0 overflow-hidden flex flex-col sm:flex-row group cursor-pointer hover:shadow-lg transition-all border border-glass-border hover:border-primary-300">
            <div className="w-full sm:w-48 h-32 bg-bg-tertiary relative flex shrink-0 items-center justify-center">
               <PlayCircle className="w-12 h-12 text-text-tertiary group-hover:text-primary-500 transition-colors z-10" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md uppercase tracking-wider">IGCSE Mathematics</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary-600 transition-colors">Algebraic Fractions</h3>
              
              <div className="mt-auto">
                <div className="flex justify-between text-xs text-text-secondary font-medium mb-1.5">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-bg-tertiary rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full transition-all" style={{ width: "65%" }}></div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/student/courses/crs-102" className="block card p-0 overflow-hidden flex flex-col sm:flex-row group cursor-pointer hover:shadow-lg transition-all border border-glass-border hover:border-secondary-300">
            <div className="w-full sm:w-48 h-32 bg-bg-tertiary relative flex shrink-0 items-center justify-center">
               <PlayCircle className="w-12 h-12 text-text-tertiary group-hover:text-secondary-500 transition-colors z-10" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-secondary-600 bg-secondary-50 px-2 py-1 rounded-md uppercase tracking-wider">A-Level Physics</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-secondary-600 transition-colors">Quantum Mechanics Intro</h3>
              
              <div className="mt-auto">
                <div className="flex justify-between text-xs text-text-secondary font-medium mb-1.5">
                  <span>Progress</span>
                  <span>12%</span>
                </div>
                <div className="w-full bg-bg-tertiary rounded-full h-2">
                  <div className="bg-secondary-500 h-2 rounded-full transition-all" style={{ width: "12%" }}></div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Sidebar / Upcoming */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary">Upcoming Classes</h2>
          
          <div className="card p-5 border-l-4 border-l-primary-500 border-t border-r border-b border-glass-border hover:shadow-md transition-all">
            <div className="flex items-center gap-2 text-sm text-text-secondary font-medium mb-2">
              <Clock className="w-4 h-4" /> 10:00 AM - 11:30 AM
            </div>
            <h3 className="font-bold text-text-primary">Advanced Calculus Live Session</h3>
            <p className="text-sm text-text-secondary mt-1 font-medium">with Dr. Sarah Jenkins</p>
            <Link href="/student/classes/cls-101" className="block w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-center rounded-xl mt-4 transition-colors">
              Join Virtual Classroom
            </Link>
          </div>

          <div className="card p-5 border-l-4 border-l-secondary-500 border-t border-r border-b border-glass-border hover:shadow-md transition-all">
            <div className="flex items-center gap-2 text-sm text-text-secondary font-medium mb-2">
              <Clock className="w-4 h-4" /> 2:00 PM - 3:00 PM
            </div>
            <h3 className="font-bold text-text-primary">Introduction to Python Programming</h3>
            <p className="text-sm text-text-secondary mt-1 font-medium">with Mrs. Adeyinka</p>
            <button className="btn btn-secondary btn-sm w-full mt-4" disabled>Starts in 4 hours</button>
          </div>
        </div>
      </div>
    </div>
  );
}
