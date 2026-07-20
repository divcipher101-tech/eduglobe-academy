import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AdminSettingsClient } from "./AdminSettingsClient";

export default async function AdminSettingsPage() {
  const session = await auth();
  
  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  // Fetch full user from database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    redirect("/login");
  }

  return <AdminSettingsClient user={user} />;
}
