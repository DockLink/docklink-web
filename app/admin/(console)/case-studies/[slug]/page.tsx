import { notFound } from "next/navigation";
import CaseStudyEditor from "@/components/admin/CaseStudyEditor";
import { getCaseStudyBySlugForAdmin } from "@/lib/cms/caseStudies";
import { isValidCaseStudySlug } from "@/lib/cms/types";

export default async function AdminCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isValidCaseStudySlug(slug)) notFound();
  const study = await getCaseStudyBySlugForAdmin(slug);
  if (!study) notFound();
  return <CaseStudyEditor initial={study} />;
}
