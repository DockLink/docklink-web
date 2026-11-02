import type { CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/components/ui/cn";
import type { ServiceProcessStep } from "@/lib/cms/types";

const desktopCols: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

/**
 * How an engagement runs, as a real sequence (so the numbers mean something).
 * The connecting line fills and each number lights up as you scroll through it;
 * with reduced motion it simply shows complete.
 */
export default function ProcessTimeline({
  eyebrow,
  headline,
  sub,
  steps,
}: {
  eyebrow: string;
  headline: string;
  sub: string;
  steps: ServiceProcessStep[];
}) {
  if (!steps.length) return null;
  const n = steps.length;

  return (
    <Section tone="surface" aria-labelledby="process-title">
      <div className="scroll-rise grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7">
          {eyebrow && <p className="text-sm font-medium text-brand">{eyebrow}</p>}
          <Heading level={2} id="process-title" className="mt-3 max-w-[20ch]">
            {headline}
          </Heading>
        </div>
        {sub && <Text className="text-muted lg:col-span-5">{sub}</Text>}
      </div>

      <ol className={cn("process relative mt-12 grid gap-10 sm:mt-16 lg:gap-8", desktopCols[n] ?? "lg:grid-cols-4")}>
        {/* Track and fill: down the left on phones, across the top on desktop */}
        <span
          aria-hidden
          className="absolute bottom-5 left-5 top-5 w-px bg-line-strong lg:bottom-auto lg:left-5 lg:right-(--line-end) lg:top-5 lg:h-px lg:w-auto"
          // Desktop: stop at the last step's number (one column width minus half a node, from the right)
          style={{ "--line-end": `calc((100% - ${n - 1} * 2rem) / ${n} - 1.25rem)` } as CSSProperties}
        >
          <span className="process-fill block size-full origin-top bg-brand lg:origin-left" />
        </span>

        {steps.map((s, i) => (
          <li key={s.id} className="relative pl-16 lg:pl-0 lg:pt-16">
            <span
              className="process-node absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-brand bg-white text-sm font-semibold text-brand tabular-nums"
              style={{ "--i": i, "--n": n } as CSSProperties}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 max-w-prose text-base text-muted">{s.sub}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
