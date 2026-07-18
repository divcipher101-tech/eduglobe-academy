"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useChat } from "ai/react";
import { ArrowLeft, PlayCircle, FileText, CheckCircle2, MessageSquare, Send, Bot, User, Sparkles, Loader2, Maximize2, FileDown } from "lucide-react";

export default function LessonViewerPage({ 
  params 
}: { 
  params: Promise<{ courseId: string; lessonId: string }> 
}) {
  const unwrappedParams = use(params);
  const [showAi, setShowAi] = useState(false);

  // Mock lesson data
  const lesson = {
    id: unwrappedParams.lessonId,
    title: "Inverse Functions",
    moduleTitle: "Module 1: Functions",
    description: "In this lesson, we will explore how to find the inverse of a function, the conditions required for a function to have an inverse (one-to-one mapping), and how to graphically represent inverse functions by reflecting across the line y = x.",
    duration: "18:45",
    type: "video",
    resources: [
      { name: "Lesson Notes (PDF)", size: "2.4 MB" },
      { name: "Practice Worksheet", size: "1.1 MB" },
    ],
  };

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: `Hi! I'm your AI Assistant. I notice you're studying "${lesson.title}". Do you need any help understanding this topic?`
      }
    ]
  });

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6 animate-fade-in-up">
      
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-0 overflow-y-auto pr-2 ${showAi ? 'hidden lg:flex' : 'flex'}`}>
        {/* Navigation */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <Link 
            href={`/student/courses/${unwrappedParams.courseId}`}
            className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Syllabus
          </Link>
          
          <button 
            onClick={() => setShowAi(!showAi)}
            className="lg:hidden btn btn-secondary btn-sm flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Ask AI
          </button>
        </div>

        {/* Video Player Placeholder */}
        <div className="w-full aspect-video bg-black rounded-2xl relative flex items-center justify-center group shadow-lg shrink-0 mb-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl pointer-events-none"></div>
          
          <button className="w-16 h-16 rounded-full bg-primary-600/90 text-white flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all z-10 shadow-lg shadow-primary-500/30">
            <PlayCircle className="w-8 h-8 ml-1" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4">
              <PlayCircle className="w-6 h-6 cursor-pointer hover:text-primary-400" />
              <div className="text-sm font-medium">00:00 / {lesson.duration}</div>
            </div>
            <Maximize2 className="w-5 h-5 cursor-pointer hover:text-primary-400" />
          </div>
        </div>

        {/* Lesson Details */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-glass-border shadow-sm flex-1">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="text-sm font-medium text-primary-600 mb-1">{lesson.moduleTitle}</div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary">{lesson.title}</h1>
            </div>
            <button className="btn btn-secondary flex items-center gap-2 shrink-0">
              <CheckCircle2 className="w-4 h-4" /> Mark Complete
            </button>
          </div>

          <p className="text-text-secondary leading-relaxed mb-8">
            {lesson.description}
          </p>

          <h3 className="font-bold text-lg text-text-primary mb-4 border-b border-glass-border pb-2">Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lesson.resources.map((res, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-glass-border hover:border-primary-300 hover:bg-primary-50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                    <FileDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-text-primary group-hover:text-primary-700">{res.name}</h4>
                    <span className="text-xs text-text-tertiary">{res.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant Sidebar */}
      <div className={`w-full lg:w-96 flex flex-col bg-bg-primary rounded-2xl border border-glass-border overflow-hidden shadow-sm shrink-0 ${!showAi ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-4 border-b border-glass-border bg-glass backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-accent-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-text-primary">Lesson AI Guide</h2>
          </div>
          <button 
            onClick={() => setShowAi(false)}
            className="lg:hidden p-2 text-text-tertiary hover:text-text-primary"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-secondary">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs ${
                message.role === 'user' ? 'bg-secondary-100 text-secondary-600' : 'bg-gradient-to-tr from-primary-500 to-accent-500 text-white'
              }`}>
                {message.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
              </div>
              
              <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                message.role === 'user' ? 'bg-secondary-600 text-white rounded-tr-sm' : 'bg-white border border-glass-border shadow-sm text-text-primary rounded-tl-sm'
              }`}>
                <div className="whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary-500 to-accent-500 text-white flex items-center justify-center shrink-0">
                <Bot className="w-3 h-3" />
              </div>
              <div className="max-w-[85%] rounded-2xl p-3 bg-white border border-glass-border shadow-sm rounded-tl-sm">
                <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />
              </div>
            </div>
          )}
        </div>

        <div className="p-3 bg-glass backdrop-blur-md border-t border-glass-border shrink-0">
          <form onSubmit={handleSubmit} className="relative">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a question..."
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-glass-border bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all shadow-sm text-sm"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-3 h-3 ml-0.5" />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
