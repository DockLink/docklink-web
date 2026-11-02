import type { Metadata } from "next";
import ProductDoctor from "@/components/pages/ProductDoctor";
import { getProductBySlug } from "@/lib/cms/products";

export async function generateMetadata(): Promise<Metadata> {
  const product = await getProductBySlug("doctor");
  return {
    title: product.seoTitle,
    description: product.seoDescription,
  };
}

export default async function Page() {
  const product = await getProductBySlug("doctor");
  return <ProductDoctor data={product} />;
}
