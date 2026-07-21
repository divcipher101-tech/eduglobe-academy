import Link from "next/link";
import { ArrowRight, GraduationCap, Globe, Zap } from "lucide-react";

export default function SecondaryPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-100 text-accent-600 text-sm font-bold mb-6">
            <GraduationCap className="w-4 h-4" /> Secondary & A-Levels
          </div>
          <h1 className="text-5xl font-display font-bold text-text-primary mb-6 leading-tight">
            Preparing for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-warning-500">
              University Success
            </span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Rigorous exam preparation for IGCSE, A-Levels, WAEC, NECO, and other international qualifications. We shape the leaders of tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { title: "Exam Mastery", desc: "Targeted strategies and past paper practices for major international examination bodies.", icon: Zap, color: "text-accent-500", bg: "bg-accent-50" },
            { title: "Advanced Subjects", desc: "In-depth explorations into specialized fields like Advanced Mathematics and Physics.", icon: GraduationCap, color: "text-primary-500", bg: "bg-primary-50" },
            { title: "University Prep", desc: "Mentorship and guidance for students aiming for top-tier global universities.", icon: Globe, color: "text-secondary-500", bg: "bg-secondary-50" }
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

        <div className="bg-accent-900 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Take the next step</h2>
            <p className="text-accent-100 mb-8 max-w-xl mx-auto">Secure your future with EduGlobe Academy&apos;s elite secondary programs.</p>
            <Link href="/register/student" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-accent-900 rounded-xl font-bold hover:bg-accent-50 transition-colors shadow-lg">
              Start Preparations <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
