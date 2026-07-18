import Link from "next/link";
import { ArrowRight, BookOpen, Video, BrainCircuit, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 flex flex-col items-center text-center px-4">
        {/* Background Mesh Gradient Simulation */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--primary-50)_0%,_var(--bg-primary)_70%)] -z-10 blur-3xl"></div>
        <div className="absolute top-[20%] left-[60%] w-96 h-96 bg-[radial-gradient(circle,_var(--secondary-50)_0%,_transparent_70%)] -z-10 blur-3xl opacity-50"></div>
        
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            AI-Powered Global Learning Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary leading-tight mb-6 animate-fade-in-up delay-100">
            Education Without Borders. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
              Empowered by AI.
            </span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-2xl leading-relaxed mb-10 animate-fade-in-up delay-200">
            From Preschool to Undergraduate. Join thousands of students worldwide 
            learning with expert tutors, interactive virtual classrooms, and personalized AI paths.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up delay-300 w-full sm:w-auto">
            <Link href="/register/student" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center">
              Start Learning Now <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/courses" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-text-primary border border-glass-border font-semibold hover:bg-bg-secondary hover:border-primary-200 transition-all flex items-center justify-center">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-bg-secondary border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-text-secondary">
              Our platform provides a comprehensive suite of tools designed to maximize learning outcomes 
              for students and streamline teaching for tutors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 border border-glass-border hover:border-primary-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <Video className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Live Virtual Classes</h3>
              <p className="text-text-secondary leading-relaxed">
                Interactive video classrooms with whiteboards, screen sharing, and automatic attendance tracking.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 border border-glass-border hover:border-secondary-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-secondary-50 text-secondary-600 flex items-center justify-center mb-6 group-hover:bg-secondary-500 group-hover:text-white transition-colors">
                <BrainCircuit className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">AI Study Assistant</h3>
              <p className="text-text-secondary leading-relaxed">
                Personalized learning paths, instant answers to questions, and AI-generated quiz recommendations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 border border-glass-border hover:border-accent-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center mb-6 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Global Curriculum</h3>
              <p className="text-text-secondary leading-relaxed">
                Comprehensive preparation for international exams including OCR, CIE, IGCSE, GCSE, WAEC, and NECO.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-8 border border-glass-border hover:border-info-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-info-50 text-info-600 flex items-center justify-center mb-6 group-hover:bg-info-500 group-hover:text-white transition-colors">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Rich Course Content</h3>
              <p className="text-text-secondary leading-relaxed">
                Access a vast library of recorded lectures, assignments, quizzes, and downloadable resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-800 -z-20"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay -z-10"></div>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to transform your educational journey?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Join EduGlobe Academy today. Whether you're a student looking to excel, a parent tracking progress, or a tutor ready to share knowledge globally.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register/student" className="px-8 py-4 rounded-xl bg-white text-primary-900 font-bold hover:bg-primary-50 hover:scale-105 transition-all">
              Join as a Student
            </Link>
            <Link href="/register/tutor" className="px-8 py-4 rounded-xl bg-primary-800 text-white border border-primary-700 font-bold hover:bg-primary-700 hover:scale-105 transition-all">
              Become a Tutor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
