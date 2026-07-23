import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, GraduationCap, Building, Activity, UserPlus, FileText } from "lucide-react";

export default async function ManagerDashboard() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "MANAGER") {
    redirect("/dashboard");
  }

  const metrics = [
    { label: "Total Students", value: "8,249", icon: GraduationCap, color: "text-primary-600", bg: "bg-primary-50" },
    { label: "Active Tutors", value: "342", icon: Users, color: "text-secondary-600", bg: "bg-secondary-50" },
    { label: "Active Branches", value: "14", icon: Building, color: "text-accent-600", bg: "bg-accent-50" },
    { label: "System Uptime", value: "99.9%", icon: Activity, color: "text-success-600", bg: "bg-success-50" },
  ];

  const recentActivity = [
    { id: 1, action: "New Tutor Application", entity: "Sarah Jenkins (Mathematics)", time: "10 mins ago", icon: UserPlus, color: "text-primary-600", bg: "bg-primary-100" },
    { id: 2, action: "Course Published", entity: "Advanced Physics (A-Level)", time: "2 hours ago", icon: FileText, color: "text-success-600", bg: "bg-success-100" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Staff Overview</h1>
          <p className="text-text-secondary mt-1">Platform overview and user metrics.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-glass-border shadow-sm flex flex-col justify-between group hover:border-primary-300 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.bg} ${metric.color} group-hover:scale-110 transition-transform`}>
                <metric.icon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-text-primary mb-1">{metric.value}</h3>
              <p className="text-sm font-medium text-text-secondary">{metric.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-glass-border shadow-sm">
             <h2 className="text-xl font-bold text-text-primary border-b border-glass-border pb-4 mb-6">Manager Privileges</h2>
             <div className="space-y-4 text-text-secondary">
               <p>Welcome to the Staff Dashboard. As a manager, you have oversight privileges to view platform operations.</p>
               <ul className="list-disc list-inside space-y-2 mt-4 ml-2">
                 <li>View all registered students and tutors.</li>
                 <li>Review course catalog and curriculum details.</li>
                 <li>Monitor class schedules and platform statistics.</li>
               </ul>
               <div className="mt-6 p-4 bg-primary-50 text-primary-700 rounded-xl border border-primary-100 flex items-start gap-3">
                 <Activity className="w-5 h-5 shrink-0 mt-0.5" />
                 <p className="text-sm font-medium">Note: Your role does not permit destructive actions such as deleting user accounts or modifying billing configurations. If you require escalated privileges, contact the System Administrator.</p>
               </div>
             </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-2xl border border-glass-border shadow-sm">
            <h2 className="text-lg font-bold text-text-primary mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-4 group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.bg} ${activity.color}`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{activity.action}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{activity.entity}</p>
                    <p className="text-[10px] text-text-tertiary mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
