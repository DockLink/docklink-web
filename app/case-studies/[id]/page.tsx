import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetail from "@/components/pages/CaseStudyDetail";
import { getCaseStudyBySlug, getCaseStudyListing, getPublishedCaseStudySummaries } from "@/lib/cms/caseStudies";

export const dynamicParams = true;

export async function generateStaticParams() {
  const studies = await getPublishedCaseStudySummaries();
  return studies.map((study) => ({ id: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[id]">): Promise<Metadata> {
  const { id } = await params;
  const cs = await getCaseStudyBySlug(id);
  if (!cs) return { title: "Case Study" };
  return {
    title: cs.seoTitle || cs.client,
    description: cs.seoDescription || cs.subhead,
  };
}

export default async function Page({
  params,
}: PageProps<"/case-studies/[id]">) {
  const { id } = await params;
  const [cs, listing] = await Promise.all([getCaseStudyBySlug(id), getCaseStudyListing()]);
  if (!cs) notFound();
  return <CaseStudyDetail data={cs} cta={listing.cta} />;
}
