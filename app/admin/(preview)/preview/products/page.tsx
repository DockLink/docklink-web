import type { Metadata } from "next";
import PreviewPage from "@/components/preview/PreviewPage";
import Products from "@/components/pages/Products";
import { getAllProductSummaries, getProductListing } from "@/lib/cms/products";
import { cmsEditorPath, cmsLivePath } from "@/lib/cms/preview";

export const metadata: Metadata = {
  title: "Products listing (Preview)",
};

export default async function ProductListingPreviewPage() {
  const [listing, products] = await Promise.all([getProductListing(), getAllProductSummaries()]);

  return (
    <PreviewPage editorHref={cmsEditorPath("products")} liveHref={cmsLivePath("products")}>
      <Products listing={listing} products={products.filter((product) => product.published)} />
    </PreviewPage>
  );
}
