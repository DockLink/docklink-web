import type { CSSProperties } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCTA from "@/components/ProductCTA";
import Shot from "@/components/products/Shot";
import { caseShotFor } from "@/components/products/shots";
import { Container, Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { cn } from "@/components/ui/cn";
import type { CaseStudyListing, CaseStudySummary } from "@/lib/cms/types";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/** Stretched link: makes the whole card clickable with a single focus stop */
const stretched =
  "after:absolute after:inset-0 after:z-10 after:rounded-surface focus-visible:outline-none " +
  "focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand";

function Stats({ study, large }: { study: CaseStudySummary; large?: boolean }) {
  const stats = study.stats.slice(0, 2);
  if (!stats.length) return null;
  return (
    // [TBC] Case-study figures are unverified (see TODO.md)
    <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6">
      {stats.map((s) => (
        <div key={s.id} className="flex flex-col-reverse justify-end">
          <dt className="mt-1.5 text-sm text-muted">{s.label}</dt>
          {/* Stat highlight: a permitted use of the brand gradient */}
          <dd
            className={cn(
              "whitespace-nowrap bg-gradient-brand bg-clip-text font-semibold text-transparent tabular-nums",
              large ? "text-4xl xl:text-5xl" : "text-2xl sm:text-3xl",
            )}
          >
            {s.number}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ReadMore({ client }: { client: string }) {
  return (
    <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand">
      Read the {client} story
      <ChevronRight
        aria-hidden
        className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-1 group-active:translate-x-1"
        strokeWidth={1.75}
      />
    </span>
  );
}

export default function CaseStudies({
  listing,
  studies,
}: {
  listing: CaseStudyListing;
  studies: CaseStudySummary[];
}) {
  const [lead, ...rest] = studies;

  return (
    <>
      <section aria-labelledby="case-studies-title" className="bg-white">
        <Container className="pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pt-16">
          {listing.eyebrow && <p className="enter text-sm font-medium text-brand">{listing.eyebrow}</p>}
          <Heading level={1} size="1" id="case-studies-title" className="enter mt-4 max-w-[20ch]" style={delay(80)}>
            {listing.headline}
          </Heading>
          <p className="enter mt-5 max-w-[56ch] text-lg text-muted sm:text-xl" style={delay(200)}>
            {listing.subhead}
          </p>
        </Container>
      </section>

      {lead && (
        <Section space="none" className="pb-section" aria-label="Case studies">
          <div className="grid gap-4 md:gap-6">
            {/* The newest story, as a wide panel above the rest */}
            <article
              className="enter spotlight group relative grid overflow-hidden rounded-surface border border-line bg-surface transition-colors duration-(--dur-base) hover:border-line-strong lg:grid-cols-12"
              style={delay(320)}
            >
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-5 lg:p-12">
                <p className="text-sm text-muted">
                  <span className="font-medium text-ink">{lead.client}</span> · {lead.industry}
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">
                  <Link href={`/case-studies/${lead.slug}`} className={stretched}>
                    {lead.headline}
                  </Link>
                </h2>
                <div className="mt-8">
                  <Stats study={lead} large />
                </div>
                <ReadMore client={lead.client} />
              </div>
              <div className="px-6 pb-6 sm:px-10 sm:pb-10 lg:col-span-7 lg:py-12 lg:pl-0 lg:pr-12">
                <div className="shot-lift">
                  <Shot shot={caseShotFor(lead.slug, lead.client)} priority />
                </div>
              </div>
            </article>

            {rest.length > 0 && (
              <ul className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {rest.map((cs, i) => (
                  <li
                    key={cs.slug}
                    // An odd card out at tablet width spans the row instead of leaving a gap
                    className="scroll-rise md:[&:last-child:nth-child(odd)]:col-span-2 lg:[&:last-child:nth-child(odd)]:col-span-1"
                    style={{ "--rise-i": i % 3 } as CSSProperties}
                  >
                    <article className="spotlight group relative flex h-full flex-col overflow-hidden rounded-surface border border-line bg-white transition-colors duration-(--dur-base) hover:border-line-strong">
                      <div className="border-b border-line bg-surface p-5 sm:p-6">
                        <div className="shot-lift">
                          <Shot shot={caseShotFor(cs.slug, cs.client)} />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6 sm:p-8">
                        <p className="text-sm text-muted">
                          <span className="font-medium text-ink">{cs.client}</span> · {cs.industry}
                        </p>
                        <h2 className="mt-3 flex-1 text-xl font-semibold text-ink">
                          <Link href={`/case-studies/${cs.slug}`} className={stretched}>
                            {cs.headline}
                          </Link>
                        </h2>
                        <div className="mt-6">
                          <Stats study={cs} />
                        </div>
                        <ReadMore client={cs.client} />
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Section>
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
