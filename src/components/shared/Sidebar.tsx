"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  FileText, 
  HelpCircle, 
  CreditCard, 
  MessageSquare, 
  Settings,
  Users,
  Building,
  BarChart,
  BrainCircuit,
  LogOut,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Role } from "@/lib/permissions";
import { SignOutModal } from "./SignOutModal";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const getRoleLinks = (role: Role): NavItem[] => {
  switch (role) {
    case "STUDENT":
      return [
        { title: "Dashboard", href: "/student", icon: LayoutDashboard },
        { title: "My Courses", href: "/student/courses", icon: BookOpen },
        { title: "Live Classes", href: "/student/classes", icon: Video },
        { title: "Assignments", href: "/student/assignments", icon: FileText },
        { title: "Quizzes", href: "/student/quizzes", icon: HelpCircle },
        { title: "AI Assistant", href: "/student/ai-assistant", icon: BrainCircuit },
        { title: "Payments", href: "/student/payments", icon: CreditCard },
        { title: "Messages", href: "/student/messages", icon: MessageSquare },
      ];
    case "TUTOR":
      return [
        { title: "Dashboard", href: "/tutor", icon: LayoutDashboard },
        { title: "My Courses", href: "/tutor/courses", icon: BookOpen },
        { title: "Classes", href: "/tutor/classes", icon: Video },
        { title: "Students", href: "/tutor/students", icon: Users },
        { title: "Assignments", href: "/tutor/assignments", icon: FileText },
        { title: "Earnings", href: "/tutor/earnings", icon: CreditCard },
        { title: "Messages", href: "/tutor/messages", icon: MessageSquare },
      ];
    case "ADMIN":
      return [
        { title: "Overview", href: "/admin", icon: LayoutDashboard },
        { title: "Directory", href: "/admin/users", icon: Users },
        { title: "Courses", href: "/admin/courses", icon: BookOpen },
        { title: "Finances", href: "/admin/finances", icon: CreditCard },
        { title: "Branches", href: "/admin/branches", icon: Building },
        { title: "Analytics", href: "/admin/analytics", icon: BarChart },
        { title: "Messages", href: "/admin/messages", icon: MessageSquare },
      ];
    case "PARENT":
      return [
        { title: "Overview", href: "/parent", icon: LayoutDashboard },
        { title: "Children", href: "/parent/children", icon: Users },
        { title: "Payments", href: "/parent/payments", icon: CreditCard },
        { title: "Messages", href: "/parent/messages", icon: MessageSquare },
      ];
    case "BRANCH_MANAGER":
      return [
        { title: "Overview", href: "/manager", icon: LayoutDashboard },
        { title: "Users", href: "/manager/users", icon: Users },
        { title: "Courses", href: "/manager/courses", icon: BookOpen },
        { title: "Finances", href: "/manager/finances", icon: CreditCard },
        { title: "Messages", href: "/manager/messages", icon: MessageSquare },
      ];
    default:
      return [];
  }
};

export default function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const links = getRoleLinks(role);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  return (
    <>
      <aside className="w-[280px] h-screen sticky top-0 bg-white/80 backdrop-blur-xl border-r border-glass-border flex-col hidden md:flex z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        {/* Brand Header */}
        <div className="h-[80px] flex items-center px-8 border-b border-glass-border/50 shrink-0 bg-white/50">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-md shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-all">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-text-primary">
              EduGlobe<span className="text-primary-600">.</span>
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-8 px-5 space-y-1.5 custom-scrollbar">
          <div className="text-[11px] font-black text-text-tertiary uppercase tracking-[0.2em] mb-4 px-3">
            Main Menu
          </div>
          
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-bold transition-all group relative overflow-hidden",
                  isActive 
                    ? "text-primary-700 bg-primary-50 shadow-sm border border-primary-100" 
                    : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary border border-transparent"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full"></div>
                )}
                
                <div className="flex items-center gap-3">
                  <link.icon className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    isActive ? "text-primary-600 scale-110" : "text-text-tertiary group-hover:text-primary-500 group-hover:scale-110"
                  )} />
                  <span className="relative top-[1px]">{link.title}</span>
                </div>
                
                {!isActive && (
                  <ChevronRight className="w-4 h-4 text-text-tertiary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Settings */}
        <div className="p-5 border-t border-glass-border/50 bg-bg-secondary/30">
          <Link 
            href={`/${role.toLowerCase()}/settings`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-text-secondary hover:bg-white hover:shadow-sm border border-transparent hover:border-glass-border transition-all group"
          >
            <Settings className="w-5 h-5 text-text-tertiary group-hover:text-text-primary group-hover:rotate-90 transition-all duration-500" />
            Settings
          </Link>
          <button 
            onClick={() => setIsSignOutModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-danger-600 hover:bg-danger-50 border border-transparent transition-all mt-2 group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Sign out
          </button>
        </div>
      </aside>

      <SignOutModal 
        isOpen={isSignOutModalOpen} 
        onClose={() => setIsSignOutModalOpen(false)} 
      />
    </>
  );
}
