import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SettingsClient } from "./SettingsClient";

export default async function StudentSettingsPage() {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch full user from database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    redirect("/login");
  }

  return <SettingsClient user={user} />;
}
