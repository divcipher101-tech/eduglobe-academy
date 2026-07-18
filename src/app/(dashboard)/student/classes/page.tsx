"use client";

import { Video, Calendar, Clock, ArrowRight, PlayCircle, Users } from "lucide-react";
import Link from "next/link";

// Mock data for upcoming classes
const upcomingClasses = [
  {
    id: "cls-101",
    title: "Advanced Algebraic Functions",
    course: "IGCSE Mathematics",
    tutor: "Dr. Sarah Jenkins",
    date: "Today",
    time: "14:00 - 15:30",
    status: "LIVE_SOON", // or "LIVE"
    attendees: 24,
  },
  {
    id: "cls-102",
    title: "Introduction to Python Programming",
    course: "Computer Science",
    tutor: "Mrs. Adeyinka",
    date: "Tomorrow",
    time: "10:00 - 11:30",
    status: "SCHEDULED",
    attendees: 18,
  },
  {
    id: "cls-103",
    title: "Essay Writing Workshop",
    course: "O-Level English",
    tutor: "Emma Thompson",
    date: "Thu, Oct 24",
    time: "16:00 - 17:00",
    status: "SCHEDULED",
    attendees: 30,
  }
];

export default function LiveClassesDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">Live Virtual Classes</h1>
          <p className="text-text-secondary">Join your scheduled interactive sessions with expert tutors.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>October 2026</span>
          </div>
        </div>
      </div>

      {/* Featured / Next Live Class */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-900 to-primary-800 p-8 sm:p-10 text-white shadow-xl shadow-primary-900/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-400 opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-danger-500/20 border border-danger-500/30 text-danger-100 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-danger-500 animate-pulse"></span>
              Starting in 15 mins
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Advanced Algebraic Functions</h2>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-primary-100 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary-400" />
                <span className="font-medium">14:00 - 15:30</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-secondary-400" />
                <span className="font-medium">IGCSE Mathematics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary-700 flex items-center justify-center text-xs font-bold border border-primary-600">
                  SJ
                </div>
                <span className="font-medium">Dr. Sarah Jenkins</span>
              </div>
            </div>
          </div>
          
          <div className="shrink-0">
            <Link 
              href="/student/classes/cls-101" 
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white text-primary-900 rounded-xl font-bold hover:scale-105 hover:bg-primary-50 transition-all shadow-lg"
            >
              <PlayCircle className="w-5 h-5 mr-2 text-primary-600" />
              Enter Virtual Classroom
            </Link>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div>
        <h3 className="text-xl font-bold text-text-primary mb-6">Upcoming Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingClasses.slice(1).map((cls) => (
            <div key={cls.id} className="bg-white rounded-2xl border border-glass-border p-6 hover:shadow-lg hover:border-primary-200 transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="px-3 py-1 bg-bg-tertiary text-text-secondary text-xs font-bold rounded-lg uppercase tracking-wide">
                  {cls.date}
                </div>
                <div className="flex items-center gap-1.5 text-text-tertiary text-sm font-medium">
                  <Users className="w-4 h-4" />
                  {cls.attendees}
                </div>
              </div>
              
              <h4 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                {cls.title}
              </h4>
              <p className="text-sm text-text-secondary font-medium mb-4">{cls.course}</p>
              
              <div className="mt-auto pt-6 border-t border-glass-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                    {cls.tutor.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-text-primary">{cls.tutor}</span>
                    <span className="text-[10px] text-text-tertiary">{cls.time}</span>
                  </div>
                </div>
                
                <Link 
                  href={`/student/classes/${cls.id}`}
                  className="w-8 h-8 rounded-full bg-bg-secondary text-text-secondary flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
