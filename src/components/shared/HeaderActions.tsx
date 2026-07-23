"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, User, Settings, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { SignOutModal } from "./SignOutModal";

export function HeaderActions({
  userName,
  userImage,
  userRole,
}: {
  userName: string;
  userImage: string | null | undefined;
  userRole: string;
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const rolePrefix = `/${userRole.toLowerCase()}`;

  return (
    <>
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileOpen(false);
            }}
            className={`p-2 text-text-secondary hover:text-primary-600 rounded-full hover:bg-primary-50 relative transition-colors ${isNotificationsOpen ? 'bg-primary-50 text-primary-600' : ''}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full border-2 border-white"></span>
          </button>
          
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-glass-border shadow-xl overflow-hidden z-50 animate-fade-in-up">
              <div className="p-4 border-b border-glass-border flex items-center justify-between bg-bg-secondary/50">
                <h3 className="font-bold text-text-primary">Notifications</h3>
                <button className="text-xs text-primary-600 font-bold hover:text-primary-700">Mark all as read</button>
              </div>
              <div className="max-h-[300px] overflow-y-auto p-2">
                <div className="p-3 hover:bg-bg-tertiary rounded-xl transition-colors cursor-pointer border-l-4 border-primary-500 bg-primary-50/30">
                  <p className="text-sm font-medium text-text-primary">Welcome to EduGlobe!</p>
                  <p className="text-xs text-text-secondary mt-1">Get started by exploring your dashboard.</p>
                  <p className="text-[10px] text-text-tertiary mt-2">Just now</p>
                </div>
                {/* Add more mock notifications as needed */}
              </div>
              <div className="p-3 border-t border-glass-border text-center bg-bg-secondary/50">
                <Link href={`${rolePrefix}/messages`} className="text-sm font-bold text-primary-600 hover:text-primary-700">
                  View All Activity
                </Link>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-8 w-px bg-glass-border mx-1 hidden sm:block"></div>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationsOpen(false);
            }}
            className={`flex items-center gap-3 hover:bg-bg-tertiary p-1.5 pr-3 rounded-full transition-colors ${isProfileOpen ? 'bg-bg-tertiary' : ''}`}
          >
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-text-primary leading-tight">{userName}</span>
              <span className="text-xs text-primary-600 font-medium capitalize">{userRole.toLowerCase().replace('_', ' ')}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold shadow-sm shadow-primary-500/30 overflow-hidden">
              {userImage ? (
                <img src={userImage} alt={userName || "User"} className="w-full h-full object-cover" />
              ) : (
                <span>{userName?.[0] || "U"}</span>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 text-text-tertiary transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-glass-border shadow-xl overflow-hidden z-50 animate-fade-in-up">
              <div className="p-4 border-b border-glass-border bg-bg-secondary/50 sm:hidden">
                <p className="font-bold text-text-primary truncate">{userName}</p>
                <p className="text-xs text-primary-600 font-medium capitalize mt-1">{userRole.toLowerCase().replace('_', ' ')}</p>
              </div>
              <div className="p-2 space-y-1">
                <Link 
                  href={`${rolePrefix}/profile`}
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 text-text-secondary hover:text-primary-700 transition-colors font-medium text-sm group"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  My Profile
                </Link>
                <Link 
                  href={`${rolePrefix}/settings`}
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 text-text-secondary hover:text-primary-700 transition-colors font-medium text-sm group"
                >
                  <Settings className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Settings
                </Link>
                <div className="h-px bg-glass-border my-1"></div>
                <button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsSignOutModalOpen(true);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-danger-50 text-text-secondary hover:text-danger-600 transition-colors font-medium text-sm group"
                >
                  <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <SignOutModal 
        isOpen={isSignOutModalOpen} 
        onClose={() => setIsSignOutModalOpen(false)} 
      />
    </>
  );
}
