import type { Metadata } from "next";
import Services from "@/components/pages/Services";
import { getPublishedServiceSummaries, getServiceListing } from "@/lib/cms/services";

export async function generateMetadata(): Promise<Metadata> {
  const listing = await getServiceListing();
  return {
    title: listing.seoTitle,
    description: listing.seoDescription,
  };
}

export default async function Page() {
  const [listing, services] = await Promise.all([getServiceListing(), getPublishedServiceSummaries()]);
  return <Services listing={listing} services={services} />;
}
