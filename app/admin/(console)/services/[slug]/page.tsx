import { notFound } from "next/navigation";
import ServiceEditor from "@/components/admin/ServiceEditor";
import { getServiceBySlugForAdmin } from "@/lib/cms/services";
import { isServiceSlug } from "@/lib/cms/types";

export default async function AdminServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  const service = await getServiceBySlugForAdmin(slug);
  return <ServiceEditor initial={service} />;
}
