import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { auth } from "@/lib/auth";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar session={session} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
