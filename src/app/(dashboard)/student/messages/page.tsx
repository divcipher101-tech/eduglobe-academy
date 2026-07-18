"use client";

import { useState } from "react";
import { Search, MoreVertical, Paperclip, Send, Smile, Phone, Video, Info, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mock Data ---
type Message = {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
};

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  type: "direct" | "group";
  online?: boolean;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
};

const CURRENT_USER_ID = "u1";

const mockConversations: Conversation[] = [
  {
    id: "c1",
    name: "Mrs Adeyinka",
    avatar: "S",
    type: "direct",
    online: true,
    unreadCount: 2,
    lastMessage: "Don't forget to review chapter 4 before our session tomorrow!",
    lastMessageTime: "10:42 AM",
    messages: [
      { id: "m1", text: "Hello Dr. Jenkins! I had a question about the recent physics assignment.", senderId: CURRENT_USER_ID, timestamp: "Yesterday", status: "read" },
      { id: "m2", text: "Hi there! Of course, what part are you struggling with?", senderId: "u2", timestamp: "Yesterday", status: "read" },
      { id: "m3", text: "Question 3 regarding the conservation of momentum. The formula isn't giving me the expected result.", senderId: CURRENT_USER_ID, timestamp: "Yesterday", status: "read" },
      { id: "m4", text: "Ah, make sure you are accounting for the inelastic collision. Kinetic energy isn't conserved there.", senderId: "u2", timestamp: "09:15 AM", status: "read" },
      { id: "m5", text: "That makes so much sense. Thank you!", senderId: CURRENT_USER_ID, timestamp: "09:30 AM", status: "read" },
      { id: "m6", text: "You're welcome! Don't forget to review chapter 4 before our session tomorrow!", senderId: "u2", timestamp: "10:42 AM", status: "delivered" },
    ]
  },
  {
    id: "c2",
    name: "IGCSE Math 0606 Group",
    avatar: "M",
    type: "group",
    unreadCount: 0,
    lastMessage: "Alex: Has anyone finished the past paper yet?",
    lastMessageTime: "Yesterday",
    messages: [
      { id: "m7", text: "Welcome to the IGCSE Math Study Group!", senderId: "system", timestamp: "Monday", status: "read" },
      { id: "m8", text: "Has anyone finished the past paper yet?", senderId: "u3", timestamp: "Yesterday", status: "read" }
    ]
  },
  {
    id: "c3",
    name: "System Announcements",
    avatar: "A",
    type: "direct",
    unreadCount: 0,
    lastMessage: "Your receipt for $45.00 is available.",
    lastMessageTime: "Tuesday",
    messages: [
      { id: "m9", text: "Welcome to EduGlobe Academy! We are thrilled to have you here.", senderId: "system", timestamp: "Last Week", status: "read" },
      { id: "m10", text: "Your receipt for $45.00 is available. View it in your Billing Dashboard.", senderId: "system", timestamp: "Tuesday", status: "read" }
    ]
  }
];

export default function MessagesDashboard() {
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [activeId, setActiveId] = useState<string>("c1");
  const [inputMessage, setInputMessage] = useState("");

  const activeConversation = conversations.find(c => c.id === activeId);

  return (
    <div className="h-[calc(100vh-theme(spacing.24))] max-h-[800px] flex rounded-3xl overflow-hidden border border-glass-border bg-white shadow-sm animate-fade-in-up">
      
      {/* Sidebar (Left Pane) */}
      <div className="w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-glass-border bg-bg-secondary/30 flex flex-col">
        <div className="p-4 border-b border-glass-border bg-white">
          <h2 className="text-xl font-bold text-text-primary mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full pl-9 pr-4 py-2.5 bg-bg-secondary border border-glass-border rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveId(conv.id)}
              className={cn(
                "w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all",
                activeId === conv.id ? "bg-primary-50 border border-primary-100" : "hover:bg-bg-secondary border border-transparent"
              )}
            >
              <div className="relative shrink-0">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-sm",
                  conv.type === "group" ? "bg-secondary-500" : conv.id === "c3" ? "bg-info-500" : "bg-primary-600"
                )}>
                  {conv.avatar}
                </div>
                {conv.online && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={cn(
                    "font-bold truncate",
                    activeId === conv.id ? "text-primary-900" : "text-text-primary"
                  )}>
                    {conv.name}
                  </h3>
                  <span className={cn(
                    "text-xs shrink-0 ml-2",
                    conv.unreadCount > 0 ? "text-primary-600 font-bold" : "text-text-tertiary font-medium"
                  )}>
                    {conv.lastMessageTime}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className={cn(
                    "text-sm truncate",
                    conv.unreadCount > 0 ? "text-text-primary font-medium" : "text-text-secondary"
                  )}>
                    {conv.lastMessage}
                  </p>
                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-sm shadow-primary-600/30">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area (Right Pane) */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col bg-bg-secondary/10 relative">
          {/* Chat Background Pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

          {/* Chat Header */}
          <div className="h-16 border-b border-glass-border bg-white/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 relative z-10 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm",
                  activeConversation.type === "group" ? "bg-secondary-500" : activeConversation.id === "c3" ? "bg-info-500" : "bg-primary-600"
                )}>
                  {activeConversation.avatar}
                </div>
                {activeConversation.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div>
                <h2 className="font-bold text-text-primary leading-tight">{activeConversation.name}</h2>
                <p className="text-xs text-text-tertiary font-medium">
                  {activeConversation.type === "group" ? "3 members" : activeConversation.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-text-tertiary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors hidden sm:block">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-text-tertiary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors hidden sm:block">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 scroll-smooth">
            {activeConversation.messages.map((msg, idx) => {
              const isMe = msg.senderId === CURRENT_USER_ID;
              const isSystem = msg.senderId === "system";
              const showTimestamp = idx === 0 || activeConversation.messages[idx - 1].timestamp !== msg.timestamp;

              if (isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center my-4">
                    <div className="px-4 py-1.5 bg-bg-tertiary text-text-secondary text-xs font-medium rounded-full border border-glass-border shadow-sm">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className="space-y-1.5">
                  {showTimestamp && (
                    <div className="flex justify-center my-6">
                      <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider bg-white/50 px-2 py-0.5 rounded-full">
                        {msg.timestamp}
                      </span>
                    </div>
                  )}
                  
                  <div className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                    {!isMe && (
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white mr-2 shrink-0 self-end shadow-sm",
                        activeConversation.type === "group" ? "bg-secondary-500" : "bg-primary-600"
                      )}>
                        {activeConversation.avatar}
                      </div>
                    )}
                    
                    <div className={cn(
                      "max-w-[75%] px-5 py-3 shadow-sm relative group",
                      isMe 
                        ? "bg-primary-600 text-white rounded-2xl rounded-br-sm" 
                        : "bg-white border border-glass-border text-text-primary rounded-2xl rounded-bl-sm"
                    )}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      
                      <div className={cn(
                        "flex items-center gap-1 mt-1 text-[10px]",
                        isMe ? "text-primary-100 justify-end" : "text-text-tertiary"
                      )}>
                        {/* We use the same timestamp for mocking, normally this would be parsed time */}
                        <span>10:00 AM</span>
                        {isMe && (
                          <span className="ml-1">
                            {msg.status === "read" ? <CheckCheck className="w-3.5 h-3.5 text-info-300" /> : <Check className="w-3.5 h-3.5 text-primary-200" />}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-glass-border shrink-0 relative z-10">
            <div className="flex items-end gap-2 bg-bg-secondary p-2 rounded-2xl border border-glass-border focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100 transition-all shadow-sm">
              <button className="p-2 text-text-tertiary hover:text-text-primary transition-colors shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>
              
              <textarea 
                rows={1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-transparent resize-none outline-none py-2 text-sm text-text-primary placeholder:text-text-tertiary max-h-32"
              />
              
              <div className="flex items-center gap-1 shrink-0 pb-1">
                <button className="p-2 text-text-tertiary hover:text-text-primary transition-colors hidden sm:block">
                  <Smile className="w-5 h-5" />
                </button>
                <button 
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm",
                    inputMessage.trim().length > 0 
                      ? "bg-primary-600 text-white hover:bg-primary-700 shadow-primary-600/30" 
                      : "bg-bg-tertiary text-text-tertiary cursor-not-allowed"
                  )}
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-bg-secondary/10">
          <div className="w-20 h-20 bg-bg-tertiary rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-text-tertiary" />
          </div>
          <p className="text-text-secondary font-medium">Select a conversation to start messaging</p>
        </div>
      )}
      
    </div>
  );
}
