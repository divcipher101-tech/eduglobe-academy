import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Activity, DollarSign, Users, BookOpen } from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Fetch real system metrics
  const totalUsers = await prisma.user.count();
  const activeCourses = await prisma.course.count({ where: { status: "PUBLISHED" } });
  
  // Calculate total revenue from paid invoices
  const invoices = await prisma.invoice.aggregate({
    where: { status: "PAID" },
    _sum: { totalAmount: true }
  });
  const revenue = invoices._sum.totalAmount || 0;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
          System Overview
        </h1>
        <p className="text-text-secondary">
          Global platform metrics and administration.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center p-6 border-glass-border">
          <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mr-4">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">Total Users</p>
            <h3 className="text-3xl font-bold text-text-primary">{totalUsers.toLocaleString()}</h3>
          </div>
        </div>
        
        <div className="card flex items-center p-6 border-glass-border">
          <div className="w-12 h-12 rounded-full bg-success-50 text-success-600 flex items-center justify-center mr-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">Active Courses</p>
            <h3 className="text-3xl font-bold text-text-primary">{activeCourses.toLocaleString()}</h3>
          </div>
        </div>

        <div className="card flex items-center p-6 border-glass-border">
          <div className="w-12 h-12 rounded-full bg-warning-50 text-warning-600 flex items-center justify-center mr-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-3xl font-bold text-text-primary">₦{Number(revenue).toLocaleString()}</h3>
          </div>
        </div>

        <div className="card flex items-center p-6 border-glass-border">
          <div className="w-12 h-12 rounded-full bg-info-50 text-info-600 flex items-center justify-center mr-4">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">System Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-success-500 animate-pulse"></div>
              <h3 className="text-lg font-bold text-success-600">Online</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
