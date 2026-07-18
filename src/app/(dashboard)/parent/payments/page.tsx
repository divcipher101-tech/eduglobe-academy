import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CreditCard, FileText, Download, CheckCircle2 } from "lucide-react";

export default async function ParentPayments() {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  // Fetch invoices for children
  const parentLinks = await prisma.parentStudentLink.findMany({
    where: { parentId: session.user.id },
    select: { studentId: true }
  });
  
  const studentIds = parentLinks.map(link => link.studentId);
  
  const invoices = await prisma.invoice.findMany({
    where: { userId: { in: studentIds } },
    include: { user: true, course: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Payments & Invoices</h1>
          <p className="text-text-secondary mt-1">Manage billing for your children's enrollments</p>
        </div>
      </div>

      {invoices.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-glass-border text-center shadow-sm">
          <div className="w-16 h-16 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-text-tertiary" />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">No Payment History</h3>
          <p className="text-text-secondary max-w-md mx-auto">
            You don't have any invoices or payment records yet. When you purchase courses for your children, invoices will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-glass-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-secondary text-text-tertiary uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Invoice No.</th>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-text-primary font-medium">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 font-bold text-text-primary">
                      {invoice.user.firstName} {invoice.user.lastName}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{invoice.course?.title || 'General Subscription'}</td>
                    <td className="px-6 py-4 font-bold text-text-primary">
                      {invoice.currency === 'NGN' ? '₦' : invoice.currency}{Number(invoice.totalAmount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {invoice.status === 'PAID' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-success-50 text-success-700 font-bold text-xs border border-success-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> PAID
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-warning-50 text-warning-700 font-bold text-xs border border-warning-200">
                          PENDING
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-text-tertiary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
