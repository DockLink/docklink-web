import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PreviewPage from "@/components/preview/PreviewPage";
import CaseStudyDetail from "@/components/pages/CaseStudyDetail";
import { getCaseStudyBySlugForAdmin, getCaseStudyListing } from "@/lib/cms/caseStudies";
import { cmsEditorPath, cmsLivePath } from "@/lib/cms/preview";
import { isValidCaseStudySlug } from "@/lib/cms/types";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidCaseStudySlug(slug)) return { title: "Case study (Preview)" };
  const study = await getCaseStudyBySlugForAdmin(slug);
  if (!study) return { title: "Case study (Preview)" };
  return {
    title: `${study.seoTitle || study.client} (Preview)`,
    description: study.seoDescription || study.subhead,
  };
}

export default async function CaseStudyPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isValidCaseStudySlug(slug)) notFound();

  const [study, listing] = await Promise.all([getCaseStudyBySlugForAdmin(slug), getCaseStudyListing()]);
  if (!study) notFound();

  return (
    <PreviewPage
      editorHref={cmsEditorPath("case-studies", slug)}
      liveHref={cmsLivePath("case-studies", slug)}
      published={study.published}
    >
      <CaseStudyDetail data={study} cta={listing.cta} />
    </PreviewPage>
  );
}
