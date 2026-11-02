import type { Metadata } from "next";
import ServiceMobile from "@/components/pages/ServiceMobile";
import { getServiceBySlug } from "@/lib/cms/services";

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("mobile");
  return {
    title: service.seoTitle,
    description: service.seoDescription,
  };
}

export default async function Page() {
  const service = await getServiceBySlug("mobile");
  return <ServiceMobile data={service} />;
}
