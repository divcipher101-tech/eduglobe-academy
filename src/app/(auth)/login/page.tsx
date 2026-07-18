"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, AlertCircle, CheckCircle2, Loader2, Eye, EyeOff, BookOpen, GraduationCap, ArrowRight, User, Users } from "lucide-react";

type RoleType = "STUDENT" | "PARENT" | "TUTOR";

function LoginForm() {
  const router = useRouter();
  
  // Cache busting effect for when a user signs out and uses the back button
  useEffect(() => {
    router.refresh();
  }, [router]);

  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";
  
  const [activeRole, setActiveRole] = useState<RoleType>("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex bg-bg-secondary p-1 rounded-2xl mb-8 border border-glass-border">
        <button
          onClick={() => setActiveRole("STUDENT")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            activeRole === "STUDENT" 
              ? "bg-white text-primary-600 shadow-sm border border-glass-border/50 scale-[1.02]" 
              : "text-text-secondary hover:text-text-primary hover:bg-white/50"
          }`}
        >
          <User className="w-4 h-4" /> Student
        </button>
        <button
          onClick={() => setActiveRole("PARENT")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            activeRole === "PARENT" 
              ? "bg-white text-secondary-600 shadow-sm border border-glass-border/50 scale-[1.02]" 
              : "text-text-secondary hover:text-text-primary hover:bg-white/50"
          }`}
        >
          <Users className="w-4 h-4" /> Parent
        </button>
        <button
          onClick={() => setActiveRole("TUTOR")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            activeRole === "TUTOR" 
              ? "bg-white text-accent-600 shadow-sm border border-glass-border/50 scale-[1.02]" 
              : "text-text-secondary hover:text-text-primary hover:bg-white/50"
          }`}
        >
          <GraduationCap className="w-4 h-4" /> Tutor
        </button>
      </div>

      {isRegistered && (
        <div className="mb-6 p-4 bg-success-50/50 border border-success-200 text-success-700 rounded-xl text-sm flex items-start gap-3 animate-fade-in-up">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="font-medium">Registration successful! You can now sign in.</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-danger-50/50 border border-danger-200 text-danger-600 rounded-xl text-sm flex items-start gap-3 animate-fade-in-up">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-bold text-text-secondary ml-1" htmlFor="email">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className={`w-5 h-5 text-text-tertiary transition-colors ${
                activeRole === "STUDENT" ? "group-focus-within:text-primary-500" :
                activeRole === "PARENT" ? "group-focus-within:text-secondary-500" :
                "group-focus-within:text-accent-500"
              }`} />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium ${
                activeRole === "STUDENT" ? "focus:ring-primary-500/10 focus:border-primary-500" :
                activeRole === "PARENT" ? "focus:ring-secondary-500/10 focus:border-secondary-500" :
                "focus:ring-accent-500/10 focus:border-accent-500"
              }`}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between ml-1">
            <label className="text-sm font-bold text-text-secondary" htmlFor="password">Password</label>
            <Link href="/forgot-password" className={`text-xs font-bold transition-colors ${
              activeRole === "STUDENT" ? "text-primary-600 hover:text-primary-700" :
              activeRole === "PARENT" ? "text-secondary-600 hover:text-secondary-700" :
              "text-accent-600 hover:text-accent-700"
            }`}>
              Forgot password?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className={`w-5 h-5 text-text-tertiary transition-colors ${
                activeRole === "STUDENT" ? "group-focus-within:text-primary-500" :
                activeRole === "PARENT" ? "group-focus-within:text-secondary-500" :
                "group-focus-within:text-accent-500"
              }`} />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-12 pr-12 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium ${
                activeRole === "STUDENT" ? "focus:ring-primary-500/10 focus:border-primary-500" :
                activeRole === "PARENT" ? "focus:ring-secondary-500/10 focus:border-secondary-500" :
                "focus:ring-accent-500/10 focus:border-accent-500"
              }`}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors ${
                activeRole === "STUDENT" ? "text-text-tertiary hover:text-primary-500" :
                activeRole === "PARENT" ? "text-text-tertiary hover:text-secondary-500" :
                "text-text-tertiary hover:text-accent-500"
              }`}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className={`w-full py-4 rounded-2xl text-lg font-bold mt-8 shadow-xl flex items-center justify-center gap-2 hover:-translate-y-1 transition-all text-white ${
            activeRole === "STUDENT" ? "bg-primary-600 hover:bg-primary-500 shadow-primary-500/20" :
            activeRole === "PARENT" ? "bg-secondary-600 hover:bg-secondary-500 shadow-secondary-500/20" :
            "bg-accent-600 hover:bg-accent-500 shadow-accent-500/20"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Signing in...</>
          ) : (
            <>Access {activeRole.charAt(0) + activeRole.slice(1).toLowerCase()} Portal <ArrowRight className="w-5 h-5" /></>
          )}
        </button>
      </form>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Left Side - Animated Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-900 p-12 flex-col justify-between">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--primary-600)_0%,_transparent_60%)] -z-10 blur-3xl opacity-50"></div>
        
        <Link href="/" className="relative z-10 flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight">EduGlobe</span>
        </Link>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-md">
            <GraduationCap className="w-4 h-4" /> Secure Enterprise Login
          </div>
          <h1 className="text-5xl font-display font-bold text-white leading-tight">
            Continue your <br />
            <span className="text-primary-200">educational journey.</span>
          </h1>
          <p className="text-primary-100/80 text-lg max-w-md">
            Log in to access your customized portal, interact with resources, and experience the next generation of learning.
          </p>
        </div>

        <div className="relative z-10 text-primary-200/60 text-sm font-medium">
          © {new Date().getFullYear()} EduGlobe Academy. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">Sign In</h2>
            <p className="text-text-secondary">Select your portal to continue</p>
          </div>
          
          <Suspense fallback={<div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary-600" /></div>}>
            <LoginForm />
          </Suspense>

          <div className="text-center mt-8 pt-8 border-t border-glass-border">
            <p className="text-sm font-medium text-text-secondary">
              Don't have an account yet?{" "}
              <Link href="/register" className="text-primary-600 hover:text-primary-700 font-bold transition-colors">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
