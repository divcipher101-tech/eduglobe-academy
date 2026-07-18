import Link from "next/link";
import { User, BookOpen, Users } from "lucide-react";

export default function RegisterRoleSelection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-2 text-center">Create an account</h2>
      <p className="text-text-secondary text-sm text-center mb-6">Choose how you want to use EduGlobe</p>
      
      <div className="space-y-4">
        <Link 
          href="/register/student" 
          className="flex items-start gap-4 p-4 border border-border-primary rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-colors">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary group-hover:text-primary-700">I am a Student</h3>
            <p className="text-sm text-text-secondary">Join courses, take quizzes, and track your progress.</p>
          </div>
        </Link>

        <Link 
          href="/register/parent" 
          className="flex items-start gap-4 p-4 border border-border-primary rounded-xl hover:border-secondary-400 hover:bg-secondary-50 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center shrink-0 group-hover:bg-secondary-500 group-hover:text-white transition-colors">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary group-hover:text-secondary-700">I am a Parent</h3>
            <p className="text-sm text-text-secondary">Monitor your child's progress and manage payments.</p>
          </div>
        </Link>

        <Link 
          href="/register/tutor" 
          className="flex items-start gap-4 p-4 border border-border-primary rounded-xl hover:border-accent-400 hover:bg-accent-50 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center shrink-0 group-hover:bg-accent-500 group-hover:text-white transition-colors">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary group-hover:text-accent-700">I am a Tutor</h3>
            <p className="text-sm text-text-secondary">Host classes, manage assignments, and earn money.</p>
          </div>
        </Link>
      </div>

      <div className="mt-6 text-center text-sm text-text-secondary border-t border-border-primary pt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
          Sign in
        </Link>
      </div>
    </div>
  );
}
