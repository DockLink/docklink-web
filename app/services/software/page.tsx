import type { Metadata } from "next";
import ServiceSoftware from "@/components/pages/ServiceSoftware";
import { getServiceBySlug } from "@/lib/cms/services";

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("software");
  return {
    title: service.seoTitle,
    description: service.seoDescription,
  };
}

export default async function Page() {
  const service = await getServiceBySlug("software");
  return <ServiceSoftware data={service} />;
}
