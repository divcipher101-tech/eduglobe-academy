import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="fixed top-0 w-full h-[var(--topbar-height)] z-50 bg-white/80 backdrop-blur-md border-b border-glass-border shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
            EduGlobe Academy
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/courses" className="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors">
              Courses
            </Link>
            <Link href="/about" className="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm shadow-primary-500/20">
                Dashboard
              </Link>
              <Link href="/api/auth/signout" className="px-4 py-2 rounded-lg text-text-secondary text-sm font-medium hover:bg-bg-tertiary transition-colors">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 rounded-lg text-text-secondary text-sm font-medium hover:bg-bg-tertiary transition-colors hidden sm:block">
                Log in
              </Link>
              <Link href="/register/student" className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm shadow-primary-500/20">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
