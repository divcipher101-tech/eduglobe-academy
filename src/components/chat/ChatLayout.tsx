"use client";

import { useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatWindow } from "./ChatWindow";

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

export function ChatLayout({ 
  initialConversations, 
  currentUserId 
}: { 
  initialConversations: ConversationPreview[],
  currentUserId: string
}) {
  // Use the first conversation as the active one, or null
  const [activeId, setActiveId] = useState<string | null>(
    initialConversations.length > 0 ? initialConversations[0].id : null
  );

  const activeConvo = initialConversations.find(c => c.id === activeId);
  const otherUser = activeConvo?.participants.find(p => p.user.id !== currentUserId)?.user;

  return (
    <div className="bg-white rounded-2xl border border-glass-border shadow-sm overflow-hidden h-[calc(100vh-140px)] min-h-[500px] flex animate-fade-in-up">
      <ChatSidebar 
        conversations={initialConversations} 
        currentUserId={currentUserId}
        activeId={activeId}
        onSelect={setActiveId}
      />
      <ChatWindow 
        conversationId={activeId || ""} 
        currentUserId={currentUserId}
        otherUserName={activeConvo?.title || (otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : undefined)}
        otherUserAvatar={otherUser?.avatarUrl}
      />
    </div>
  );
}
