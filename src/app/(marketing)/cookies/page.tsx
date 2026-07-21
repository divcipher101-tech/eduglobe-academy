export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-display font-bold text-text-primary mb-8">Cookie Policy</h1>
        <div className="prose prose-lg max-w-none text-text-secondary">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">1. What Are Cookies</h2>
          <p className="mb-4">
            Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">2. How EduGlobe Academy Uses Cookies</h2>
          <p className="mb-4">
            When you use and access the Platform, we may place a number of cookies files in your web browser. We use cookies for the following purposes: to enable certain functions of the Service, to provide analytics, and to store your preferences (such as authentication state).
          </p>

          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">3. Essential Cookies</h2>
          <p className="mb-4">
            We use essential cookies to authenticate users and prevent fraudulent use of user accounts. These cookies are required for the platform to function properly and cannot be disabled.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">4. Your Choices Regarding Cookies</h2>
          <p className="mb-4">
            If you&apos;d like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, and some of our pages might not display properly.
          </p>
        </div>
      </div>
    </div>
  );
}
