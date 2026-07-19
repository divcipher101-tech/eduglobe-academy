export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-display font-bold text-text-primary mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none text-text-secondary">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using EduGlobe Academy ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">2. User Accounts</h2>
          <p className="mb-4">
            To access certain features of the Platform, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">3. Code of Conduct</h2>
          <p className="mb-4">
            Users must behave respectfully and professionally in all interactions on the Platform. Harassment, discrimination, or any form of abusive behavior will result in immediate account termination.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">4. Intellectual Property</h2>
          <p className="mb-4">
            All content, including but not limited to courses, videos, text, graphics, logos, and software, is the property of EduGlobe Academy or its content suppliers and is protected by international copyright laws.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">5. Modifications to Service</h2>
          <p className="mb-4">
            EduGlobe Academy reserves the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice.
          </p>
        </div>
      </div>
    </div>
  );
}
