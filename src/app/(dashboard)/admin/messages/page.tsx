import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getConversations } from "@/app/actions/chat";
import { ChatLayout } from "@/components/chat/ChatLayout";

export default async function AdminMessagesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const conversations = await getConversations();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-text-primary">Support Center</h1>
        <p className="text-text-secondary mt-1">Manage all support inquiries and internal communications.</p>
      </div>

      <ChatLayout 
        initialConversations={conversations} 
        currentUserId={session.user.id} 
      />
    </div>
  );
}
