import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreditCard, Download, FileText, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default async function ParentPaymentsPage() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "PARENT") {
    redirect("/dashboard");
  }

  const invoices = [
    { id: "INV-2026-001", child: "Emma Watson", amount: 450.00, dueDate: "2026-08-01", status: "Unpaid" },
    { id: "INV-2026-002", child: "James Watson", amount: 320.00, dueDate: "2026-07-01", status: "Paid", paidOn: "2026-06-28" },
    { id: "INV-2026-003", child: "Emma Watson", amount: 450.00, dueDate: "2026-06-01", status: "Paid", paidOn: "2026-05-30" },
  ];

  const totalDue = invoices.filter(i => i.status === "Unpaid").reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Billing & Invoices</h1>
          <p className="text-text-secondary mt-1">Manage tuition payments and download past receipts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Unpaid Invoices Alert */}
          {totalDue > 0 && (
            <div className="bg-warning-50 border border-warning-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-warning-100 text-warning-600 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-warning-900">Payment Due Soon</h3>
                  <p className="text-warning-800 text-sm">You have an outstanding balance of <span className="font-bold">£{totalDue.toFixed(2)}</span> due on August 1st.</p>
                </div>
              </div>
              <button className="btn bg-warning-600 hover:bg-warning-700 text-white border-transparent shrink-0">
                Pay Now
              </button>
            </div>
          )}

          <h2 className="text-xl font-bold text-text-primary">Invoice History</h2>
          <div className="bg-white rounded-2xl border border-glass-border shadow-sm overflow-hidden">
            <div className="divide-y divide-glass-border">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-bg-secondary/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      inv.status === 'Paid' ? 'bg-success-50 text-success-600' : 'bg-bg-tertiary text-text-tertiary group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors'
                    }`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary">{inv.id}</h4>
                      <p className="text-sm text-text-secondary mt-0.5">Student: {inv.child}</p>
                      <p className="text-xs text-text-tertiary mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Due {inv.dueDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 sm:text-right">
                    <div>
                      <p className="text-lg font-bold text-text-primary">£{inv.amount.toFixed(2)}</p>
                      {inv.status === "Paid" ? (
                        <p className="text-xs font-bold text-success-600 flex items-center justify-end gap-1 mt-1">
                          <CheckCircle2 className="w-3 h-3" /> Paid {inv.paidOn}
                        </p>
                      ) : (
                        <p className="text-xs font-bold text-warning-600 flex items-center justify-end gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> Unpaid
                        </p>
                      )}
                    </div>
                    <button className="p-2 rounded-lg text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-colors" title="Download Invoice">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-text-primary">Payment Methods</h2>
          <div className="bg-white rounded-2xl border border-glass-border shadow-sm p-6 space-y-4">
            <div className="p-4 rounded-xl border border-glass-border bg-bg-secondary/30 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white border border-glass-border shadow-sm flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary">Visa ending in 4242</h4>
                <p className="text-sm text-text-secondary">Expires 12/28</p>
                <div className="mt-2 inline-flex items-center text-[10px] font-bold text-primary-600 bg-primary-50 border border-primary-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Default
                </div>
              </div>
            </div>
            
            <button className="w-full btn btn-secondary border-dashed border-2 hover:border-primary-300 hover:text-primary-600 transition-colors">
              Add Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
