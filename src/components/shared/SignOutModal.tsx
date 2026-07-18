"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut, X, Loader2, AlertTriangle } from "lucide-react";

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignOutModal({ isOpen, onClose }: SignOutModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSignOut = async () => {
    setIsLoading(true);
    // Sign out and redirect to login
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-primary-900/40 backdrop-blur-md transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.12)] border border-glass-border p-8 animate-fade-in-up overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-danger-500/10 rounded-bl-full -z-10" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-500/5 rounded-tr-full -z-10" />

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-text-tertiary hover:text-text-primary transition-colors bg-bg-secondary hover:bg-bg-tertiary p-2 rounded-full"
          disabled={isLoading}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-danger-50 flex items-center justify-center border border-danger-100 shadow-sm shadow-danger-500/10">
            <LogOut className="w-8 h-8 text-danger-500 ml-1" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-display font-bold text-text-primary">Sign Out?</h3>
            <p className="text-text-secondary">
              Are you sure you want to sign out of your EduGlobe account?
            </p>
          </div>

          <div className="bg-warning-50/50 border border-warning-200 text-warning-700 p-4 rounded-xl text-sm flex items-start gap-3 w-full text-left">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-warning-500" />
            <span>Make sure you have saved all your ongoing coursework before signing out.</span>
          </div>

          <div className="flex flex-col gap-3 w-full pt-2">
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-sm font-bold bg-danger-600 hover:bg-danger-500 text-white shadow-lg shadow-danger-500/20 hover:shadow-xl hover:shadow-danger-500/30 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Signing out...</>
              ) : (
                "Yes, Sign me out"
              )}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-text-secondary hover:bg-bg-secondary border border-transparent hover:border-glass-border transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
