"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, BookOpen, Users, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff, GraduationCap } from "lucide-react";
import { Role } from "@/lib/permissions";

const ROLE_INFO = {
  student: {
    title: "Student Registration",
    subtitle: "Join courses, take quizzes, and track your progress.",
    icon: User,
    color: "primary",
  },
  parent: {
    title: "Parent Registration",
    subtitle: "Monitor your child's progress and manage payments.",
    icon: Users,
    color: "secondary",
  },
  tutor: {
    title: "Tutor Application",
    subtitle: "Host classes, manage assignments, and earn money.",
    icon: GraduationCap,
    color: "accent",
  },
};

export default function RoleRegistrationForm({ 
  params 
}: { 
  params: Promise<{ role: string }>
}) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const roleKey = unwrappedParams.role.toLowerCase() as keyof typeof ROLE_INFO;
  const info = ROLE_INFO[roleKey];

  if (!info) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md w-full border border-glass-border">
          <AlertCircle className="w-16 h-16 text-danger-500 mx-auto mb-6" />
          <h2 className="text-2xl font-display font-bold text-text-primary mb-2">Invalid Role</h2>
          <p className="text-text-secondary mb-8">The role you selected does not exist or is unavailable.</p>
          <Link href="/register" className="w-full py-4 rounded-xl text-sm font-bold bg-primary-600 hover:bg-primary-500 text-white shadow-lg transition-all flex items-center justify-center">
            Return to Role Selection
          </Link>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: unwrappedParams.role.toUpperCase(),
        }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "An error occurred during registration.");
        return;
      }
      
      // On success, redirect to login
      router.push(`/login?registered=true`);
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = info.icon;

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Left Side - Animated Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-900 p-12 flex-col justify-between">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className={`absolute top-[-20%] left-[-10%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--${info.color}-600)_0%,_transparent_60%)] -z-10 blur-3xl opacity-50`}></div>
        
        <Link href="/" className="relative z-10 flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight">EduGlobe</span>
        </Link>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-md">
            <Icon className="w-4 h-4" /> {info.title}
          </div>
          <h1 className="text-5xl font-display font-bold text-white leading-tight">
            Begin your <br />
            <span className={`text-${info.color}-300`}>educational journey.</span>
          </h1>
          <p className="text-primary-100/80 text-lg max-w-md">
            {info.subtitle} Experience the next generation of learning with EduGlobe.
          </p>
        </div>

        <div className="relative z-10 text-primary-200/60 text-sm font-medium">
          © {new Date().getFullYear()} EduGlobe Academy. All rights reserved.
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <Link 
              href="/register" 
              className="p-2 -ml-2 rounded-xl text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className={`w-10 h-10 rounded-xl bg-${info.color}-50 text-${info.color}-600 flex items-center justify-center shrink-0 border border-${info.color}-100 shadow-sm`}>
              <Icon className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-display font-bold text-text-primary">{info.title}</h2>
          </div>
          
          <p className="text-text-secondary pb-4 border-b border-glass-border">Fill in your details to create your account.</p>

          {error && (
            <div className="p-4 bg-danger-50/50 border border-danger-200 text-danger-600 rounded-xl text-sm flex items-start gap-3 animate-fade-in-up">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary ml-1" htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium focus:ring-${info.color}-500/10 focus:border-${info.color}-500`}
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary ml-1" htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium focus:ring-${info.color}-500/10 focus:border-${info.color}-500`}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-secondary ml-1" htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium focus:ring-${info.color}-500/10 focus:border-${info.color}-500`}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-secondary ml-1" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-4 pr-12 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium focus:ring-${info.color}-500/10 focus:border-${info.color}-500`}
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors text-text-tertiary hover:text-${info.color}-500`}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-secondary ml-1" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-4 pr-12 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium focus:ring-${info.color}-500/10 focus:border-${info.color}-500`}
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`w-full py-4 rounded-2xl text-lg font-bold mt-8 shadow-xl flex items-center justify-center gap-2 hover:-translate-y-1 transition-all text-white bg-${info.color}-600 hover:bg-${info.color}-500 shadow-${info.color}-500/20`}
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Creating account...</>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-glass-border text-center text-sm font-medium text-text-tertiary">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className={`text-${info.color}-600 hover:text-${info.color}-700 font-bold transition-colors`}>Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className={`text-${info.color}-600 hover:text-${info.color}-700 font-bold transition-colors`}>Privacy Policy</Link>.
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm font-medium text-text-secondary">
              Already have an account?{" "}
              <Link href="/login" className={`text-${info.color}-600 hover:text-${info.color}-700 font-bold transition-colors`}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
