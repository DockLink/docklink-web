import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import type { CaseStudySummary } from "@/lib/cms/types";

/** One related case study as a single wide link card with a cursor spotlight. */
export default function CaseStudyCard({ study }: { study: CaseStudySummary }) {
  const stats = study.stats.slice(0, 2);

  return (
    <Section tone="surface" space="compact" aria-label="Related case study">
      <Link
        href={`/case-studies/${study.slug}`}
        className="spotlight group scroll-rise block rounded-surface border border-line bg-white p-6 transition-colors duration-(--dur-fast) hover:border-line-strong sm:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-sm text-muted">{study.industry} case study</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">{study.headline}</h2>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand">
              Read the {study.client} story
              <ChevronRight
                aria-hidden
                className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </span>
          </div>
          {stats.length > 0 && (
            <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              {stats.map((s) => (
                <div key={s.id} className="flex flex-col-reverse justify-end">
                  <dt className="mt-2 text-sm text-muted">{s.label}</dt>
                  {/* Stat highlight: a permitted use of the brand gradient */}
                  <dd className="bg-gradient-brand bg-clip-text text-4xl font-semibold text-transparent tabular-nums">
                    {s.number}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Link>
    </Section>
  );
}
