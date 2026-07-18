import Link from "next/link";
import { ArrowRight, BookOpen, Video, BrainCircuit, Globe, CheckCircle2, Users, Star, GraduationCap, Laptop, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center pt-24 pb-32">
        {/* Deep Animated Gradient Background */}
        <div className="absolute inset-0 bg-bg-primary -z-20"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,_var(--primary-100)_0%,_transparent_70%)] -z-10 blur-3xl opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,_var(--secondary-100)_0%,_transparent_70%)] -z-10 blur-3xl opacity-60 animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay -z-10 pointer-events-none"></div>
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
            
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 border border-white/80 shadow-sm text-primary-700 text-sm font-bold mb-10 animate-fade-in-up backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-primary-500" />
              The Next Generation of Learning is Here
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold text-text-primary leading-[1.1] tracking-tight mb-8 animate-fade-in-up delay-100">
              Limitless Education. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 relative inline-block">
                Powered by AI.
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-secondary-200/40 blur-sm rounded-full -z-10"></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl leading-relaxed mb-12 animate-fade-in-up delay-200 font-medium">
              Join thousands of students and tutors globally on the ultimate platform for personalized learning, interactive virtual classrooms, and verifiable progress.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300 w-full sm:w-auto">
              <Link href="/register/student" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-primary-600 text-white font-bold text-lg hover:bg-primary-500 shadow-xl shadow-primary-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/30 transition-all flex items-center justify-center group">
                Start Learning Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/courses" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-text-primary border border-glass-border font-bold text-lg shadow-sm hover:bg-bg-secondary hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center">
                Explore Catalog
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="mt-20 pt-10 border-t border-glass-border grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl animate-fade-in-up delay-500">
              <div className="text-center space-y-1">
                <h4 className="text-4xl font-display font-bold text-text-primary">10k+</h4>
                <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">Active Students</p>
              </div>
              <div className="text-center space-y-1">
                <h4 className="text-4xl font-display font-bold text-text-primary">500+</h4>
                <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">Expert Tutors</p>
              </div>
              <div className="text-center space-y-1">
                <h4 className="text-4xl font-display font-bold text-text-primary">98%</h4>
                <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">Pass Rate</p>
              </div>
              <div className="text-center space-y-1">
                <h4 className="text-4xl font-display font-bold text-text-primary">4.9</h4>
                <div className="flex items-center justify-center text-warning-500">
                  <Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Features Grid */}
      <section className="py-32 bg-white relative">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">
              An ecosystem built for excellence
            </h2>
            <p className="text-xl text-text-secondary">
              We've engineered every feature to remove friction from the learning process and deliver measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="md:col-span-2 bg-bg-secondary p-10 rounded-[2.5rem] border border-glass-border group hover:border-primary-200 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-glass-border">
                <Video className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-3xl font-display font-bold text-text-primary mb-4">Live Virtual Classrooms</h3>
              <p className="text-lg text-text-secondary leading-relaxed max-w-lg mb-8">
                Join interactive HD video sessions with your tutors. Featuring integrated whiteboards, real-time quizzes, and secure chat environments that replicate the best parts of physical classrooms.
              </p>
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 bg-white rounded-lg text-sm font-bold text-text-primary shadow-sm border border-glass-border">HD Video</span>
                <span className="px-3 py-1 bg-white rounded-lg text-sm font-bold text-text-primary shadow-sm border border-glass-border">Screen Sharing</span>
                <span className="px-3 py-1 bg-white rounded-lg text-sm font-bold text-text-primary shadow-sm border border-glass-border">Recording</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-bg-secondary p-10 rounded-[2.5rem] border border-glass-border group hover:border-secondary-200 transition-colors relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-100 rounded-full blur-3xl opacity-50 -z-10 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-glass-border">
                <BrainCircuit className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-display font-bold text-text-primary mb-4">AI Assessment</h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                Our smart engine automatically grades quizzes, identifies weak points, and suggests targeted lessons to ensure mastery.
              </p>
              <div className="flex gap-2 text-secondary-600 font-bold items-center group-hover:translate-x-2 transition-transform cursor-pointer">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-bg-secondary p-10 rounded-[2.5rem] border border-glass-border group hover:border-accent-200 transition-colors relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-accent-100 rounded-full blur-3xl opacity-50 -z-10 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-glass-border">
                <Users className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-2xl font-display font-bold text-text-primary mb-4">Parent Portal</h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                Complete transparency for parents. Monitor attendance, review assignment scores, and handle tuition payments in one secure dashboard.
              </p>
              <div className="flex gap-2 text-accent-600 font-bold items-center group-hover:translate-x-2 transition-transform cursor-pointer">
                See it in action <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-2 bg-bg-secondary p-10 rounded-[2.5rem] border border-glass-border group hover:border-primary-200 transition-colors relative overflow-hidden flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-glass-border">
                  <Globe className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-3xl font-display font-bold text-text-primary mb-4">Globally Accredited Curriculum</h3>
                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                  From standard foundational subjects to specialized preparations for OCR, Cambridge IGCSE, WAEC, and A-Levels. Learn exactly what you need for global success.
                </p>
                <Link href="/courses" className="btn btn-primary bg-white text-text-primary border border-glass-border shadow-sm hover:bg-primary-50 hover:border-primary-200">
                  Browse 50+ Subjects
                </Link>
              </div>
              <div className="flex-1 w-full relative">
                <div className="w-full aspect-square rounded-full bg-gradient-to-tr from-primary-200 to-secondary-200 blur-3xl opacity-40 absolute inset-0"></div>
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div className="bg-white/80 backdrop-blur p-4 rounded-2xl shadow-sm border border-white">
                    <BookOpen className="w-6 h-6 text-primary-500 mb-2" />
                    <p className="font-bold text-sm">Mathematics</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur p-4 rounded-2xl shadow-sm border border-white translate-y-6">
                    <Laptop className="w-6 h-6 text-secondary-500 mb-2" />
                    <p className="font-bold text-sm">Computer Science</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur p-4 rounded-2xl shadow-sm border border-white">
                    <Globe className="w-6 h-6 text-accent-500 mb-2" />
                    <p className="font-bold text-sm">Languages</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur p-4 rounded-2xl shadow-sm border border-white translate-y-6">
                    <GraduationCap className="w-6 h-6 text-info-500 mb-2" />
                    <p className="font-bold text-sm">Exam Prep</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-32 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 bg-primary-900 -z-20"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay -z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--primary-600)_0%,_transparent_70%)] opacity-50 blur-3xl -z-10"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-8 backdrop-blur-md">
            Start Your Journey Today
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-tight">
            Education has never <br/> looked this good.
          </h2>
          <p className="text-xl md:text-2xl text-primary-100/90 mb-12 max-w-2xl mx-auto">
            Join the fastest growing digital academy in the world. Sign up in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/register/student" className="px-10 py-5 rounded-2xl bg-white text-primary-900 font-bold text-lg hover:bg-primary-50 hover:scale-105 transition-all shadow-2xl shadow-white/10 flex items-center justify-center">
              Create Student Account <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/register/tutor" className="px-10 py-5 rounded-2xl bg-primary-800 text-white border border-primary-600 font-bold text-lg hover:bg-primary-700 hover:border-primary-500 transition-all flex items-center justify-center">
              Apply as a Tutor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
