"use client";

import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { getMessages, sendMessage } from "@/app/actions/chat";
import { Send, Loader2, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  body: string;
  createdAt: Date;
  senderId: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
  };
};

export function ChatWindow({
  conversationId,
  currentUserId,
  otherUserName,
  otherUserAvatar
}: {
  conversationId: string;
  currentUserId: string;
  otherUserName?: string;
  otherUserAvatar?: string | null;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Poll for messages every 3 seconds
  const { data: messages, mutate } = useSWR(
    conversationId ? `messages-${conversationId}` : null,
    () => getMessages(conversationId),
    { refreshInterval: 3000 }
  );

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;

    setIsSending(true);
    try {
      // Optimistic update
      const tempMessage: Message = {
        id: "temp-" + Date.now(),
        body: inputText,
        createdAt: new Date(),
        senderId: currentUserId,
        sender: { id: currentUserId, firstName: "Me", lastName: "" }
      };
      
      mutate([...(messages || []), tempMessage], false);
      setInputText("");

      // Actual send
      await sendMessage(conversationId, tempMessage.body);
      mutate(); // Re-fetch exact data
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  if (!conversationId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-bg-secondary text-text-tertiary">
        <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
        <p>Select a conversation to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="h-16 border-b border-glass-border px-6 flex items-center gap-3 bg-white/80 backdrop-blur-md absolute top-0 w-full z-10 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm border border-primary-200">
          {otherUserAvatar ? (
            <img src={otherUserAvatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            otherUserName ? otherUserName.substring(0, 2).toUpperCase() : <User className="w-5 h-5" />
          )}
        </div>
        <div>
          <h2 className="font-bold text-text-primary">{otherUserName || "Conversation"}</h2>
          <p className="text-xs text-text-secondary flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500" /> Active now
          </p>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 pt-24 pb-6 space-y-4 bg-bg-secondary/30"
      >
        {!messages ? (
          <div className="flex justify-center items-center h-full text-text-tertiary">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-text-tertiary mt-10">
            No messages yet. Say hi!
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.senderId === currentUserId;
            const showAvatar = !isMe && (idx === 0 || messages[idx - 1].senderId !== msg.senderId);

            return (
              <div key={msg.id} className={cn("flex gap-3 max-w-[80%]", isMe ? "ml-auto flex-row-reverse" : "")}>
                {!isMe && (
                  <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden bg-bg-secondary flex justify-center items-center mt-auto mb-1">
                    {showAvatar ? (
                      msg.sender.avatarUrl ? (
                        <img src={msg.sender.avatarUrl} alt="avatar" />
                      ) : (
                        <span className="text-xs font-bold text-text-secondary">{msg.sender.firstName[0]}</span>
                      )
                    ) : null}
                  </div>
                )}
                <div className={cn(
                  "p-3.5 rounded-2xl text-sm relative",
                  isMe 
                    ? "bg-primary-500 text-white rounded-br-sm shadow-md shadow-primary-500/20" 
                    : "bg-white border border-glass-border text-text-primary rounded-bl-sm shadow-sm"
                )}>
                  {msg.body}
                  <span className={cn(
                    "text-[10px] block mt-1",
                    isMe ? "text-primary-100 text-right" : "text-text-tertiary"
                  )}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-glass-border z-10">
        <form onSubmit={handleSend} className="flex items-center gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-bg-secondary border border-glass-border rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isSending}
            className="w-12 h-12 rounded-full bg-primary-500 text-white flex justify-center items-center disabled:opacity-50 hover:bg-primary-600 transition-colors shadow-md shadow-primary-500/20"
          >
            {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-1" />}
          </button>
        </form>
      </div>
    </div>
  );
}

// Needed for the empty state
import { MessageSquare } from "lucide-react";
