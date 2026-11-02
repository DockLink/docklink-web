import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PreviewPage from "@/components/preview/PreviewPage";
import ServiceMobile from "@/components/pages/ServiceMobile";
import ServiceSoftware from "@/components/pages/ServiceSoftware";
import ServiceWeb from "@/components/pages/ServiceWeb";
import { cmsEditorPath, cmsLivePath } from "@/lib/cms/preview";
import { getServiceBySlugForAdmin } from "@/lib/cms/services";
import { isServiceSlug } from "@/lib/cms/types";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return { title: "Service (Preview)" };
  const service = await getServiceBySlugForAdmin(slug);
  return {
    title: `${service.seoTitle} (Preview)`,
    description: service.seoDescription,
  };
}

export default async function ServicePreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();

  const service = await getServiceBySlugForAdmin(slug);

  return (
    <PreviewPage
      editorHref={cmsEditorPath("services", slug)}
      liveHref={cmsLivePath("services", slug)}
      published={service.published}
    >
      {slug === "software" ? (
        <ServiceSoftware data={service} />
      ) : slug === "web" ? (
        <ServiceWeb data={service} />
      ) : (
        <ServiceMobile data={service} />
      )}
    </PreviewPage>
  );
}
