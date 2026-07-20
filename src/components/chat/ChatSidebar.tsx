"use client";

import { useState } from "react";
import { MessageSquare, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

type ConversationPreview = {
  id: string;
  title?: string | null;
  participants: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      avatarUrl?: string | null;
    };
  }[];
  messages: {
    body: string;
    createdAt: Date;
    isRead: boolean;
  }[];
  updatedAt: Date;
};

export function ChatSidebar({
  conversations,
  currentUserId,
  activeId,
  onSelect
}: {
  conversations: ConversationPreview[];
  currentUserId: string;
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter(c => {
    if (!search) return true;
    const otherUsers = c.participants.filter(p => p.user.id !== currentUserId);
    const names = otherUsers.map(p => `${p.user.firstName} ${p.user.lastName}`).join(" ");
    return names.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="w-80 border-r border-glass-border bg-white flex flex-col h-full">
      <div className="p-4 border-b border-glass-border">
        <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary-500" /> Messages
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input 
            type="text" 
            placeholder="Search conversations..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-bg-secondary border border-glass-border rounded-xl text-sm focus:ring-1 focus:ring-primary-500 outline-none"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.length === 0 ? (
          <div className="p-4 text-center text-text-tertiary text-sm">
            No conversations found.
          </div>
        ) : (
          filtered.map(convo => {
            const otherUser = convo.participants.find(p => p.user.id !== currentUserId)?.user;
            const latestMessage = convo.messages[0];
            const isUnread = latestMessage && !latestMessage.isRead && (convo.messages[0] as any)?.senderId !== currentUserId;

            return (
              <button
                key={convo.id}
                onClick={() => onSelect(convo.id)}
                className={cn(
                  "w-full text-left p-3 rounded-xl transition-all flex items-start gap-3",
                  activeId === convo.id ? "bg-primary-50 border border-primary-100" : "hover:bg-bg-secondary border border-transparent"
                )}
              >
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm shrink-0 border border-primary-200">
                  {otherUser?.avatarUrl ? (
                    <img src={otherUser.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    otherUser ? `${otherUser.firstName[0]}${otherUser.lastName[0]}` : <User className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <p className="font-bold text-text-primary text-sm truncate">
                      {convo.title || (otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : "Unknown")}
                    </p>
                    {latestMessage && (
                      <span className="text-[10px] text-text-tertiary shrink-0 ml-2">
                        {new Date(latestMessage.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className={cn(
                    "text-xs truncate",
                    isUnread ? "text-text-primary font-bold" : "text-text-secondary"
                  )}>
                    {latestMessage ? latestMessage.body : "No messages yet"}
                  </p>
                </div>
                {isUnread && (
                  <div className="w-2.5 h-2.5 rounded-full bg-danger-500 mt-1.5 shrink-0" />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
