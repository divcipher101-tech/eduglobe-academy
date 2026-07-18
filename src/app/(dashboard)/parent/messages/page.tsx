import { MessageSquare } from "lucide-react";

export default function ParentMessages() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Messages</h1>
          <p className="text-text-secondary mt-1">Communicate with your children's tutors</p>
        </div>
      </div>

      <div className="bg-white p-12 rounded-3xl border border-glass-border text-center shadow-sm">
        <div className="w-16 h-16 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-text-tertiary" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">No Messages Yet</h3>
        <p className="text-text-secondary max-w-md mx-auto">
          Your inbox is currently empty. Direct messaging with tutors and branch managers will appear here.
        </p>
      </div>
    </div>
  );
}
