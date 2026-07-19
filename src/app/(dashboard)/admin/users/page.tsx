import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Search, Filter, MoreVertical, Shield, ShieldAlert, CheckCircle2, XCircle, Mail, Edit3, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function AdminUsersPage() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const users = [
    { id: "USR-01", name: "David Johnson", email: "david.j@example.com", role: "TUTOR", status: "Active", joined: "2026-06-15" },
    { id: "USR-02", name: "Emma Watson", email: "emma.w@example.com", role: "STUDENT", status: "Active", joined: "2026-07-02" },
    { id: "USR-03", name: "Michael Chang", email: "m.chang@example.com", role: "TUTOR", status: "Pending", joined: "2026-07-18" },
    { id: "USR-04", name: "Sarah Smith", email: "s.smith@example.com", role: "PARENT", status: "Active", joined: "2026-07-05" },
    { id: "USR-05", name: "John Doe", email: "j.doe@example.com", role: "STUDENT", status: "Suspended", joined: "2026-05-20" },
  ];

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
          <button className="btn btn-primary shadow-sm shadow-primary-500/20">
            Invite User
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
              placeholder="Search by name, email, or ID..." 
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-glass-border bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 rounded-xl border border-glass-border bg-white text-sm font-medium text-text-secondary outline-none focus:border-primary-500 shadow-sm cursor-pointer">
              <option>All Roles</option>
              <option>Students</option>
              <option>Tutors</option>
              <option>Parents</option>
              <option>Admins</option>
            </select>
            <button className="btn btn-secondary px-3 py-2 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-bg-secondary/30 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm shrink-0 border border-primary-200">
                        {user.name.split(" ")[0][0]}{user.name.split(" ")[1][0]}
                      </div>
                      <div>
                        <p className="font-bold text-text-primary group-hover:text-primary-600 transition-colors">{user.name}</p>
                        <p className="text-xs text-text-secondary flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
                      user.role === 'ADMIN' ? 'bg-error-50 text-error-600' :
                      user.role === 'TUTOR' ? 'bg-primary-50 text-primary-600' :
                      user.role === 'PARENT' ? 'bg-warning-50 text-warning-600' :
                      'bg-success-50 text-success-600'
                    }`}>
                      {user.role === 'ADMIN' && <ShieldAlert className="w-3 h-3" />}
                      {user.role === 'TUTOR' && <Shield className="w-3 h-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      user.status === 'Active' ? 'bg-success-50 text-success-600 border border-success-200' :
                      user.status === 'Pending' ? 'bg-warning-50 text-warning-600 border border-warning-200' :
                      'bg-error-50 text-error-600 border border-error-200'
                    }`}>
                      {user.status === 'Active' && <CheckCircle2 className="w-3 h-3" />}
                      {user.status === 'Pending' && <div className="w-1.5 h-1.5 rounded-full bg-warning-500 animate-pulse"></div>}
                      {user.status === 'Suspended' && <XCircle className="w-3 h-3" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-text-secondary font-medium">
                    {user.joined}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-text-secondary hover:text-error-600 hover:bg-error-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-glass-border flex items-center justify-between text-sm text-text-secondary bg-bg-secondary/30 rounded-b-2xl">
          <span>Showing 1 to 5 of 8,591 users</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md border border-glass-border bg-white hover:bg-bg-tertiary disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 rounded-md border border-primary-500 bg-primary-500 text-white">1</button>
            <button className="px-3 py-1 rounded-md border border-glass-border bg-white hover:bg-bg-tertiary">2</button>
            <button className="px-3 py-1 rounded-md border border-glass-border bg-white hover:bg-bg-tertiary">3</button>
            <button className="px-3 py-1 rounded-md border border-glass-border bg-white hover:bg-bg-tertiary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
