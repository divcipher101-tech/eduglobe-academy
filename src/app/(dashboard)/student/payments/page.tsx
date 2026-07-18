"use client";

import { CreditCard, Download, ExternalLink, Clock, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: "INV-2026-004",
    description: "Premium Annual Subscription",
    date: "Oct 15, 2026",
    amount: "$299.00",
    status: "PAID",
    method: "Visa ending in 4242"
  },
  {
    id: "INV-2026-003",
    description: "1-on-1 Tutoring Session (Physics)",
    date: "Sep 28, 2026",
    amount: "$45.00",
    status: "PAID",
    method: "Mastercard ending in 8812"
  },
  {
    id: "INV-2026-002",
    description: "IGCSE Past Papers Bundle",
    date: "Aug 10, 2026",
    amount: "$15.00",
    status: "PAID",
    method: "Visa ending in 4242"
  },
  {
    id: "INV-2026-001",
    description: "Premium Monthly Subscription",
    date: "Jul 15, 2026",
    amount: "$29.00",
    status: "PAID",
    method: "Visa ending in 4242"
  }
];

export default function PaymentsDashboard() {
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
          
          {/* Current Plan Card */}
          <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl p-8 text-white shadow-xl shadow-primary-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
                  <ShieldCheck className="w-6 h-6 text-primary-100" />
                </div>
                <span className="px-3 py-1 bg-success-500/20 text-success-300 text-xs font-bold uppercase tracking-wider rounded-lg border border-success-500/30">
                  Active
                </span>
              </div>
              
              <h2 className="text-lg font-medium text-primary-100 mb-1">Current Plan</h2>
              <h3 className="text-3xl font-display font-bold mb-6">Premium Annual</h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-primary-200">Price</span>
                  <span className="font-bold">$299.00 / year</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-200">Renews On</span>
                  <span className="font-bold">Oct 15, 2027</span>
                </div>
              </div>
              
              <button className="w-full py-3 bg-white text-primary-900 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg">
                Manage Subscription
              </button>
            </div>
          </div>

          {/* Pending Invoice (Mocked to show what it looks like) */}
          <div className="bg-white rounded-3xl border-2 border-warning-200 p-8 shadow-lg shadow-warning-100/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-warning-100 text-warning-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-text-primary">Payment Due</h3>
            </div>
            
            <p className="text-sm text-text-secondary mb-6">
              You have an outstanding invoice for a 1-on-1 tutoring session.
            </p>
            
            <div className="bg-bg-secondary rounded-xl p-4 mb-6 border border-glass-border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-text-primary">Total Amount</span>
                <span className="text-xl font-bold text-danger-600">$45.00</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">Due Date</span>
                <span className="text-danger-600 font-medium">Tomorrow</span>
              </div>
            </div>
            
            <Link 
              href="/student/payments/checkout"
              className="block w-full py-3 bg-primary-600 text-white text-center rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-md shadow-primary-600/20"
            >
              Pay Now
            </Link>
          </div>
        </div>

        {/* Right Column: Transaction History */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Payment Methods */}
          <div className="bg-white rounded-3xl border border-glass-border p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-text-primary">Payment Methods</h2>
              <button className="text-sm font-bold text-primary-600 hover:text-primary-700">Add New</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-primary-500 bg-primary-50 rounded-2xl p-5 relative">
                <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow-sm"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-8 bg-white rounded border border-glass-border flex items-center justify-center font-bold text-blue-900 italic">
                    VISA
                  </div>
                  <span className="font-bold text-text-primary">•••• 4242</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Expires 12/28</span>
                  <span className="font-bold text-primary-700 bg-white px-2 py-1 rounded-md text-xs">Default</span>
                </div>
              </div>

              <div className="border border-glass-border hover:border-primary-300 bg-white rounded-2xl p-5 relative transition-colors cursor-pointer group">
                <div className="absolute top-4 right-4 w-4 h-4 rounded-full border-2 border-glass-border group-hover:border-primary-300"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-8 bg-white rounded border border-glass-border flex items-center justify-center font-bold text-red-500 relative overflow-hidden">
                    <div className="absolute w-5 h-5 bg-red-500 rounded-full left-1 opacity-80"></div>
                    <div className="absolute w-5 h-5 bg-yellow-500 rounded-full right-1 opacity-80 mix-blend-multiply"></div>
                  </div>
                  <span className="font-bold text-text-primary">•••• 8812</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Expires 08/25</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-3xl border border-glass-border overflow-hidden shadow-sm">
            <div className="p-8 border-b border-glass-border flex justify-between items-center bg-bg-secondary/50">
              <h2 className="text-xl font-bold text-text-primary">Transaction History</h2>
              <button className="flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-primary-600 transition-colors">
                <Download className="w-4 h-4" /> Download All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-bg-secondary text-text-secondary text-sm">
                    <th className="font-medium p-4 pl-8">Invoice</th>
                    <th className="font-medium p-4">Description</th>
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
                        <span className="text-sm font-bold text-text-primary">{tx.id}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-text-primary block">{tx.description}</span>
                        <span className="text-xs text-text-tertiary">{tx.method}</span>
                      </td>
                      <td className="p-4 text-sm text-text-secondary">{tx.date}</td>
                      <td className="p-4 font-bold text-text-primary">{tx.amount}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-success-50 text-success-700">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {tx.status}
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
            <div className="p-4 border-t border-glass-border text-center">
              <button className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
