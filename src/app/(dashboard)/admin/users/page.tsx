import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Search, Shield, ShieldAlert, CheckCircle2, Mail } from "lucide-react";
import { deleteUserAction } from "@/app/actions/user";
import { DeleteUserButton } from "./DeleteUserButton";

export default async function AdminUsersPage() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Fetch real active users from DB
  const dbUsers = await prisma.user.findMany({
    where: { isActive: true },
    include: {
      userRoles: {
        include: {
          role: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">User Management</h1>
          <p className="text-text-secondary mt-1">Manage students, tutors, parents, and administrators.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary shadow-sm">
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-glass-border shadow-sm flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-glass-border flex flex-col sm:flex-row gap-4 justify-between bg-bg-secondary/30 rounded-t-2xl">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-glass-border bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-secondary/50 border-b border-glass-border">
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">User</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Role</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Joined</th>
                <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {dbUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-text-secondary">No users found.</td>
                </tr>
              ) : (
                dbUsers.map((user) => {
                  const roleName = user.userRoles[0]?.role?.name || "STUDENT";
                  const joinedDate = new Date(user.createdAt).toLocaleDateString();
                  
                  return (
                    <tr key={user.id} className="hover:bg-bg-secondary/30 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm shrink-0 border border-primary-200">
                            {user.firstName[0]}{user.lastName[0]}
                          </div>
                          <div>
                            <p className="font-bold text-text-primary group-hover:text-primary-600 transition-colors">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-text-secondary flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
                          roleName === 'ADMIN' ? 'bg-danger-50 text-danger-600' :
                          roleName === 'TUTOR' ? 'bg-primary-50 text-primary-600' :
                          roleName === 'PARENT' ? 'bg-warning-50 text-warning-600' :
                          'bg-success-50 text-success-600'
                        }`}>
                          {roleName === 'ADMIN' && <ShieldAlert className="w-3 h-3" />}
                          {roleName === 'TUTOR' && <Shield className="w-3 h-3" />}
                          {roleName}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-success-50 text-success-600 border border-success-200`}>
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      </td>
                      <td className="p-4 text-sm text-text-secondary font-medium">
                        {joinedDate}
                      </td>
                      <td className="p-4 text-right">
                        {roleName !== 'ADMIN' && (
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <form action={deleteUserAction}>
                              <input type="hidden" name="userId" value={user.id} />
                              <DeleteUserButton />
                            </form>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
