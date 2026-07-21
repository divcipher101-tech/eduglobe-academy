import Link from "next/link";
import { User, BookOpen, Users, GraduationCap, ChevronRight } from "lucide-react";

export default function RegisterRoleSelection() {
  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Left Side - Animated Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-900 p-12 flex-col justify-between">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-[10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--secondary-600)_0%,_transparent_60%)] -z-10 blur-3xl opacity-40"></div>
        
        <Link href="/" className="relative z-10 flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight">EduGlobe</span>
        </Link>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-md">
            <Users className="w-4 h-4" /> Join our global community
          </div>
          <h1 className="text-5xl font-display font-bold text-white leading-tight">
            Start your <br />
            <span className="text-secondary-300">learning adventure.</span>
          </h1>
          <p className="text-primary-100/80 text-lg max-w-md">
            Whether you&apos;re looking to learn, track your child&apos;s progress, or share your expertise, EduGlobe Academy is your ultimate platform.
          </p>
        </div>

        <div className="relative z-10 text-primary-200/60 text-sm font-medium">
          © {new Date().getFullYear()} EduGlobe Academy. All rights reserved.
        </div>
      </div>

      {/* Right Side - Role Selection */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-lg space-y-8 animate-fade-in-up">
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">Create an account</h2>
            <p className="text-text-secondary">Choose how you want to use the platform</p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/register/student" 
              className="flex items-center justify-between p-6 bg-white border border-glass-border rounded-2xl hover:border-primary-400 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-primary-700 transition-colors">I am a Student</h3>
                  <p className="text-sm text-text-secondary mt-1">Join courses, take quizzes, track progress.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link 
              href="/register/parent" 
              className="flex items-center justify-between p-6 bg-white border border-glass-border rounded-2xl hover:border-secondary-400 hover:shadow-xl hover:shadow-secondary-500/10 hover:-translate-y-1 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-secondary-50 text-secondary-600 flex items-center justify-center shrink-0 group-hover:bg-secondary-500 group-hover:text-white transition-colors">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-secondary-700 transition-colors">I am a Parent</h3>
                  <p className="text-sm text-text-secondary mt-1">Monitor progress and manage payments.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-secondary-600 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link 
              href="/register/tutor" 
              className="flex items-center justify-between p-6 bg-white border border-glass-border rounded-2xl hover:border-accent-400 hover:shadow-xl hover:shadow-accent-500/10 hover:-translate-y-1 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-accent-50 text-accent-600 flex items-center justify-center shrink-0 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-700 transition-colors">I am a Tutor</h3>
                  <p className="text-sm text-text-secondary mt-1">Host classes, manage assignments, earn money.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-accent-600 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-glass-border">
            <p className="text-sm font-medium text-text-secondary">
              Already have an account?{" "}
              <Link href="/login" className="text-primary-600 hover:text-primary-700 font-bold transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
