import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, Calendar, Video, Star, DollarSign, Clock, ArrowRight, MessageSquare, CheckCircle2, MoreVertical, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function TutorDashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  if (session.user.role !== "TUTOR" && session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Mock data for the Tutor Dashboard
  const todayClasses = [
    { id: 1, title: "A-Level Physics: Quantum Mechanics", time: "10:00 AM - 11:30 AM", students: 12, type: "Live Class", status: "Upcoming" },
    { id: 2, title: "IGCSE Mathematics: Trigonometry", time: "1:00 PM - 2:00 PM", students: 8, type: "1-on-1 Tutoring", status: "Upcoming" },
    { id: 3, title: "Secondary English: Essay Writing", time: "3:30 PM - 5:00 PM", students: 15, type: "Live Class", status: "Upcoming" },
  ];

  const recentActivity = [
    { id: 1, student: "Emma Watson", action: "submitted assignment", target: "Physics Lab Report", time: "2 hours ago", type: "assignment" },
    { id: 2, student: "James Chen", action: "sent a message", target: "Need help with Q4", time: "4 hours ago", type: "message" },
    { id: 3, student: "Sarah Smith", action: "completed lesson", target: "Trig Ratios", time: "5 hours ago", type: "lesson" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-primary-950 p-8 md:p-12">
        <div className="absolute inset-0 bg-black/5 opacity-20 mix-blend-overlay"></div>
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-40 blur-3xl -z-10"
          style={{ backgroundImage: "radial-gradient(ellipse at top, var(--primary-600) 0%, transparent 70%)" }}
        ></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-primary-100 text-sm font-medium mb-4 backdrop-blur-md">
              <Star className="w-4 h-4 text-warning-400" />
              <span>Top Rated Tutor</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              Welcome back, {session.user.firstName}!
            </h1>
            <p className="text-primary-100 max-w-xl">
              You have {todayClasses.length} classes scheduled today and 5 pending assignments to grade.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="btn bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md">
              <Calendar className="w-4 h-4 mr-2" /> View Calendar
            </button>
            <button className="btn bg-primary-500 hover:bg-primary-400 text-white border-transparent shadow-lg shadow-primary-500/20">
              <Video className="w-4 h-4 mr-2" /> Start Next Class
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="card p-6 flex flex-col justify-between hover:border-primary-300 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-success-600 bg-success-50 px-2 py-1 rounded-md flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-text-primary mb-1">124</h3>
            <p className="text-sm font-medium text-text-secondary">Active Students</p>
          </div>
        </div>
        
        <div className="card p-6 flex flex-col justify-between hover:border-success-300 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-success-50 text-success-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-success-600 bg-success-50 px-2 py-1 rounded-md flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +5%
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-text-primary mb-1">£2,450</h3>
            <p className="text-sm font-medium text-text-secondary">Earnings this Month</p>
          </div>
        </div>

        <div className="card p-6 flex flex-col justify-between hover:border-accent-300 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-text-primary mb-1">45h</h3>
            <p className="text-sm font-medium text-text-secondary">Teaching Hours</p>
          </div>
        </div>

        <div className="card p-6 flex flex-col justify-between hover:border-warning-300 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-warning-50 text-warning-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-text-primary mb-1">4.9/5</h3>
            <p className="text-sm font-medium text-text-secondary">Average Rating (34)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">Today's Schedule</h2>
            <Link href="/tutor/classes" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl border border-glass-border shadow-sm overflow-hidden">
            <div className="divide-y divide-glass-border">
              {todayClasses.map((cls) => (
                <div key={cls.id} className="p-6 hover:bg-bg-secondary/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-bold">{cls.time.split(" ")[0]}</span>
                      <span className="text-[10px]">{cls.time.split(" ")[1]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">
                          {cls.type}
                        </span>
                        <span className="text-xs text-text-tertiary flex items-center gap-1">
                          <Users className="w-3 h-3" /> {cls.students} students
                        </span>
                      </div>
                      <h4 className="font-bold text-text-primary">{cls.title}</h4>
                      <p className="text-sm text-text-secondary flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {cls.time}
                      </p>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm shrink-0">
                    Prepare
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary">Student Activity</h2>
          
          <div className="bg-white rounded-2xl border border-glass-border shadow-sm p-6">
            <div className="space-y-6">
              {recentActivity.map((activity, idx) => (
                <div key={activity.id} className="relative pl-6">
                  {/* Timeline line */}
                  {idx !== recentActivity.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-[-24px] w-0.5 bg-glass-border"></div>
                  )}
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-sm ${
                    activity.type === 'assignment' ? 'bg-success-100 text-success-600' :
                    activity.type === 'message' ? 'bg-primary-100 text-primary-600' :
                    'bg-info-100 text-info-600'
                  }`}>
                    {activity.type === 'assignment' && <CheckCircle2 className="w-3 h-3" />}
                    {activity.type === 'message' && <MessageSquare className="w-3 h-3" />}
                    {activity.type === 'lesson' && <Video className="w-3 h-3" />}
                  </div>

                  <div>
                    <p className="text-sm text-text-primary">
                      <span className="font-bold">{activity.student}</span> {activity.action}
                    </p>
                    <p className="text-sm font-medium text-text-secondary mt-0.5">
                      {activity.target}
                    </p>
                    <p className="text-xs text-text-tertiary mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2 text-sm font-bold text-text-secondary hover:text-primary-600 transition-colors border-t border-glass-border pt-4">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
