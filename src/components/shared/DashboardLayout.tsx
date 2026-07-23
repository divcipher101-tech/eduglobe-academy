/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role } from "@/lib/permissions";
import Sidebar from "./Sidebar";
import { Bell, Search, Menu } from "lucide-react";
import Link from "next/link";
import { HeaderActions } from "./HeaderActions";

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
          
          <HeaderActions 
            userName={session.user.name || "User"} 
            userImage={session.user.image} 
            userRole={activeRole} 
          />
        </header>
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
