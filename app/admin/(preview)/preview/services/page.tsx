import type { Metadata } from "next";
import PreviewPage from "@/components/preview/PreviewPage";
import Services from "@/components/pages/Services";
import { cmsEditorPath, cmsLivePath } from "@/lib/cms/preview";
import { getAllServiceSummaries, getServiceListing } from "@/lib/cms/services";

export const metadata: Metadata = {
  title: "Services listing (Preview)",
};

export default async function ServiceListingPreviewPage() {
  const [listing, services] = await Promise.all([getServiceListing(), getAllServiceSummaries()]);

  return (
    <PreviewPage editorHref={cmsEditorPath("services")} liveHref={cmsLivePath("services")}>
      <Services listing={listing} services={services.filter((service) => service.published)} />
    </PreviewPage>
  );
}
