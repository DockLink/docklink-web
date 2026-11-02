import type { Metadata } from "next";
import CaseStudies from "@/components/pages/CaseStudies";
import { getCaseStudyListing, getPublishedCaseStudySummaries } from "@/lib/cms/caseStudies";

export async function generateMetadata(): Promise<Metadata> {
  const listing = await getCaseStudyListing();
  return {
    title: listing.seoTitle,
    description: listing.seoDescription,
  };
}

export default async function Page() {
  const [listing, studies] = await Promise.all([getCaseStudyListing(), getPublishedCaseStudySummaries()]);
  return <CaseStudies listing={listing} studies={studies} />;
}
