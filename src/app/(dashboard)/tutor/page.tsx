import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, Calendar, Video, Star } from "lucide-react";

export default async function TutorDashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  if (session.user.role !== "TUTOR" && session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Tutor Portal
        </h1>
        <p className="text-text-secondary">
          Welcome back, {session.user.firstName}. You have 3 classes to teach today.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center p-6">
          <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center mr-4">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Active Students</p>
            <h3 className="text-2xl font-bold text-text-primary">124</h3>
          </div>
        </div>
        
        <div className="card flex items-center p-6">
          <div className="w-12 h-12 rounded-lg bg-secondary-100 text-secondary-600 flex items-center justify-center mr-4">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Classes Today</p>
            <h3 className="text-2xl font-bold text-text-primary">3</h3>
          </div>
        </div>

        <div className="card flex items-center p-6">
          <div className="w-12 h-12 rounded-lg bg-accent-100 text-accent-600 flex items-center justify-center mr-4">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Total Hours</p>
            <h3 className="text-2xl font-bold text-text-primary">450</h3>
          </div>
        </div>

        <div className="card flex items-center p-6">
          <div className="w-12 h-12 rounded-lg bg-warning-100 text-warning-600 flex items-center justify-center mr-4">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Average Rating</p>
            <h3 className="text-2xl font-bold text-text-primary">4.9</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
