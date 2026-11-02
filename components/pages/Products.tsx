import type { CSSProperties } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCTA from "@/components/ProductCTA";
import TrustStrip from "@/components/TrustStrip";
import ProductIcon from "@/components/icons/ProductIcon";
import Shot from "@/components/products/Shot";
import { heroShotFor } from "@/components/products/shots";
import { Container, Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { cn } from "@/components/ui/cn";
import type { ProductListing, ProductSummary } from "@/lib/cms/types";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/** CMS call-to-action labels may still carry a trailing arrow from the old design */
const clean = (label: string) => label.replace(/\s*[→>]+\s*$/, "");

/**
 * All products: a short intro, then one showcase panel per product (after
 * ramp.com's product panels). The whole panel is the link; hovering it lights
 * a cursor spotlight, lifts the screenshot and nudges the arrow.
 */
export default function Products({ listing, products }: { listing: ProductListing; products: ProductSummary[] }) {
  return (
    <>
      <section aria-labelledby="products-title" className="bg-white">
        <Container className="pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pt-16">
          {listing.eyebrow && (
            <p className="enter text-sm font-medium text-brand">{listing.eyebrow}</p>
          )}
          <Heading level={1} size="1" id="products-title" className="enter mt-4 max-w-[20ch]" style={delay(80)}>
            {listing.headline}
          </Heading>
          <p className="enter mt-5 max-w-[56ch] text-lg text-muted sm:text-xl" style={delay(200)}>
            {listing.subhead}
          </p>
        </Container>
      </section>

      <Section space="none" className="pb-section" aria-label="Product list">
        <ul className="space-y-6 lg:space-y-8">
          {products.map((p, i) => {
            const shot = heroShotFor(p.slug, p.name);
            const flip = i % 2 === 1;
            return (
              <li key={p.slug} className="scroll-rise">
                <article className="spotlight group relative grid overflow-hidden rounded-surface border border-line bg-surface transition-colors duration-(--dur-base) hover:border-line-strong lg:grid-cols-12">
                  <div className={cn("flex flex-col justify-center p-6 sm:p-10 lg:col-span-5 lg:p-12", flip && "lg:order-2")}>
                    <span className="flex size-12 items-center justify-center rounded-control bg-white text-brand shadow-hairline transition-colors duration-(--dur-base) ease-standard group-hover:bg-brand group-hover:text-white">
                      <ProductIcon name={p.icon} className="size-6" />
                    </span>
                    <h2 className="mt-6 text-3xl font-semibold text-ink">
                      {/* Stretched link: the whole panel is clickable, with one focus stop */}
                      <Link
                        href={`/products/${p.slug}`}
                        className="after:absolute after:inset-0 after:z-10 after:rounded-surface focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand"
                      >
                        {p.name}
                      </Link>
                    </h2>
                    <p className="mt-3 max-w-[44ch] text-base text-muted sm:text-lg">{p.listingDesc}</p>
                    <span className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-brand">
                      {clean(p.listingCta)}
                      <ChevronRight
                        aria-hidden
                        className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-1"
                        strokeWidth={1.75}
                      />
                    </span>
                  </div>

                  <div
                    className={cn(
                      "px-6 pb-6 sm:px-10 sm:pb-10 lg:col-span-7 lg:py-12",
                      flip ? "lg:order-1 lg:pl-12 lg:pr-0" : "lg:pl-0 lg:pr-12",
                    )}
                  >
                    <div className="shot-lift">
                      <Shot shot={shot} priority={i === 0} />
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </Section>

      <TrustStrip />

      <ProductCTA
        headline={listing.cta.headline}
        sub={listing.cta.sub}
        buttonLabel={listing.cta.buttonLabel}
        href={listing.cta.href}
      />
    </>
  );
}
