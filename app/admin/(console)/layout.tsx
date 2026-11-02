import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdminClient } from "@/lib/cms/admin";

export default async function AdminConsoleLayout({ children }: { children: React.ReactNode }) {
  const { error } = await requireAdminClient();
  if (error) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
