import { Globe, Users, Target, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-bg-primary min-h-screen pt-24 pb-32">
      {/* Hero Section */}
      <div className="container mb-24 animate-fade-in-up">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-600 font-medium text-sm">
            <Globe className="w-4 h-4 mr-2" />
            Global Education Reimagined
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary leading-tight">
            Education Without Borders. Empowered by AI.
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            EduGlobe Academy is pioneering the future of digital learning. We connect students, parents, and world-class tutors through an enterprise-grade platform that makes education accessible, measurable, and engaging anywhere in the world.
          </p>
        </div>
      </div>

      {/* Stats/Values Section */}
      <div className="container mb-32 animate-fade-in-up delay-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[2rem] border border-glass-border shadow-xl shadow-primary-900/5 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">Community First</h3>
            <p className="text-text-secondary leading-relaxed">
              We believe education is a collaborative effort. Our dedicated Parent Portal ensures families are always involved in the academic journey.
            </p>
          </div>
          <div className="bg-white p-10 rounded-[2rem] border border-glass-border shadow-xl shadow-primary-900/5 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-success-50 text-success-600 flex items-center justify-center mb-6">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">World-Class Curriculum</h3>
            <p className="text-text-secondary leading-relaxed">
              From IGCSE to A-Levels and beyond, our courses are designed by verified expert tutors to meet the highest international standards.
            </p>
          </div>
          <div className="bg-white p-10 rounded-[2rem] border border-glass-border shadow-xl shadow-primary-900/5 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-accent-50 text-accent-600 flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">Measurable Results</h3>
            <p className="text-text-secondary leading-relaxed">
              With integrated AI-driven quizzes, dynamic progress tracking, and instant automated grading, success is always quantifiable.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container animate-fade-in-up delay-200">
        <div className="bg-text-primary text-white rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 relative z-10">Ready to transform your learning?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of students globally who are advancing their education with EduGlobe Academy.
          </p>
          <Link href="/courses" className="btn bg-primary-500 hover:bg-primary-400 text-white border-none px-8 py-4 text-lg rounded-2xl relative z-10 shadow-xl shadow-primary-500/20">
            Explore Courses <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
