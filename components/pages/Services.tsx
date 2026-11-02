import type { CSSProperties } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCTA from "@/components/ProductCTA";
import CountUp from "@/components/home/CountUp";
import ProductIcon from "@/components/icons/ProductIcon";
import Shot from "@/components/products/Shot";
import { heroShotFor } from "@/components/products/shots";
import { Container, Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import type { ServiceListing, ServiceSummary } from "@/lib/cms/types";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/** CMS call-to-action labels may still carry a trailing arrow from the old design */
const clean = (label: string) => label.replace(/\s*[→>]+\s*$/, "");

/** Stretched link: makes the whole card clickable with a single focus stop */
const stretched =
  "after:absolute after:inset-0 after:z-10 after:rounded-surface focus-visible:outline-none " +
  "focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand";

function CardArrow({ label }: { label: string }) {
  return (
    <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand">
      {clean(label)}
      <ChevronRight
        aria-hidden
        className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-1"
        strokeWidth={1.75}
      />
    </span>
  );
}

export default function Services({ listing, services }: { listing: ServiceListing; services: ServiceSummary[] }) {
  const flagship = services.find((service) => service.flagship) ?? null;
  const rest = services.filter((service) => service.id !== flagship?.id);

  return (
    <>
      <section aria-labelledby="services-title" className="bg-white">
        <Container className="pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pt-16">
          {listing.eyebrow && <p className="enter text-sm font-medium text-brand">{listing.eyebrow}</p>}
          <Heading level={1} size="1" id="services-title" className="enter mt-4 max-w-[20ch]" style={delay(80)}>
            {listing.headline}
          </Heading>
          <p className="enter mt-5 max-w-[56ch] text-lg text-muted sm:text-xl" style={delay(200)}>
            {listing.subhead}
          </p>
        </Container>
      </section>

      <Section space="none" className="pb-section" aria-label="Service list">
        <div className="grid gap-4 md:gap-6">
          {/* Flagship: the main engagement, as a wide panel above the rest */}
          {flagship && (
            <article className="scroll-rise spotlight group relative grid overflow-hidden rounded-surface border border-line bg-surface transition-colors duration-(--dur-base) hover:border-line-strong lg:grid-cols-12">
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-5 lg:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-control bg-brand text-white shadow-hairline transition-transform duration-(--dur-slow) ease-standard group-hover:-rotate-6">
                    <ProductIcon name={flagship.icon} className="size-6" />
                  </span>
                  {/* The CMS tagline may already say "Flagship"; don't repeat it */}
                  {!/flagship/i.test(flagship.tagline) && (
                    <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand-ink">
                      Flagship
                    </span>
                  )}
                </div>
                <h2 className="mt-6 text-3xl font-semibold text-ink sm:text-4xl">
                  <Link href={`/services/${flagship.slug}`} className={stretched}>
                    {flagship.name}
                  </Link>
                </h2>
                {flagship.tagline && <p className="mt-2 text-sm font-medium text-brand">{flagship.tagline}</p>}
                <p className="mt-3 max-w-[48ch] text-base text-muted sm:text-lg">{flagship.listingDesc}</p>
                <CardArrow label={flagship.listingCta} />
              </div>
              <div className="px-6 pb-6 sm:px-10 sm:pb-10 lg:col-span-7 lg:py-12 lg:pl-0 lg:pr-12">
                <div className="shot-lift">
                  <Shot shot={heroShotFor(flagship.slug, flagship.name)} priority />
                </div>
              </div>
            </article>
          )}

          <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
            {rest.map((s, i) => (
              <li key={s.slug} className="scroll-rise" style={{ "--rise-i": i } as CSSProperties}>
                <article className="spotlight group relative flex h-full flex-col rounded-surface border border-line bg-white p-6 transition-colors duration-(--dur-base) hover:border-line-strong sm:p-8">
                  <span className="flex size-11 items-center justify-center rounded-control bg-brand-soft text-brand transition-colors duration-(--dur-base) ease-standard group-hover:bg-brand group-hover:text-white">
                    <ProductIcon name={s.icon} className="size-5" />
                  </span>
                  <h2 className="mt-6 text-xl font-semibold text-ink">
                    <Link href={`/services/${s.slug}`} className={stretched}>
                      {s.name}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-base text-muted">{s.listingDesc}</p>
                  <CardArrow label={s.listingCta} />
                </article>
              </li>
            ))}

            {/* Not a link: a service that isn't offered yet */}
            <li className="scroll-rise" style={{ "--rise-i": rest.length } as CSSProperties}>
              <div className="flex h-full flex-col rounded-surface border border-dashed border-line-strong p-6 sm:p-8">
                <span className="flex size-11 items-center justify-center rounded-control bg-surface text-subtle">
                  <ProductIcon name="megaphone" className="size-5" />
                </span>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold text-muted">Marketing</h2>
                  <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted">
                    Coming soon
                  </span>
                </div>
                <p className="mt-2 text-base text-muted">We&apos;re expanding into digital marketing services.</p>
              </div>
            </li>
          </ul>
        </div>
      </Section>

      {listing.stats.length > 0 && (
        <section aria-label="Delivery at a glance" className="border-y border-line bg-white">
          <Container>
            {/* [TBC] Figures are unverified (see TODO.md) */}
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {listing.stats.map((s, i) => (
                <div
                  key={s.id}
                  className={[
                    "py-8 sm:py-10",
                    i % 2 === 1 ? "border-l border-line pl-4 sm:pl-8" : "pr-4 sm:pr-8",
                    i > 1 ? "border-t border-line lg:border-t-0" : "",
                    i === 2 ? "lg:border-l lg:pl-8" : "",
                  ].join(" ")}
                >
                  <dt className="sr-only">{s.label}</dt>
                  {/* Stat highlight: a permitted use of the brand gradient */}
                  <dd className="bg-gradient-brand bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">
                    <CountUp value={s.value} />
                  </dd>
                  <dd aria-hidden className="mt-2 text-sm text-muted">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      )}

      <ProductCTA
        headline={listing.cta.headline}
        sub={listing.cta.sub}
        buttonLabel={listing.cta.buttonLabel}
        href={listing.cta.href}
      />
    </>
  );
}
