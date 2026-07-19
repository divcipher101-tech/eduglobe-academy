export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-display font-bold text-text-primary mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none text-text-secondary">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you create or modify your account, request support, or otherwise communicate with us. This information may include: name, email address, phone number, and academic records.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve our services, to process transactions, and to send you related information, including confirmations and receipts.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">3. Data Security</h2>
          <p className="mb-4">
            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">4. Sharing of Information</h2>
          <p className="mb-4">
            We do not share your personal information with third parties except as described in this privacy policy, such as with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">5. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at privacy@eduglobe.academy.
          </p>
        </div>
      </div>
    </div>
  );
}
