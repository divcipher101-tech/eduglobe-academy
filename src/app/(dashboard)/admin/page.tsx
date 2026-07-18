import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Activity, DollarSign, Users, BookOpen } from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          Admin Control Center
        </h1>
        <p className="text-text-secondary">
          Global platform overview and administration.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center p-6">
          <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center mr-4">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Total Users</p>
            <h3 className="text-2xl font-bold text-text-primary">12,450</h3>
          </div>
        </div>
        
        <div className="card flex items-center p-6">
          <div className="w-12 h-12 rounded-lg bg-secondary-100 text-secondary-600 flex items-center justify-center mr-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Active Courses</p>
            <h3 className="text-2xl font-bold text-text-primary">342</h3>
          </div>
        </div>

        <div className="card flex items-center p-6">
          <div className="w-12 h-12 rounded-lg bg-accent-100 text-accent-600 flex items-center justify-center mr-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Monthly Revenue</p>
            <h3 className="text-2xl font-bold text-text-primary">$45.2K</h3>
          </div>
        </div>

        <div className="card flex items-center p-6">
          <div className="w-12 h-12 rounded-lg bg-info-100 text-info-600 flex items-center justify-center mr-4">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">System Status</p>
            <h3 className="text-2xl font-bold text-info-600">Healthy</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
