"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, BookOpen, Users, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff, GraduationCap, KeyRound, BookMarked, Check, X } from "lucide-react";

type RoleColor = "primary" | "secondary" | "accent";

const ROLE_INFO = {
  student: {
    title: "Student Registration",
    subtitle: "Join courses, take quizzes, and track your progress.",
    icon: User,
    color: "primary" as RoleColor,
  },
  parent: {
    title: "Parent Registration",
    subtitle: "Monitor your child's progress and manage payments.",
    icon: Users,
    color: "secondary" as RoleColor,
  },
  tutor: {
    title: "Tutor Application",
    subtitle: "Host classes, manage assignments, and earn money.",
    icon: GraduationCap,
    color: "accent" as RoleColor,
  },
};

const THEME_CLASSES = {
  primary: {
    iconBg: "bg-primary-50 text-primary-600 border-primary-100",
    inputFocus: "focus:ring-primary-500/10 focus:border-primary-500",
    iconHover: "hover:text-primary-500",
    btn: "bg-primary-600 hover:bg-primary-500 shadow-primary-500/20",
    link: "text-primary-600 hover:text-primary-700",
    gradientText: "text-primary-300",
    badge: "bg-primary-50 text-primary-700 border-primary-200",
  },
  secondary: {
    iconBg: "bg-secondary-50 text-secondary-600 border-secondary-100",
    inputFocus: "focus:ring-secondary-500/10 focus:border-secondary-500",
    iconHover: "hover:text-secondary-500",
    btn: "bg-secondary-600 hover:bg-secondary-500 shadow-secondary-500/20",
    link: "text-secondary-600 hover:text-secondary-700",
    gradientText: "text-secondary-300",
    badge: "bg-secondary-50 text-secondary-700 border-secondary-200",
  },
  accent: {
    iconBg: "bg-accent-50 text-accent-600 border-accent-100",
    inputFocus: "focus:ring-accent-500/10 focus:border-accent-500",
    iconHover: "hover:text-accent-500",
    btn: "bg-accent-600 hover:bg-accent-500 shadow-accent-500/20",
    link: "text-accent-600 hover:text-accent-700",
    gradientText: "text-accent-300",
    badge: "bg-accent-50 text-accent-700 border-accent-200",
  }
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
  const isTutor = roleKey === 'tutor';
  const isParent = roleKey === 'parent';
  const requiresSecret = isTutor || isParent;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    secretCode: "",
  });
  
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<{id: string, name: string}[]>([]);
  const [isSubjectsDropdownOpen, setIsSubjectsDropdownOpen] = useState(false);
  
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const calculatePasswordStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return 0;
    if (pwd.length >= 8) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/[a-z]/.test(pwd)) score += 25;
    if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pwd)) score += 25;
    return score;
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-glass-border";
    if (score <= 25) return "bg-danger-500";
    if (score <= 50) return "bg-warning-500";
    if (score <= 75) return "bg-accent-500";
    return "bg-success-500";
  };

  // Fetch subjects if it's a tutor
  useEffect(() => {
    if (isTutor) {
      fetch('/api/subjects')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setAvailableSubjects(data);
        })
        .catch(err => console.error("Failed to load subjects", err));
    }
  }, [isTutor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSpecialization = (subjectName: string) => {
    setSpecializations(prev => 
      prev.includes(subjectName) 
        ? prev.filter(s => s !== subjectName)
        : [...prev, subjectName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (passwordStrength < 100) {
      setError("Password must be at least 8 characters and include uppercase, lowercase, and a number/special character.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (requiresSecret && !formData.secretCode) {
      setError("Authorization code is required for this role");
      return;
    }

    if (isTutor && specializations.length === 0) {
      setError("Please select at least one subject you wish to teach");
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
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          role: unwrappedParams.role.toUpperCase(),
          secretCode: requiresSecret ? formData.secretCode : undefined,
          specializations: isTutor ? specializations : undefined,
        }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "An error occurred during registration.");
        return;
      }
      
      // On success, go to OTP step
      setRegisteredEmail(formData.email);
      setIsOtpStep(true);
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registeredEmail,
          code: otpCode
        }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid OTP code.");
        return;
      }
      
      // Success!
      router.push(`/login?registered=true`);
    } catch (err) {
      setError("An error occurred during verification.");
    } finally {
      setIsLoading(false);
    }
  };

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

  const theme = THEME_CLASSES[info.color];
  const Icon = info.icon;

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Left Side - Animated Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-900 p-12 flex-col justify-between">
        <div className="absolute inset-0 bg-black/5 opacity-20 mix-blend-overlay"></div>
        <div 
          className="absolute top-[-20%] left-[-10%] w-[150%] h-[150%] -z-10 blur-3xl opacity-50"
          style={{ backgroundImage: `radial-gradient(circle at center, var(--${info.color}-600) 0%, transparent 60%)` }}
        ></div>
        
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
            <span className={theme.gradientText}>educational journey.</span>
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
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm ${theme.iconBg}`}>
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

          {isOtpStep ? (
            <form onSubmit={handleVerifyOtp} className="space-y-5 animate-fade-in-up">
              <div className="p-6 border border-glass-border rounded-2xl bg-bg-secondary text-center">
                <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Check your email</h3>
                <p className="text-sm text-text-secondary">We've sent a 6-digit verification code to <strong>{registeredEmail}</strong>.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary ml-1">Verification Code</label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className={`w-full px-4 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium text-center text-2xl tracking-widest ${theme.inputFocus}`}
                  placeholder="------"
                  maxLength={6}
                  required
                />
              </div>

              <button 
                type="submit" 
                className={`w-full py-4 rounded-2xl text-lg font-bold mt-8 shadow-xl flex items-center justify-center gap-2 hover:-translate-y-1 transition-all text-white ${theme.btn}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</>
                ) : (
                  "Complete Registration"
                )}
              </button>
            </form>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {requiresSecret && (
              <div className="space-y-2 pb-2">
                <label className="text-sm font-bold text-text-secondary ml-1" htmlFor="secretCode">
                  {isTutor ? "Tutor Authorization Code" : "Parent Authorization Phrase"} <span className="text-danger-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyRound className="w-5 h-5 text-text-tertiary" />
                  </div>
                  <input
                    id="secretCode"
                    name="secretCode"
                    type={showPassword ? "text" : "password"}
                    value={formData.secretCode}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-12 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium ${theme.inputFocus}`}
                    placeholder="Enter your secret code..."
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors text-text-tertiary ${theme.iconHover}`}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-text-tertiary ml-1 mt-1">
                  This code is provided by EduGlobe administration to authorize your {roleKey} account.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary ml-1" htmlFor="firstName">First Name <span className="text-danger-500">*</span></label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium ${theme.inputFocus}`}
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary ml-1" htmlFor="lastName">Last Name <span className="text-danger-500">*</span></label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium ${theme.inputFocus}`}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary ml-1" htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium ${theme.inputFocus}`}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary ml-1" htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium ${theme.inputFocus}`}
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
                className={`w-full px-4 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium ${theme.inputFocus}`}
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
                  className={`w-full pl-4 pr-12 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium ${theme.inputFocus}`}
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors text-text-tertiary ${theme.iconHover}`}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Password Strength Meter */}
              {formData.password && (
                <div className="pt-2 animate-fade-in-up">
                  <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden">
                    <div className={`flex-1 transition-colors duration-300 ${passwordStrength >= 25 ? getStrengthColor(passwordStrength) : 'bg-glass-border'}`}></div>
                    <div className={`flex-1 transition-colors duration-300 ${passwordStrength >= 50 ? getStrengthColor(passwordStrength) : 'bg-glass-border'}`}></div>
                    <div className={`flex-1 transition-colors duration-300 ${passwordStrength >= 75 ? getStrengthColor(passwordStrength) : 'bg-glass-border'}`}></div>
                    <div className={`flex-1 transition-colors duration-300 ${passwordStrength >= 100 ? getStrengthColor(passwordStrength) : 'bg-glass-border'}`}></div>
                  </div>
                  <p className="text-xs text-text-tertiary mt-1">
                    {passwordStrength < 100 ? "Use 8+ characters, mixing uppercase, lowercase & numbers." : "Strong password!"}
                  </p>
                </div>
              )}
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
                  className={`w-full pl-4 pr-12 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium ${theme.inputFocus}`}
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors text-text-tertiary ${theme.iconHover}`}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isTutor && (
              <div className="space-y-2 relative">
                <label className="text-sm font-bold text-text-secondary ml-1 flex items-center gap-2">
                  <BookMarked className="w-4 h-4" /> Subjects You Teach <span className="text-danger-500">*</span>
                </label>
                
                {/* Custom Multi-Select Dropdown */}
                <div className={`relative ${isSubjectsDropdownOpen ? 'z-50' : ''}`}>
                  <div 
                    onClick={() => setIsSubjectsDropdownOpen(!isSubjectsDropdownOpen)}
                    className={`w-full px-4 py-4 bg-bg-secondary/50 border border-glass-border rounded-2xl cursor-pointer flex flex-wrap gap-2 min-h-[58px] transition-all ${isSubjectsDropdownOpen ? 'ring-4 ring-accent-500/10 border-accent-500' : ''}`}
                  >
                    {specializations.length === 0 && (
                      <span className="text-text-tertiary font-medium">Select subjects...</span>
                    )}
                    {specializations.map(spec => (
                      <span key={spec} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${theme.badge}`}>
                        {spec}
                        <div 
                          className="hover:bg-black/10 rounded-full p-0.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSpecialization(spec);
                          }}
                        >
                          <X className="w-3 h-3" />
                        </div>
                      </span>
                    ))}
                  </div>

                  {/* Dropdown Menu */}
                  {isSubjectsDropdownOpen && (
                    <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-glass-border rounded-2xl shadow-xl max-h-60 overflow-y-auto py-2 custom-scrollbar">
                      {availableSubjects.length === 0 ? (
                        <div className="p-4 text-center text-sm text-text-tertiary">
                          <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                          Loading subjects...
                        </div>
                      ) : (
                        availableSubjects.map((subject) => {
                          const isSelected = specializations.includes(subject.name);
                          return (
                            <div 
                              key={subject.id}
                              onClick={() => toggleSpecialization(subject.name)}
                              className="px-4 py-3 hover:bg-bg-secondary cursor-pointer flex items-center justify-between transition-colors group"
                            >
                              <span className={`text-sm font-medium ${isSelected ? 'text-accent-600' : 'text-text-primary group-hover:text-accent-600'}`}>
                                {subject.name}
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-accent-500" />}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className={`w-full py-4 rounded-2xl text-lg font-bold mt-8 shadow-xl flex items-center justify-center gap-2 hover:-translate-y-1 transition-all text-white ${theme.btn}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Creating account...</>
              ) : (
                "Continue to Verification"
              )}
            </button>
          </form>
          )}

          <div className="mt-8 pt-8 border-t border-glass-border text-center text-sm font-medium text-text-tertiary">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className={`font-bold transition-colors ${theme.link}`}>Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className={`font-bold transition-colors ${theme.link}`}>Privacy Policy</Link>.
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm font-medium text-text-secondary">
              Already have an account?{" "}
              <Link href="/login" className={`font-bold transition-colors ${theme.link}`}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Click outside to close dropdown (invisible overlay) */}
      {isSubjectsDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsSubjectsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
