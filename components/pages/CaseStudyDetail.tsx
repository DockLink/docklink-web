import type { CSSProperties } from "react";
import Link from "next/link";
import { Building2, CalendarDays, ChevronRight, MapPin, Quote } from "lucide-react";
import ProductCTA from "@/components/ProductCTA";
import CountUp from "@/components/home/CountUp";
import Shot from "@/components/products/Shot";
import { caseShotFor } from "@/components/products/shots";
import HeroStage from "@/components/ui/HeroStage";
import { Container, Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import type { CaseStudyDocument, CtaFields } from "@/lib/cms/types";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

export default function CaseStudyDetail({ data, cta }: { data: CaseStudyDocument; cta: CtaFields }) {
  const cs = data;
  const meta = [
    { icon: Building2, label: "Industry", value: cs.industry },
    { icon: MapPin, label: "Location", value: cs.location },
    { icon: CalendarDays, label: "Launched", value: cs.date },
  ].filter((m) => m.value);
  const quoteWords = cs.quoteText ? cs.quoteText.split(" ") : [];

  return (
    <>
      <section aria-labelledby="case-title" className="relative overflow-hidden bg-white">
        <Container className="pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pt-16">
          <nav aria-label="Breadcrumb" className="enter">
            <ol className="flex items-center gap-1.5 text-sm text-muted">
              <li>
                <Link href="/case-studies" className="transition-colors duration-(--dur-fast) hover:text-ink active:text-ink">
                  Case studies
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" strokeWidth={1.75} />
              </li>
              <li aria-current="page" className="font-medium text-ink">
                {cs.client}
              </li>
            </ol>
          </nav>

          <Heading level={1} size="1" id="case-title" className="enter mt-6 max-w-[22ch]" style={delay(80)}>
            {cs.headline}
          </Heading>
          <p className="enter mt-5 max-w-[56ch] text-lg text-muted sm:text-xl" style={delay(220)}>
            {cs.subhead}
          </p>

          {meta.length > 0 && (
            <dl className="enter mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm" style={delay(340)}>
              {meta.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon aria-hidden className="size-4 text-subtle" strokeWidth={1.75} />
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-muted">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Container>

        {/* What the client works in every day: the system we built */}
        <HeroStage delayMs={440}>
          <Shot shot={caseShotFor(cs.slug, cs.client)} priority />
        </HeroStage>
      </section>

      {cs.stats.length > 0 && (
        <section aria-label="Results" className="border-b border-line bg-white">
          <Container>
            {/* [TBC] Case-study figures are unverified (see TODO.md) */}
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {cs.stats.map((s, i) => (
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
                  <dd className="whitespace-nowrap bg-gradient-brand bg-clip-text text-3xl font-semibold text-transparent sm:text-5xl">
                    <CountUp value={s.number} />
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

      {cs.sections.length > 0 && (
        <Section aria-label={`The ${cs.client} story`}>
          {/* A reading rail down the left that fills as the story scrolls past */}
          <div className="story relative pl-6 sm:pl-10">
            <div aria-hidden className="absolute inset-y-0 left-0 w-px bg-line">
              <div className="story-fill absolute inset-0 origin-top bg-brand" />
            </div>
            <div className="space-y-14 sm:space-y-20">
              {cs.sections.map((s) => (
                <article key={s.id} className="scroll-rise grid gap-4 lg:grid-cols-12 lg:gap-12">
                  <h2 className="text-2xl font-semibold text-ink lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
                    {s.heading}
                  </h2>
                  <p className="max-w-[65ch] text-lg text-muted lg:col-span-7">{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>
      )}

      {cs.quoteText && (
        <Section tone="surface" aria-label={`What ${cs.client} says`}>
          {/* The quote fills in word by word as it scrolls through the screen, like the homepage statement */}
          <figure className="statement max-w-[52rem]">
            <Quote aria-hidden className="size-8 text-brand" strokeWidth={1.5} />
            {/* [TBC] Named testimonial is unverified (see TODO.md) */}
            <blockquote className="mt-6 text-2xl font-medium text-ink sm:text-3xl lg:text-[2.25rem] lg:leading-[1.25]">
              <p>
                {quoteWords.map((word, i) => (
                  <span key={i} className="statement-word" style={{ "--i": i, "--n": quoteWords.length } as CSSProperties}>
                    {/* Quote marks travel with the first and last words so they fill together */}
                    {i === 0 ? "\u201C" : ""}
                    {word}
                    {i === quoteWords.length - 1 ? "\u201D" : " "}
                  </span>
                ))}
              </p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              {cs.avatarInitials && (
                <span
                  aria-hidden
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white"
                >
                  {cs.avatarInitials}
                </span>
              )}
              <span>
                <span className="block font-medium text-ink">{cs.quoteName}</span>
                {cs.quoteTitle && <span className="mt-0.5 block text-sm text-muted">{cs.quoteTitle}</span>}
              </span>
            </figcaption>
          </figure>
        </Section>
      )}

      <ProductCTA headline={cta.headline} sub={cta.sub} buttonLabel={cta.buttonLabel} href={cta.href} />
    </>
  );
}
