import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getConversations } from "@/app/actions/chat";
import { ChatLayout } from "@/components/chat/ChatLayout";

export default async function TutorMessagesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const conversations = await getConversations();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-text-primary">Messages</h1>
        <p className="text-text-secondary mt-1">Communicate with your students and their parents.</p>
      </div>

      <ChatLayout 
        initialConversations={conversations} 
        currentUserId={session.user.id} 
      />
    </div>
  );
}
