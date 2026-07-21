import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Download, ArrowUpRight, Building2, Plus } from "lucide-react";

export default async function TutorFinancesPage() {
  const session = await auth();

  if (!session || !session.user || (session.user.role !== "TUTOR" && session.user.role !== "ADMIN")) {
    redirect("/login");
  }

  const transactions = [
    { id: "TRX-8921", type: "PAYOUT", amount: 1250.00, date: "2026-07-01", status: "Completed", desc: "Monthly Payout (June)" },
    { id: "TRX-8944", type: "EARNING", amount: 45.00, date: "2026-07-15", status: "Completed", desc: "1-on-1 Session: Emma Watson" },
    { id: "TRX-8951", type: "EARNING", amount: 120.00, date: "2026-07-16", status: "Completed", desc: "Group Class: A-Level Physics" },
    { id: "TRX-8962", type: "EARNING", amount: 45.00, date: "2026-07-18", status: "Pending", desc: "1-on-1 Session: James Chen" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary">Financial Overview</h1>
        <p className="text-text-secondary mt-1">Track your earnings, view past payouts, and manage bank details.</p>
      </div>

      {/* Main Balance Card */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-primary-200 font-medium mb-2">Available for Payout</p>
            <h2 className="text-5xl font-display font-bold">£210.00</h2>
            <p className="text-sm text-primary-200 mt-4 flex items-center gap-2">
              <span className="flex items-center text-success-300 bg-success-500/20 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3 h-3 mr-1" /> 12%
              </span>
              from last month
            </p>
          </div>
          <div className="flex gap-3">
            <button className="btn bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md">
              <Download className="w-4 h-4 mr-2" /> Download Statement
            </button>
            <button className="btn bg-white text-primary-900 hover:bg-primary-50">
              Withdraw Funds
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-text-primary">Recent Transactions</h2>
          <div className="bg-white rounded-2xl border border-glass-border shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-secondary/50 border-b border-glass-border">
                  <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Transaction ID</th>
                  <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Description</th>
                  <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Amount</th>
                  <th className="p-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border">
                {transactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-bg-secondary/30 transition-colors">
                    <td className="p-4 text-sm font-medium text-text-primary">{trx.id}</td>
                    <td className="p-4 text-sm text-text-secondary">{trx.date}</td>
                    <td className="p-4 text-sm text-text-secondary">{trx.desc}</td>
                    <td className="p-4 text-sm font-bold">
                      <span className={trx.type === 'EARNING' ? 'text-success-600' : 'text-text-primary'}>
                        {trx.type === 'EARNING' ? '+' : '-'}£{trx.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${
                        trx.status === 'Completed' ? 'bg-success-50 text-success-600' : 'bg-warning-50 text-warning-600'
                      }`}>
                        {trx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-text-primary">Payment Methods</h2>
          <div className="bg-white rounded-2xl border border-glass-border shadow-sm p-6 space-y-4">
            <div className="p-4 rounded-xl border border-primary-200 bg-primary-50 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white text-primary-600 shadow-sm flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-primary-900">Barclays Bank PLC</h4>
                <p className="text-sm text-primary-700 font-medium">**** **** **** 4092</p>
                <div className="mt-2 inline-flex items-center text-xs font-bold text-success-600 bg-success-100/50 px-2 py-0.5 rounded-full">
                  Primary Payout Method
                </div>
              </div>
            </div>
            
            <button className="w-full btn btn-secondary border-dashed border-2 hover:border-primary-300 hover:text-primary-600 transition-colors">
              <Plus className="w-4 h-4 mr-2" /> Add Bank Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
