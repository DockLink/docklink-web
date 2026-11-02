import ListingEditor from "@/components/admin/ListingEditor";
import { getProductListing } from "@/lib/cms/products";

export default async function AdminListingPage() {
  const listing = await getProductListing();
  return <ListingEditor initial={listing} />;
}
