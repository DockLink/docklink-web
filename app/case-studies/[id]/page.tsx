import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetail from "@/components/pages/CaseStudyDetail";
import { caseStudyData } from "@/data/caseStudies";

export async function generateStaticParams() {
  return Object.keys(caseStudyData).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[id]">): Promise<Metadata> {
  const { id } = await params;
  const cs = caseStudyData[id];
  if (!cs) return { title: "Case Study" };
  return {
    title: cs.client,
    description: cs.subhead,
  };
}

export default async function Page({
  params,
}: PageProps<"/case-studies/[id]">) {
  const { id } = await params;
  if (!caseStudyData[id]) notFound();
  return <CaseStudyDetail id={id} />;
}
