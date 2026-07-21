"use client";

import { useState } from "react";
import { Link2, ShieldCheck, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function LinkChildPage() {
  const [linkCode, setLinkCode] = useState("");
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");

  const handleLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkCode || !pin) return;
    
    setStatus("verifying");
    
    // Simulate network request
    setTimeout(() => {
      if (linkCode === "TEST-CODE" && pin === "1234") {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up py-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Link2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-display font-bold text-text-primary">Link Student Account</h1>
        <p className="text-text-secondary max-w-lg mx-auto">
          Enter the unique 8-character connection code and 4-digit PIN provided by your child&apos;s school or tutor to link their account to your dashboard.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-glass-border shadow-lg p-8 sm:p-12 relative overflow-hidden">
        {status === "success" ? (
          <div className="text-center animate-fade-in-up py-8">
            <div className="w-20 h-20 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Account Linked Successfully!</h2>
            <p className="text-text-secondary mb-8">
              Emma Watson&apos;s student account is now linked to your parent portal.
            </p>
            <Link href="/parent" className="btn btn-primary w-full sm:w-auto">
              Return to Dashboard
            </Link>
          </div>
        ) : (
          <form onSubmit={handleLink} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">Student Connection Code</label>
                <input 
                  type="text" 
                  value={linkCode}
                  onChange={(e) => setLinkCode(e.target.value.toUpperCase())}
                  placeholder="e.g. A8X9-K2M4"
                  className="w-full px-4 py-3 rounded-xl border border-glass-border bg-bg-secondary/30 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-center text-lg font-mono tracking-widest uppercase"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">Security PIN</label>
                <input 
                  type="password" 
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-full px-4 py-3 rounded-xl border border-glass-border bg-bg-secondary/30 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-center text-2xl font-mono tracking-widest"
                  required
                />
                <p className="text-xs text-text-tertiary mt-2 flex items-center gap-1 justify-center">
                  <ShieldCheck className="w-3 h-3" /> Secure 256-bit encryption
                </p>
              </div>
            </div>

            {status === "error" && (
              <div className="p-4 bg-error-50 border border-error-200 rounded-xl text-error-700 text-sm font-medium text-center animate-shake">
                Invalid connection code or PIN. Please try again. (Hint: TEST-CODE / 1234)
              </div>
            )}

            <button 
              type="submit" 
              disabled={status === "verifying" || !linkCode || !pin}
              className="w-full btn btn-primary py-4 text-lg shadow-primary-500/25 shadow-lg flex items-center justify-center gap-2"
            >
              {status === "verifying" ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Link Account <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <div className="p-6 rounded-2xl bg-primary-50 border border-primary-100 flex gap-4">
          <ShieldCheck className="w-6 h-6 text-primary-600 shrink-0" />
          <div>
            <h4 className="font-bold text-primary-900 mb-1">Privacy First</h4>
            <p className="text-sm text-primary-800">Only verified parents or guardians can access student records.</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-bg-secondary border border-glass-border flex gap-4">
          <Users className="w-6 h-6 text-text-tertiary shrink-0" />
          <div>
            <h4 className="font-bold text-text-primary mb-1">Need Help?</h4>
            <p className="text-sm text-text-secondary">Contact your school administrator if you haven&apos;t received a code.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
