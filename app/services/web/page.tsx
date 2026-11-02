import type { Metadata } from "next";
import ServiceWeb from "@/components/pages/ServiceWeb";
import { getServiceBySlug } from "@/lib/cms/services";

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("web");
  return {
    title: service.seoTitle,
    description: service.seoDescription,
  };
}

export default async function Page() {
  const service = await getServiceBySlug("web");
  return <ServiceWeb data={service} />;
}
