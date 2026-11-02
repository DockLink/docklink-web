import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PreviewPage from "@/components/preview/PreviewPage";
import ProductDoctor from "@/components/pages/ProductDoctor";
import ProductERP from "@/components/pages/ProductERP";
import ProductPOS from "@/components/pages/ProductPOS";
import { getCaseStudySummaryBySlugForAdmin } from "@/lib/cms/caseStudies";
import { cmsEditorPath, cmsLivePath } from "@/lib/cms/preview";
import { getProductBySlugForAdmin } from "@/lib/cms/products";
import { isProductSlug } from "@/lib/cms/types";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isProductSlug(slug)) return { title: "Product (Preview)" };
  const product = await getProductBySlugForAdmin(slug);
  return {
    title: `${product.seoTitle} (Preview)`,
    description: product.seoDescription,
  };
}

export default async function ProductPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isProductSlug(slug)) notFound();

  const product = await getProductBySlugForAdmin(slug);
  const relatedCaseStudy = product.relatedCaseStudyId
    ? await getCaseStudySummaryBySlugForAdmin(product.relatedCaseStudyId)
    : null;

  return (
    <PreviewPage
      editorHref={cmsEditorPath("products", slug)}
      liveHref={cmsLivePath("products", slug)}
      published={product.published}
    >
      {slug === "erp" ? (
        <ProductERP data={product} relatedCaseStudy={relatedCaseStudy} />
      ) : slug === "pos" ? (
        <ProductPOS data={product} relatedCaseStudy={relatedCaseStudy} />
      ) : (
        <ProductDoctor data={product} />
      )}
    </PreviewPage>
  );
}
