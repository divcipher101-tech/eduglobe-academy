import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Award } from "lucide-react";

export default function PrimaryPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 border border-secondary-100 text-secondary-600 text-sm font-bold mb-6">
            <Compass className="w-4 h-4" /> Primary Education
          </div>
          <h1 className="text-5xl font-display font-bold text-text-primary mb-6 leading-tight">
            Building a Strong <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 to-primary-500">
              Academic Foundation
            </span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Our Primary School curriculum empowers students with essential skills in Mathematics, Sciences, and Literacy, preparing them for future success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { title: "Core Subjects", desc: "Comprehensive lessons in Math, English, and Science tailored to young learners.", icon: BookOpen, color: "text-primary-500", bg: "bg-primary-50" },
            { title: "Interactive Quizzes", desc: "Gamified assessments to ensure concepts are thoroughly understood and retained.", icon: Award, color: "text-accent-500", bg: "bg-accent-50" },
            { title: "Global Curriculum", desc: "Aligned with top international standards to give your child a global edge.", icon: Compass, color: "text-secondary-500", bg: "bg-secondary-50" }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white border border-glass-border shadow-sm hover:shadow-xl transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-secondary-900 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Empower their learning journey</h2>
            <p className="text-secondary-100 mb-8 max-w-xl mx-auto">Explore our world-class primary courses and give your child the academic support they deserve.</p>
            <Link href="/register/student" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-secondary-900 rounded-xl font-bold hover:bg-secondary-50 transition-colors shadow-lg">
              Explore Courses <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
