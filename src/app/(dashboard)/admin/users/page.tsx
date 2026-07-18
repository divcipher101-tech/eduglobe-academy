import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Users, Mail, Clock, Shield } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default async function UserDirectory() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({
    include: {
      userRoles: {
        include: { role: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            System Directory
          </h1>
          <p className="text-text-secondary">
            View all registered accounts on the platform.
          </p>
        </div>
      </div>

      <div className="card p-0 overflow-hidden border border-glass-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-tertiary border-b border-glass-border">
                <th className="px-6 py-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                      <div>
                        <div className="font-bold text-text-primary">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-text-secondary flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.userRoles.map((ur) => (
                        <span 
                          key={ur.role.id}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold uppercase bg-secondary-50 text-secondary-700 border border-secondary-200"
                        >
                          <Shield className="w-3 h-3 mr-1" />
                          {ur.role.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      user.isActive 
                        ? 'bg-success-50 text-success-700 border border-success-200' 
                        : 'bg-danger-50 text-danger-700 border border-danger-200'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users.length === 0 && (
          <div className="p-8 text-center text-text-secondary">
            <Users className="w-12 h-12 mx-auto mb-3 text-text-tertiary" />
            <p>No accounts found in the system.</p>
          </div>
        )}
      </div>
    </div>
  );
}
