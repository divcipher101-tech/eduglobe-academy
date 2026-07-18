import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bg-tertiary border-t border-border-primary pt-16 pb-8 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-display font-bold text-xl text-primary-600 mb-4 inline-block">
              EduGlobe Academy
            </Link>
            <p className="text-text-secondary text-sm mt-4">
              A modern, AI-powered global online learning platform providing educational services for students worldwide.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Learn</h3>
            <ul className="space-y-2">
              <li><Link href="/courses" className="text-text-secondary hover:text-primary-600 text-sm transition-colors">All Courses</Link></li>
              <li><Link href="/preschool" className="text-text-secondary hover:text-primary-600 text-sm transition-colors">Preschool</Link></li>
              <li><Link href="/primary" className="text-text-secondary hover:text-primary-600 text-sm transition-colors">Primary</Link></li>
              <li><Link href="/secondary" className="text-text-secondary hover:text-primary-600 text-sm transition-colors">Secondary & A-Level</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-text-secondary hover:text-primary-600 text-sm transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-text-secondary hover:text-primary-600 text-sm transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-text-secondary hover:text-primary-600 text-sm transition-colors">Contact</Link></li>
              <li><Link href="/tutors" className="text-text-secondary hover:text-primary-600 text-sm transition-colors">Become a Tutor</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-text-secondary hover:text-primary-600 text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-text-secondary hover:text-primary-600 text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-text-secondary hover:text-primary-600 text-sm transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border-primary pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-tertiary text-sm">
            &copy; {new Date().getFullYear()} EduGlobe Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
