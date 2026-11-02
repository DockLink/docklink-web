import ServiceListingEditor from "@/components/admin/ServiceListingEditor";
import { getServiceListing } from "@/lib/cms/services";

export default async function AdminServiceListingPage() {
  const listing = await getServiceListing();
  return <ServiceListingEditor initial={listing} />;
}
