import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";

type Case = { id: string; client: string; industry: string; headline: string; stats: { number: string; label: string }[] };

/**
 * Case studies relevant to a service, as spotlight link cards.
 * [TBC] Figures are unverified (see TODO.md).
 */
export default function ServiceCaseCards({ title, cases }: { title: string; cases: Case[] }) {
  return (
    <Section aria-labelledby="service-cases-title">
      <Heading level={2} id="service-cases-title" className="scroll-rise max-w-[22ch]">
        {title}
      </Heading>
      <ul className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2 md:gap-6">
        {cases.map((cs, i) => (
          <li key={cs.id} className="scroll-rise" style={{ "--rise-i": i } as React.CSSProperties}>
            <Link
              href={`/case-studies/${cs.id}`}
              className="spotlight group flex h-full flex-col rounded-surface border border-line bg-white p-6 transition-colors duration-(--dur-base) hover:border-line-strong sm:p-8"
            >
              <p className="text-sm text-muted">{cs.industry} case study</p>
              <h3 className="mt-3 text-xl font-semibold text-ink sm:text-2xl">{cs.headline}</h3>
              <dl className="mt-6 grid grid-cols-2 gap-6 border-t border-line pt-6">
                {cs.stats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse justify-end">
                    <dt className="mt-2 text-sm text-muted">{s.label}</dt>
                    {/* Stat highlight: a permitted use of the brand gradient */}
                    <dd className="bg-gradient-brand bg-clip-text text-3xl font-semibold text-transparent tabular-nums">
                      {s.number}
                    </dd>
                  </div>
                ))}
              </dl>
              <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-brand">
                Read the {cs.client} story
                <ChevronRight
                  aria-hidden
                  className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-1 group-active:translate-x-1"
                  strokeWidth={1.75}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
