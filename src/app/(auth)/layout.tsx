export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary p-4">
      <div className="absolute inset-0 bg-mesh opacity-30 z-0"></div>
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="font-display font-bold text-3xl text-primary-600 mb-2">EduGlobe Academy</h1>
          <p className="text-text-secondary">Education Without Borders</p>
        </div>
        <div className="card card-glass animate-scale-in shadow-xl border-border-primary">
          {children}
        </div>
      </div>
    </div>
  );
}
