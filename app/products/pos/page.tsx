import type { Metadata } from "next";
import ProductPOS from "@/components/pages/ProductPOS";
import { getCaseStudySummaryBySlug } from "@/lib/cms/caseStudies";
import { getProductBySlug } from "@/lib/cms/products";

export async function generateMetadata(): Promise<Metadata> {
  const product = await getProductBySlug("pos");
  return {
    title: product.seoTitle,
    description: product.seoDescription,
  };
}

export default async function Page() {
  const product = await getProductBySlug("pos");
  const relatedCaseStudy = product.relatedCaseStudyId
    ? await getCaseStudySummaryBySlug(product.relatedCaseStudyId)
    : null;
  return <ProductPOS data={product} relatedCaseStudy={relatedCaseStudy} />;
}
