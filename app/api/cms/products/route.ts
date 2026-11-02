import { getPublishedProductSummaries } from "@/lib/cms/products";

export async function GET() {
  const products = await getPublishedProductSummaries();
  return Response.json(products);
}
