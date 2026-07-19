import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, GraduationCap, DollarSign, Building, TrendingUp, Activity, UserPlus, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const metrics = [
    { label: "Total Students", value: "8,249", change: "+12%", trend: "up", icon: GraduationCap, color: "text-primary-600", bg: "bg-primary-50" },
    { label: "Active Tutors", value: "342", change: "+5%", trend: "up", icon: Users, color: "text-secondary-600", bg: "bg-secondary-50" },
    { label: "Monthly Revenue", value: "£124,500", change: "+18%", trend: "up", icon: DollarSign, color: "text-success-600", bg: "bg-success-50" },
    { label: "Active Branches", value: "14", change: "0%", trend: "neutral", icon: Building, color: "text-accent-600", bg: "bg-accent-50" },
  ];

  const recentActivity = [
    { id: 1, action: "New Tutor Application", entity: "Sarah Jenkins (Mathematics)", time: "10 mins ago", icon: UserPlus, color: "text-primary-600", bg: "bg-primary-100" },
    { id: 2, action: "Course Published", entity: "Advanced Physics (A-Level)", time: "2 hours ago", icon: FileText, color: "text-success-600", bg: "bg-success-100" },
    { id: 3, action: "Large Payment Processed", entity: "£1,200 from ID: STU-8921", time: "4 hours ago", icon: DollarSign, color: "text-warning-600", bg: "bg-warning-100" },
    { id: 4, action: "System Alert", entity: "High CPU usage on Video Server", time: "5 hours ago", icon: Activity, color: "text-error-600", bg: "bg-error-100" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Admin Control Center</h1>
          <p className="text-text-secondary mt-1">Platform overview and global metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/users" className="btn btn-primary shadow-sm shadow-primary-500/20">
            Manage Users
          </Link>
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
              <span className={`text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 ${
                metric.trend === 'up' ? 'text-success-600 bg-success-50' : 'text-text-tertiary bg-bg-tertiary'
              }`}>
                {metric.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                {metric.change}
              </span>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-text-primary mb-1">{metric.value}</h3>
              <p className="text-sm font-medium text-text-secondary">{metric.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-glass-border shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary">Revenue Growth</h2>
            <select className="bg-bg-secondary border-none rounded-lg text-sm font-medium text-text-secondary focus:ring-0">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="flex-1 min-h-[300px] flex items-end gap-2 relative">
            {/* Custom CSS Bar Chart Mock */}
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-text-tertiary pb-6">
              <div className="border-b border-glass-border border-dashed w-full flex-1">£150k</div>
              <div className="border-b border-glass-border border-dashed w-full flex-1">£100k</div>
              <div className="border-b border-glass-border border-dashed w-full flex-1">£50k</div>
              <div className="w-full flex-1">0</div>
            </div>
            <div className="w-full h-full flex items-end justify-between px-2 sm:px-8 relative z-10 pb-6 pt-10">
              {[40, 55, 45, 70, 85, 100].map((h, i) => (
                <div key={i} className="w-1/12 bg-primary-100 hover:bg-primary-200 rounded-t-lg relative group transition-colors" style={{ height: `${h}%` }}>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-text-secondary">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl border border-glass-border shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary">System Activity</h2>
          </div>
          
          <div className="flex-1 space-y-6">
            {recentActivity.map((activity, idx) => (
              <div key={activity.id} className="relative pl-10">
                {idx !== recentActivity.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-[-24px] w-0.5 bg-glass-border"></div>
                )}
                
                <div className={`absolute left-0 top-0.5 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${activity.bg} ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                
                <div>
                  <p className="text-sm font-bold text-text-primary">{activity.action}</p>
                  <p className="text-sm text-text-secondary mt-0.5">{activity.entity}</p>
                  <p className="text-xs text-text-tertiary mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2 text-sm font-bold text-text-secondary hover:text-primary-600 transition-colors border-t border-glass-border pt-4 flex items-center justify-center gap-1">
            View All Logs <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
