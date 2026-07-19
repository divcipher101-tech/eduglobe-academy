import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Download, Calendar as CalendarIcon, Filter, TrendingUp, Users, DollarSign, Globe2 } from "lucide-react";

export default async function AdminAnalyticsPage() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Pure CSS bar heights for mock charts
  const revenueData = [40, 55, 45, 70, 85, 100, 90, 110, 105, 120, 130, 140];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const studentGrowth = [20, 35, 50, 45, 60, 75, 80, 70, 85, 95, 90, 100];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Analytics & Reports</h1>
          <p className="text-text-secondary mt-1">Deep dive into platform metrics and performance data.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary shadow-sm">
            <CalendarIcon className="w-4 h-4 mr-2" /> This Year
          </button>
          <button className="btn btn-primary shadow-sm shadow-primary-500/20">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-glass-border shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm font-medium text-text-secondary">YTD Revenue</p>
              <h3 className="text-3xl font-bold text-text-primary mt-1">£1.2M</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-success-50 text-success-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-sm font-bold text-success-600 flex items-center gap-1 mt-4">
            <TrendingUp className="w-4 h-4" /> +24% vs last year
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-glass-border shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm font-medium text-text-secondary">New Enrollments</p>
              <h3 className="text-3xl font-bold text-text-primary mt-1">4,291</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-sm font-bold text-success-600 flex items-center gap-1 mt-4">
            <TrendingUp className="w-4 h-4" /> +12% vs last year
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-glass-border shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm font-medium text-text-secondary">Global Reach</p>
              <h3 className="text-3xl font-bold text-text-primary mt-1">42 Countries</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent-50 text-accent-600 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-sm font-bold text-success-600 flex items-center gap-1 mt-4">
            <TrendingUp className="w-4 h-4" /> +5 new regions
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl border border-glass-border shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-text-primary">Revenue Pipeline</h2>
              <p className="text-xs text-text-secondary mt-1">Monthly breakdown (GBP)</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-bg-secondary text-text-tertiary transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 min-h-[300px] flex items-end gap-1 sm:gap-2 relative pt-10">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-text-tertiary pb-6">
              <div className="border-b border-glass-border border-dashed w-full flex-1">£150k</div>
              <div className="border-b border-glass-border border-dashed w-full flex-1">£100k</div>
              <div className="border-b border-glass-border border-dashed w-full flex-1">£50k</div>
              <div className="w-full flex-1">0</div>
            </div>
            
            {/* Bars */}
            <div className="w-full h-full flex items-end justify-between relative z-10 pb-6 pl-10 pr-2">
              {revenueData.map((h, i) => (
                <div key={i} className="w-full mx-0.5 sm:mx-1 bg-success-100 hover:bg-success-200 rounded-t-md relative group transition-colors" style={{ height: `${h}%` }}>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-success-600 to-success-400 rounded-t-md opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    £{h},000
                  </div>
                  
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-medium text-text-secondary">
                    {months[i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Student Growth Chart */}
        <div className="bg-white rounded-2xl border border-glass-border shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-text-primary">Student Acquisition</h2>
              <p className="text-xs text-text-secondary mt-1">New enrollments per month</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-bg-secondary text-text-tertiary transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 min-h-[300px] flex items-end gap-1 sm:gap-2 relative pt-10">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-text-tertiary pb-6">
              <div className="border-b border-glass-border border-dashed w-full flex-1">1k</div>
              <div className="border-b border-glass-border border-dashed w-full flex-1">750</div>
              <div className="border-b border-glass-border border-dashed w-full flex-1">500</div>
              <div className="border-b border-glass-border border-dashed w-full flex-1">250</div>
              <div className="w-full flex-1">0</div>
            </div>
            
            {/* Bars */}
            <div className="w-full h-full flex items-end justify-between relative z-10 pb-6 pl-6 pr-2">
              {studentGrowth.map((h, i) => (
                <div key={i} className="w-full mx-0.5 sm:mx-1 bg-primary-100 hover:bg-primary-200 rounded-t-md relative group transition-colors" style={{ height: `${h}%` }}>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-md opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    {h * 10} students
                  </div>
                  
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-medium text-text-secondary">
                    {months[i]}
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
