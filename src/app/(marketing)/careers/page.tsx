import Link from "next/link";
import { ArrowRight, Briefcase, Users, Heart, Sparkles } from "lucide-react";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-sm font-bold mb-6">
            <Briefcase className="w-4 h-4" /> We are hiring!
          </div>
          <h1 className="text-5xl font-display font-bold text-text-primary mb-6 leading-tight">
            Shape the Future of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
              Global Education
            </span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Join our diverse team of innovators, educators, and engineers. We're on a mission to make world-class education accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { title: "Impact-Driven", desc: "Every line of code and every lesson taught impacts thousands of students globally.", icon: Heart, color: "text-danger-500", bg: "bg-danger-50" },
            { title: "Remote-First", desc: "Work from anywhere. We value flexibility, autonomy, and work-life balance.", icon: Globe, color: "text-secondary-500", bg: "bg-secondary-50" },
            { title: "Growth Mindset", desc: "Continuous learning is in our DNA. We invest heavily in our team's development.", icon: Sparkles, color: "text-primary-500", bg: "bg-primary-50" }
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

        <div className="bg-white border border-glass-border rounded-3xl p-8 mb-16 shadow-sm text-center">
          <Users className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-text-primary mb-4">Open Positions</h3>
          <p className="text-text-secondary mb-8">We currently don't have any open non-tutor roles, but we're always looking for great talent. Send your CV to careers@eduglobe.academy.</p>
        </div>

      </div>
    </div>
  );
}

// Ensure Globe is imported
import { Globe } from "lucide-react";
