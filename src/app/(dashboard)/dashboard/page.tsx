import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const role = session.user.role;

  switch (role) {
    case "STUDENT":
      redirect("/student");
    case "TUTOR":
      redirect("/tutor");
    case "PARENT":
      redirect("/parent");
    case "ADMIN":
      redirect("/admin");
    case "BRANCH_MANAGER":
    case "MANAGER":
      redirect("/manager");
    default:
      // If role is undefined or not handled, maybe fallback to a generic error or profile page
      redirect("/");
  }
}
