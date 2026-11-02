import CaseStudyListingEditor from "@/components/admin/CaseStudyListingEditor";
import { getCaseStudyListing } from "@/lib/cms/caseStudies";

export default async function AdminCaseStudyListingPage() {
  const listing = await getCaseStudyListing();
  return <CaseStudyListingEditor initial={listing} />;
}
