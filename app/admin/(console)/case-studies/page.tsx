import CaseStudyIndex from "@/components/admin/CaseStudyIndex";
import { getAllCaseStudySummaries } from "@/lib/cms/caseStudies";

export default async function AdminCaseStudiesPage() {
  const studies = await getAllCaseStudySummaries();
  return <CaseStudyIndex initial={studies} />;
}
