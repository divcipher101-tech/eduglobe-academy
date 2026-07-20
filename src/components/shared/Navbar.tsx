"use client";

import Link from "next/link";
import { Sparkles, LogOut } from "lucide-react";
import { SignOutModal } from "./SignOutModal";
import { useState } from "react";

export default function Navbar({ session }: { session: any }) {
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 transition-all duration-300">
        {/* Top Banner (Optional for alerts/promos, can be removed) */}
        <div className="w-full bg-primary-900 text-primary-100 text-[11px] font-bold tracking-widest uppercase text-center py-1.5 px-4 hidden sm:block">
          Announcing EduGlobe 2.0 - The Next Generation of Learning 🚀
        </div>
        
        {/* Main Navbar */}
        <div className="w-full bg-white/70 backdrop-blur-xl border-b border-glass-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between relative">
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-md shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-all">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-text-primary">
                  EduGlobe<span className="text-primary-600">.</span>
                </span>
              </Link>
            </div>

            <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 bg-bg-secondary/50 p-1 rounded-xl border border-glass-border/50">
              <Link href="/courses" className="px-4 py-2 rounded-lg text-sm font-bold text-text-secondary hover:text-primary-700 hover:bg-white hover:shadow-sm transition-all">
                Catalog
              </Link>
              <Link href="/about" className="px-4 py-2 rounded-lg text-sm font-bold text-text-secondary hover:text-primary-700 hover:bg-white hover:shadow-sm transition-all">
                Platform
              </Link>
              <Link href="/contact" className="px-4 py-2 rounded-lg text-sm font-bold text-text-secondary hover:text-primary-700 hover:bg-white hover:shadow-sm transition-all">
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              {session ? (
                <div className="flex items-center gap-3">
                  <Link href="/dashboard" className="px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5">
                    Enter Portal
                  </Link>
                  <button onClick={() => setIsSignOutModalOpen(true)} className="p-2.5 rounded-xl text-text-secondary hover:bg-danger-50 hover:text-danger-600 transition-all">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login" className="px-5 py-2.5 rounded-xl text-text-secondary text-sm font-bold hover:bg-bg-tertiary hover:text-text-primary transition-all hidden sm:block border border-transparent hover:border-glass-border">
                    Log in
                  </Link>
                  <Link href="/register" className="px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5">
                    Sign up free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <SignOutModal 
        isOpen={isSignOutModalOpen} 
        onClose={() => setIsSignOutModalOpen(false)} 
      />
    </>
  );
}
