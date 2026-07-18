"use client";

import { useState } from "react";
import { 
  Mic, MicOff, Video as VideoIcon, VideoOff, 
  MonitorUp, Hand, PhoneOff, MessageSquare, 
  Users, Settings, Maximize, Smile, Send,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { use } from "react";

export default function VirtualClassroom({ params }: { params: Promise<{ classId: string }> }) {
  const resolvedParams = use(params);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "participants">("chat");
  const [chatMessage, setChatMessage] = useState("");

  const mockParticipants = [
    { id: 1, name: "Mrs Adeyinka", role: "Tutor", initials: "SJ", isSpeaking: true },
    { id: 2, name: "You", role: "Student", initials: "Me", isSpeaking: false },
    { id: 3, name: "Alex Chen", role: "Student", initials: "AC", isSpeaking: false },
    { id: 4, name: "Maria Garcia", role: "Student", initials: "MG", isSpeaking: false },
    { id: 5, name: "James Wilson", role: "Student", initials: "JW", isSpeaking: false },
  ];

  const mockMessages = [
    { id: 1, sender: "Mrs Adeyinka", time: "14:05", text: "Welcome everyone! We'll start in 2 minutes." },
    { id: 2, sender: "Alex Chen", time: "14:06", text: "Hello Dr. Jenkins!" },
    { id: 3, sender: "Maria Garcia", time: "14:06", text: "Hi, can you hear me?" },
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-4 animate-fade-in-up">
      
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col bg-gray-950 rounded-2xl overflow-hidden relative shadow-2xl border border-gray-800">
        
        {/* Top Header */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10">
          <div className="flex items-center gap-4">
            <Link href="/student/classes" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-danger-500 animate-pulse"></span>
              <span className="text-white font-medium text-sm">LIVE</span>
              <div className="w-px h-4 bg-white/20 mx-1"></div>
              <span className="text-gray-300 text-sm font-medium">Advanced Algebraic Functions</span>
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white text-sm font-medium">
            00:15:42
          </div>
        </div>

        {/* Video Feeds */}
        <div className="flex-1 p-4 pt-20 pb-24 flex flex-col justify-center items-center relative">
          {/* Main Speaker (Tutor) */}
          <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-2xl border-2 border-primary-500 overflow-hidden relative shadow-2xl">
            {/* Mock Video Placeholder */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-80 mix-blend-luminosity"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-sm font-medium flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center">
                  <Mic className="w-2.5 h-2.5 text-white" />
                </div>
                Mrs Adeyinka
              </div>
            </div>
          </div>

          {/* Participant Strip */}
          <div className="absolute bottom-24 w-full px-8 flex justify-center gap-4 overflow-x-auto">
            {mockParticipants.slice(1).map((p) => (
              <div key={p.id} className="w-32 aspect-video bg-gray-800 rounded-xl overflow-hidden relative border border-gray-700 shadow-lg shrink-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center font-bold">
                  {p.initials}
                </div>
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-white text-[10px] font-medium truncate max-w-[80%]">
                  {p.name}
                </div>
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-danger-500/20 flex items-center justify-center">
                  <MicOff className="w-2.5 h-2.5 text-danger-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={cn(
                "flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all",
                isMuted ? "bg-danger-500/20 text-danger-500 hover:bg-danger-500/30" : "bg-gray-800 text-white hover:bg-gray-700"
              )}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={cn(
                "flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all",
                isVideoOff ? "bg-danger-500/20 text-danger-500 hover:bg-danger-500/30" : "bg-gray-800 text-white hover:bg-gray-700"
              )}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-all tooltip" data-tip="Share Screen">
              <MonitorUp className="w-5 h-5" />
            </button>
            <button className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-all">
              <Hand className="w-5 h-5" />
            </button>
            <button className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-all lg:hidden" onClick={() => setActiveTab(activeTab === "chat" ? "participants" : "chat")}>
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/student/classes" className="px-6 py-2.5 bg-danger-600 hover:bg-danger-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-danger-600/20 flex items-center gap-2">
              <PhoneOff className="w-4 h-4" />
              Leave
            </Link>
          </div>
        </div>
      </div>

      {/* Right Sidebar (Chat & Participants) */}
      <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-glass-border flex flex-col overflow-hidden shadow-lg shrink-0">
        {/* Tabs */}
        <div className="flex border-b border-glass-border p-2 gap-2 bg-bg-secondary">
          <button 
            onClick={() => setActiveTab("chat")}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all",
              activeTab === "chat" ? "bg-white text-primary-600 shadow-sm" : "text-text-secondary hover:text-text-primary hover:bg-white/50"
            )}
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </button>
          <button 
            onClick={() => setActiveTab("participants")}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all",
              activeTab === "participants" ? "bg-white text-primary-600 shadow-sm" : "text-text-secondary hover:text-text-primary hover:bg-white/50"
            )}
          >
            <Users className="w-4 h-4" />
            People (24)
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-white relative">
          {activeTab === "chat" ? (
            <div className="space-y-4">
              {mockMessages.map((msg) => (
                <div key={msg.id} className="flex flex-col">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-text-primary">{msg.sender}</span>
                    <span className="text-[10px] text-text-tertiary">{msg.time}</span>
                  </div>
                  <div className="text-sm text-text-secondary bg-bg-secondary p-3 rounded-2xl rounded-tl-none border border-glass-border">
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative mb-6">
                <input 
                  type="text" 
                  placeholder="Search participants..." 
                  className="w-full pl-4 pr-4 py-2 bg-bg-secondary border border-transparent focus:border-primary-300 rounded-xl text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
              </div>
              {mockParticipants.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-2 hover:bg-bg-secondary rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                      p.role === "Tutor" ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-700"
                    )}>
                      {p.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-text-primary flex items-center gap-2">
                        {p.name} {p.name === "You" && <span className="text-[10px] bg-bg-tertiary px-1.5 py-0.5 rounded text-text-secondary">You</span>}
                      </span>
                      <span className="text-xs text-text-tertiary">{p.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.isSpeaking ? (
                      <Mic className="w-4 h-4 text-primary-500 animate-pulse" />
                    ) : (
                      <MicOff className="w-4 h-4 text-danger-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Input Area */}
        {activeTab === "chat" && (
          <div className="p-4 border-t border-glass-border bg-bg-secondary shrink-0">
            <div className="relative flex items-center">
              <button className="absolute left-3 text-text-tertiary hover:text-text-primary transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Send a message to everyone..."
                className="w-full pl-10 pr-12 py-3 bg-white border border-glass-border focus:border-primary-300 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-100 shadow-sm"
              />
              <button 
                className={cn(
                  "absolute right-2 w-8 h-8 flex items-center justify-center rounded-lg transition-all",
                  chatMessage.trim() ? "bg-primary-600 text-white" : "bg-bg-tertiary text-text-tertiary cursor-not-allowed"
                )}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
