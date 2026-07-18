"use client";

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
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Role } from "@/lib/permissions";
import { signOut } from "next-auth/react";

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
        { title: "Users", href: "/admin/users", icon: Users },
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

  return (
    <aside className="w-[280px] h-screen sticky top-0 bg-white border-r border-glass-border flex-col hidden md:flex z-50">
      <div className="h-[72px] flex items-center px-6 border-b border-glass-border shrink-0">
        <Link href="/" className="font-display font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
          EduGlobe
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4 px-3">
          Menu
        </div>
        
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group",
                isActive 
                  ? "bg-primary-50 text-primary-700" 
                  : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
              )}
            >
              <link.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-primary-600" : "text-text-tertiary group-hover:text-primary-500"
              )} />
              {link.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-glass-border">
        <Link 
          href={`/${role.toLowerCase()}/settings`}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-all group"
        >
          <Settings className="w-5 h-5 text-text-tertiary group-hover:text-primary-500 transition-colors" />
          Settings
        </Link>
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-danger-600 hover:bg-danger-50 transition-all mt-1"
        >
          <LogOut className="w-5 h-5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
