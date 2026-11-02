import type { Metadata } from "next";
import PreviewPage from "@/components/preview/PreviewPage";
import CaseStudies from "@/components/pages/CaseStudies";
import { getAllCaseStudySummaries, getCaseStudyListing } from "@/lib/cms/caseStudies";
import { cmsEditorPath, cmsLivePath } from "@/lib/cms/preview";

export const metadata: Metadata = {
  title: "Case studies listing (Preview)",
};

export default async function CaseStudyListingPreviewPage() {
  const [listing, studies] = await Promise.all([getCaseStudyListing(), getAllCaseStudySummaries()]);

  return (
    <PreviewPage editorHref={cmsEditorPath("case-studies")} liveHref={cmsLivePath("case-studies")}>
      <CaseStudies listing={listing} studies={studies.filter((study) => study.published)} />
    </PreviewPage>
  );
}
