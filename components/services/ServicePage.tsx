import type { ReactNode } from "react";
import ProductCTA from "@/components/ProductCTA";
import FeatureRows from "@/components/products/FeatureRows";
import ProductHero from "@/components/products/ProductHero";
import { heroShotFor } from "@/components/products/shots";
import type { ServiceDocument } from "@/lib/cms/types";
import ProcessTimeline from "./ProcessTimeline";

/**
 * Shared layout for the service pages: hero on the blue stage, feature rows,
 * the process timeline, any page-specific extras, then the closing band.
 */
export default function ServicePage({ data, children }: { data: ServiceDocument; children?: ReactNode }) {
  return (
    <>
      <ProductHero
        icon={data.icon}
        name={data.name}
        headline={data.headline}
        subhead={data.subhead}
        ctaLabel={data.primaryCtaLabel}
        ctaHref={data.primaryCtaHref}
        shot={heroShotFor(data.slug, data.name)}
        parent={{ label: "Services", href: "/services" }}
        secondary={{ label: "All services", href: "/services" }}
        badge={data.flagship ? "Flagship" : undefined}
      />
      <FeatureRows features={data.features} />
      <ProcessTimeline
        eyebrow={data.processEyebrow}
        headline={data.processHeadline}
        sub={data.processSub}
        steps={data.processSteps}
      />
      {children}
      <ProductCTA headline={data.cta.headline} sub={data.cta.sub} buttonLabel={data.cta.buttonLabel} href={data.cta.href} />
    </>
  );
}
