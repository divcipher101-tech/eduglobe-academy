"use client";

import { useChat } from "ai/react";
import { Send, Bot, User, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function AIAssistantPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your EduGlobe AI Learning Assistant. I'm here to help you understand complex topics, prepare for exams, or review your lessons. What would you like to learn today?"
      }
    ]
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-bg-primary rounded-2xl border border-glass-border overflow-hidden animate-fade-in-up shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-glass-border bg-glass backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/student" className="p-2 -ml-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-accent-500 flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-text-primary">AI Learning Assistant</h2>
            <p className="text-xs text-primary-600 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span> Online
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-bg-secondary">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex items-start gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              message.role === 'user' 
                ? 'bg-secondary-100 text-secondary-600' 
                : 'bg-gradient-to-tr from-primary-500 to-accent-500 text-white'
            }`}>
              {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              message.role === 'user' 
                ? 'bg-secondary-600 text-white rounded-tr-sm' 
                : 'bg-white border border-glass-border shadow-sm text-text-primary rounded-tl-sm'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                {message.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-accent-500 text-white flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="max-w-[80%] rounded-2xl p-4 bg-white border border-glass-border shadow-sm rounded-tl-sm">
              <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-glass backdrop-blur-md border-t border-glass-border shrink-0">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question about your courses..."
            className="w-full pl-6 pr-14 py-4 rounded-xl border border-glass-border bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all shadow-sm text-text-primary"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
        <p className="text-center text-xs text-text-tertiary mt-3">
          AI Assistant can make mistakes. Consider verifying important information.
        </p>
      </div>
    </div>
  );
}
