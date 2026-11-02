import { notFound } from "next/navigation";
import ProductEditor from "@/components/admin/ProductEditor";
import { getAllCaseStudySummaries } from "@/lib/cms/caseStudies";
import { getProductBySlugForAdmin } from "@/lib/cms/products";
import { isProductSlug } from "@/lib/cms/types";

export default async function AdminProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isProductSlug(slug)) notFound();
  const [product, caseStudies] = await Promise.all([getProductBySlugForAdmin(slug), getAllCaseStudySummaries()]);
  return <ProductEditor initial={product} caseStudies={caseStudies} />;
}
