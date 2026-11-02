import type { Metadata } from "next";
import Products from "@/components/pages/Products";
import { getProductListing, getPublishedProductSummaries } from "@/lib/cms/products";

export async function generateMetadata(): Promise<Metadata> {
  const listing = await getProductListing();
  return {
    title: listing.seoTitle,
    description: listing.seoDescription,
  };
}

export default async function Page() {
  const [listing, products] = await Promise.all([getProductListing(), getPublishedProductSummaries()]);
  return <Products listing={listing} products={products} />;
}
