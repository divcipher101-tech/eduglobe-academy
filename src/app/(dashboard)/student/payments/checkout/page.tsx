"use client";

import { useState } from "react";
import { ArrowLeft, ShieldCheck, CreditCard, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "bank">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto pt-10 animate-fade-in-up">
        <div className="bg-white rounded-3xl border border-glass-border overflow-hidden shadow-xl shadow-primary-900/5 text-center p-12">
          <div className="w-24 h-24 rounded-full bg-success-100 text-success-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-display font-bold text-text-primary mb-4">Payment Successful!</h1>
          <p className="text-lg text-text-secondary mb-8">
            Thank you for your payment. Your receipt has been sent to your email.
          </p>
          
          <div className="bg-bg-secondary p-6 rounded-2xl border border-glass-border mb-10 text-left max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-text-secondary">Amount Paid</span>
              <span className="font-bold text-text-primary">$45.00</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-text-secondary">Transaction ID</span>
              <span className="font-bold text-text-primary">TXN-8839201</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Date</span>
              <span className="font-bold text-text-primary">Today</span>
            </div>
          </div>

          <Link href="/student/payments" className="inline-flex px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up pb-12">
      <Link href="/student/payments" className="inline-flex items-center text-sm font-bold text-text-secondary hover:text-primary-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Payments
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-glass-border p-8 shadow-sm">
            <h1 className="text-2xl font-display font-bold text-text-primary mb-6">Secure Checkout</h1>
            
            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <button 
                onClick={() => setPaymentMethod("card")}
                className={cn(
                  "p-4 rounded-xl border-2 font-bold flex flex-col items-center justify-center gap-2 transition-all",
                  paymentMethod === "card" 
                    ? "border-primary-500 bg-primary-50 text-primary-700" 
                    : "border-glass-border bg-white text-text-secondary hover:bg-bg-secondary"
                )}
              >
                <CreditCard className="w-6 h-6" />
                <span className="text-sm">Card</span>
              </button>
              
              <button 
                onClick={() => setPaymentMethod("paypal")}
                className={cn(
                  "p-4 rounded-xl border-2 font-bold flex flex-col items-center justify-center gap-2 transition-all",
                  paymentMethod === "paypal" 
                    ? "border-primary-500 bg-primary-50 text-primary-700" 
                    : "border-glass-border bg-white text-text-secondary hover:bg-bg-secondary"
                )}
              >
                <div className="font-serif italic text-lg leading-none font-black text-blue-800">P</div>
                <span className="text-sm">PayPal</span>
              </button>
              
              <button 
                onClick={() => setPaymentMethod("bank")}
                className={cn(
                  "p-4 rounded-xl border-2 font-bold flex flex-col items-center justify-center gap-2 transition-all",
                  paymentMethod === "bank" 
                    ? "border-primary-500 bg-primary-50 text-primary-700" 
                    : "border-glass-border bg-white text-text-secondary hover:bg-bg-secondary"
                )}
              >
                <div className="w-6 h-6 font-serif italic text-lg leading-none font-black text-green-600">$</div>
                <span className="text-sm">Transfer</span>
              </button>
            </div>

            {/* Form Fields */}
            {paymentMethod === "card" && (
              <form onSubmit={handlePayment} className="space-y-6 animate-fade-in-up">
                <div>
                  <label className="block text-sm font-bold text-text-primary mb-2">Cardholder Name</label>
                  <input type="text" defaultValue="Cipher User" className="w-full px-4 py-3 bg-bg-secondary border border-glass-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none" required />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-text-primary mb-2">Card Number</label>
                  <div className="relative">
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-12 pr-4 py-3 bg-bg-secondary border border-glass-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none font-mono" required />
                    <CreditCard className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-text-primary mb-2">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-bg-secondary border border-glass-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-primary mb-2">CVC</label>
                    <div className="relative">
                      <input type="text" placeholder="123" className="w-full px-4 py-3 bg-bg-secondary border border-glass-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none" required />
                      <ShieldCheck className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Pay $45.00
                    </>
                  )}
                </button>
              </form>
            )}

            {paymentMethod === "paypal" && (
              <div className="text-center py-10 animate-fade-in-up">
                <p className="text-text-secondary mb-6">You will be redirected to PayPal to complete your purchase securely.</p>
                <button onClick={handlePayment} className="px-8 py-3 bg-[#00457C] hover:bg-[#003666] text-white rounded-xl font-bold transition-all shadow-lg w-full max-w-sm flex items-center justify-center gap-2 mx-auto">
                  <span className="italic">Pay</span><span className="italic font-light">Pal</span>
                </button>
              </div>
            )}
            
            {paymentMethod === "bank" && (
              <div className="text-center py-10 animate-fade-in-up border-2 border-dashed border-glass-border rounded-2xl bg-bg-secondary">
                <p className="text-text-secondary font-medium mb-2">Virtual Account Generated</p>
                <h3 className="text-2xl font-bold text-text-primary font-mono mb-6 tracking-wider">0123 4567 89</h3>
                <p className="text-sm text-text-tertiary mb-6">Transfer exactly <strong>$45.00</strong> to the account number above.<br/>Your payment will be automatically verified.</p>
                <button onClick={handlePayment} className="px-8 py-3 bg-white border border-glass-border hover:bg-bg-tertiary text-text-primary rounded-xl font-bold transition-all shadow-sm w-full max-w-sm mx-auto">
                  I have made the transfer
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-bg-secondary to-white rounded-3xl border border-glass-border p-8 shadow-sm relative overflow-hidden">
            <h2 className="text-xl font-bold text-text-primary mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-text-primary">1-on-1 Tutoring Session</h3>
                  <p className="text-sm text-text-secondary">Physics • Dr. Sarah Jenkins</p>
                </div>
                <span className="font-bold text-text-primary">$45.00</span>
              </div>
            </div>
            
            <div className="h-px bg-glass-border w-full mb-6"></div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium">$45.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tax (0%)</span>
                <span className="font-medium">$0.00</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6 pt-4 border-t border-glass-border">
              <span className="font-bold text-text-primary">Total</span>
              <span className="text-3xl font-bold text-primary-600">$45.00</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-medium text-text-tertiary justify-center">
              <ShieldCheck className="w-4 h-4 text-success-500" />
              Guaranteed Safe & Secure Checkout
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
