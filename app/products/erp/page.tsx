import type { Metadata } from "next";
import ProductERP from "@/components/pages/ProductERP";
import { getCaseStudySummaryBySlug } from "@/lib/cms/caseStudies";
import { getProductBySlug } from "@/lib/cms/products";

export async function generateMetadata(): Promise<Metadata> {
  const product = await getProductBySlug("erp");
  return {
    title: product.seoTitle,
    description: product.seoDescription,
  };
}

export default async function Page() {
  const product = await getProductBySlug("erp");
  const relatedCaseStudy = product.relatedCaseStudyId
    ? await getCaseStudySummaryBySlug(product.relatedCaseStudyId)
    : null;
  return <ProductERP data={product} relatedCaseStudy={relatedCaseStudy} />;
}
