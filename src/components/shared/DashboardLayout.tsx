/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role } from "@/lib/permissions";
import Sidebar from "./Sidebar";
import { Bell, Search, Menu } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: Role[];
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Use the single role from the session
  const activeRole = session.user.role as Role;

  if (!activeRole) {
    redirect("/login");
  }

  if (allowedRoles && !allowedRoles.includes(activeRole)) {
    redirect(`/${activeRole.toLowerCase()}`);
  }

  return (
    <div className="flex min-h-screen bg-bg-secondary">
      <Sidebar role={activeRole} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[72px] bg-white border-b border-glass-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 backdrop-blur-md bg-white/80">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-tertiary">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex relative max-w-md w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-9 pr-4 py-2 bg-bg-tertiary border border-transparent focus:border-primary-300 rounded-lg text-sm w-full transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="p-2 text-text-secondary hover:text-primary-600 rounded-full hover:bg-primary-50 relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-glass-border mx-1 hidden sm:block"></div>
            
            <Link href={`/${activeRole.toLowerCase()}/settings`} className="flex items-center gap-3 hover:bg-bg-tertiary p-1.5 pr-3 rounded-full transition-colors">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold text-text-primary leading-tight">{session.user.name}</span>
                <span className="text-xs text-primary-600 font-medium capitalize">{activeRole.toLowerCase().replace('_', ' ')}</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold shadow-sm shadow-primary-500/30">
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span>{session.user.name?.[0] || "U"}</span>
                )}
              </div>
            </Link>
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
