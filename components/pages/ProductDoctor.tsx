import ProductCTA from "@/components/ProductCTA";
import TrustStrip from "@/components/TrustStrip";
import FeatureRows from "@/components/products/FeatureRows";
import ProductHero from "@/components/products/ProductHero";
import { heroShotFor } from "@/components/products/shots";
import type { ProductDocument } from "@/lib/cms/types";

export default function ProductDoctor({ data }: { data: ProductDocument }) {
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
      />
      <FeatureRows features={data.features} />
      <TrustStrip securityFocus={data.trustVariant === "security"} />
      <ProductCTA headline={data.cta.headline} sub={data.cta.sub} buttonLabel={data.cta.buttonLabel} href={data.cta.href} />
    </>
  );
}
