"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, BookOpen, Users, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Role } from "@/lib/permissions";

const ROLE_INFO = {
  student: {
    title: "Student Registration",
    icon: User,
    color: "primary",
  },
  parent: {
    title: "Parent Registration",
    icon: Users,
    color: "secondary",
  },
  tutor: {
    title: "Tutor Application",
    icon: BookOpen,
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
      <div className="text-center p-6">
        <AlertCircle className="w-12 h-12 text-danger-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Invalid Role</h2>
        <p className="text-text-secondary mb-6">The role you selected does not exist.</p>
        <Link href="/register" className="btn btn-primary">
          Go back
        </Link>
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
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link 
          href="/register" 
          className="p-2 -ml-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className={`w-10 h-10 rounded-lg bg-${info.color}-100 text-${info.color}-600 flex items-center justify-center shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-text-primary">{info.title}</h2>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-danger-50 border border-danger-200 text-danger-600 rounded-lg text-sm flex items-start gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label form-label-required" htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
              placeholder="John"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label form-label-required" htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label form-label-required" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label form-label-required" htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="form-input pr-10"
              placeholder="••••••••"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="form-helper">Must be at least 8 characters long</p>
        </div>

        <div className="form-group">
          <label className="form-label form-label-required" htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input pr-10"
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>
        </div>

        <button 
          type="submit" 
          className={`btn btn-${info.color} w-full mt-6`}
          disabled={isLoading}
        >
          {isLoading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Creating account...</>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-text-tertiary">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-text-secondary">Terms of Service</Link>
        {" "}and{" "}
        <Link href="/privacy" className="underline hover:text-text-secondary">Privacy Policy</Link>.
      </div>
    </div>
  );
}
