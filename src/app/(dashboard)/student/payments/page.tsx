import { Download, Clock, CheckCircle2, AlertCircle, ShieldCheck, Receipt } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function PaymentsDashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch real invoices/payments
  const invoices = await prisma.invoice.findMany({
    where: { userId: session.user.id },
    include: { payments: true },
    orderBy: { createdAt: 'desc' }
  });

  const pendingInvoices = invoices.filter(inv => inv.status === "PENDING");
  
  // Right now we map invoices to transactions for the table
  const transactions = invoices;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">Billing & Payments</h1>
          <p className="text-text-secondary">Manage your subscriptions, payment methods, and billing history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Current Plan & Due Invoices */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Current Plan Card (Mocked for now since subscriptions aren't fully implemented yet) */}
          <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl p-8 text-white shadow-xl shadow-primary-900/20 relative overflow-hidden opacity-75">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
                  <ShieldCheck className="w-6 h-6 text-primary-100" />
                </div>
                <span className="px-3 py-1 bg-text-tertiary/20 text-text-tertiary text-xs font-bold uppercase tracking-wider rounded-lg border border-text-tertiary/30">
                  Inactive
                </span>
              </div>
              
              <h2 className="text-lg font-medium text-primary-100 mb-1">Current Plan</h2>
              <h3 className="text-3xl font-display font-bold mb-6">No Active Plan</h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-primary-200">Price</span>
                  <span className="font-bold">₦0.00</span>
                </div>
              </div>
              
              <button className="w-full py-3 bg-white text-primary-900 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg" disabled>
                Manage Subscription
              </button>
            </div>
          </div>

          {/* Pending Invoices */}
          {pendingInvoices.length > 0 ? (
            pendingInvoices.map(invoice => (
              <div key={invoice.id} className="bg-white rounded-3xl border-2 border-warning-200 p-8 shadow-lg shadow-warning-100/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-warning-100 text-warning-600 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">Payment Due</h3>
                </div>
                
                <p className="text-sm text-text-secondary mb-6">
                  You have an outstanding invoice to pay.
                </p>
                
                <div className="bg-bg-secondary rounded-xl p-4 mb-6 border border-glass-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-text-primary">Total Amount</span>
                    <span className="text-xl font-bold text-danger-600">{invoice.currency} {Number(invoice.amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Due Date</span>
                    <span className="text-danger-600 font-medium">
                      {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'Immediate'}
                    </span>
                  </div>
                </div>
                
                <Link 
                  href={`/student/payments/checkout?invoice=${invoice.id}`}
                  className="block w-full py-3 bg-primary-600 text-white text-center rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-md shadow-primary-600/20"
                >
                  Pay Now
                </Link>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl border border-glass-border p-8 text-center flex flex-col items-center">
               <CheckCircle2 className="w-10 h-10 text-success-500 mb-3" />
               <h3 className="text-lg font-bold text-text-primary mb-1">All Caught Up!</h3>
               <p className="text-sm text-text-secondary">You have no outstanding invoices to pay right now.</p>
            </div>
          )}
        </div>

        {/* Right Column: Transaction History */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Payment Methods (Mocked for now since not connected to Stripe yet) */}
          <div className="bg-white rounded-3xl border border-glass-border p-8 shadow-sm opacity-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-text-primary">Payment Methods</h2>
              <button className="text-sm font-bold text-primary-600 hover:text-primary-700">Add New</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-glass-border bg-bg-secondary rounded-2xl p-5 relative flex items-center justify-center text-text-tertiary min-h-[100px]">
                No cards linked
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-3xl border border-glass-border overflow-hidden shadow-sm">
            <div className="p-8 border-b border-glass-border flex justify-between items-center bg-bg-secondary/50">
              <h2 className="text-xl font-bold text-text-primary">Transaction History</h2>
              <button className="flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-primary-600 transition-colors" disabled={transactions.length === 0}>
                <Download className="w-4 h-4" /> Download All
              </button>
            </div>
            
            {transactions.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center">
                <Receipt className="w-12 h-12 text-text-tertiary mb-3" />
                <h3 className="text-lg font-bold text-text-primary mb-1">No Transactions Yet</h3>
                <p className="text-text-secondary max-w-sm">
                  When you make a payment for a course or subscription, your receipt and invoice will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-bg-secondary text-text-secondary text-sm">
                      <th className="font-medium p-4 pl-8">Invoice</th>
                      <th className="font-medium p-4">Date</th>
                      <th className="font-medium p-4">Amount</th>
                      <th className="font-medium p-4">Status</th>
                      <th className="font-medium p-4 pr-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-glass-border">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-bg-secondary/50 transition-colors">
                        <td className="p-4 pl-8">
                          <span className="text-sm font-bold text-text-primary">INV-{tx.id.substring(0, 6).toUpperCase()}</span>
                        </td>
                        <td className="p-4 text-sm text-text-secondary">
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 font-bold text-text-primary">
                          {tx.currency} {Number(tx.amount).toFixed(2)}
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider",
                            tx.status === "PAID" ? "bg-success-50 text-success-700" :
                            tx.status === "PENDING" ? "bg-warning-50 text-warning-700" :
                            "bg-danger-50 text-danger-700"
                          )}>
                            {tx.status === "PAID" && <CheckCircle2 className="w-3.5 h-3.5" />}
                            {tx.status === "PENDING" && <Clock className="w-3.5 h-3.5" />}
                            {tx.status}
                          </span>
                        </td>
                        <td className="p-4 pr-8 text-right">
                          <button className="p-2 text-text-tertiary hover:text-primary-600 transition-colors tooltip" data-tip="Download Receipt">
                            <Download className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {transactions.length > 0 && (
              <div className="p-4 border-t border-glass-border text-center">
                <button className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
