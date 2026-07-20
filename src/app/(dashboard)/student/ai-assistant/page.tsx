import { Sparkles, Compass } from "lucide-react";

export default function AIAssistantPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center animate-fade-in-up">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-2xl shadow-primary-500/30 mb-8 relative group cursor-not-allowed">
        <Sparkles className="w-12 h-12 text-white animate-pulse" />
        <div className="absolute -top-2 -right-2 bg-warning-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white shadow-sm uppercase">
          Beta
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4 tracking-tight">
        EduGlobe AI is <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Coming Soon</span>
      </h1>
      
      <p className="text-lg text-text-secondary max-w-xl mb-12">
        We are training a revolutionary AI assistant to help you with your homework, explain complex topics, and guide your learning journey. Stay tuned!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full opacity-60 pointer-events-none">
        <div className="bg-white p-6 rounded-3xl border border-glass-border shadow-sm flex flex-col items-center text-center blur-[1px]">
          <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-text-primary mb-2">24/7 Tutoring</h3>
          <p className="text-sm text-text-secondary">Instant answers to any academic questions.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-glass-border shadow-sm flex flex-col items-center text-center blur-[1px]">
          <div className="w-12 h-12 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-text-primary mb-2">Smart Summaries</h3>
          <p className="text-sm text-text-secondary">Turn long lectures into bite-sized notes.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-glass-border shadow-sm flex flex-col items-center text-center blur-[1px]">
          <div className="w-12 h-12 rounded-xl bg-success-50 text-success-600 flex items-center justify-center mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-text-primary mb-2">Exam Prep</h3>
          <p className="text-sm text-text-secondary">Personalized practice tests on demand.</p>
        </div>
      </div>
    </div>
  );
}
