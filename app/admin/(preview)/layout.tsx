import { redirect } from "next/navigation";
import { requireAdminClient } from "@/lib/cms/admin";

export const dynamic = "force-dynamic";

export default async function AdminPreviewLayout({ children }: { children: React.ReactNode }) {
  const { error } = await requireAdminClient();
  if (error) {
    redirect("/admin/login");
  }

  return children;
}
