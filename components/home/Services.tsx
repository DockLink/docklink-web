import type { CSSProperties } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { serviceLinks } from "@/data/navigation";

// Longer lines than the nav uses; name, link, icon and flagship flag come from data/navigation.ts
const lines: Record<string, string> = {
  "/services/software": "Bespoke systems scoped around your exact workflow. This is our flagship engagement.",
  "/services/web": "Marketing sites and web apps that convert visitors, not just look finished.",
  "/services/mobile": "iOS and Android from one codebase, with a full native feel.",
};

const stack = ["React", "Next.js", "TypeScript", "Flutter", "React Native", "Node.js", "PostgreSQL", "MongoDB", "AWS", "Tailwind CSS"];

const stagger = (i: number) => ({ "--rise-i": i }) as CSSProperties;

export default function Services() {
  return (
    <Section aria-labelledby="services-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Intro stays in view while the list scrolls past on wide screens */}
        <div className="lg:col-span-5">
          <div className="scroll-rise lg:sticky lg:top-28">
            <Heading level={2} id="services-title">
              Need something custom?
            </Heading>
            <Text variant="lead" className="mt-4">
              When none of our products fit, we design and build one around the way your business already runs.
            </Text>

            <div className="mt-8">
              <p className="text-sm font-medium text-ink">Built with</p>
              <ul aria-label="Technologies we use" className="mt-3 flex flex-wrap gap-2">
                {stack.map((t) => (
                  <li key={t} className="rounded-control border border-line px-2.5 py-1 text-sm text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ul className="border-t border-line lg:col-span-7">
          {serviceLinks.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.href} className="scroll-rise border-b border-line" style={stagger(i)}>
                <Link
                  href={s.href}
                  className="group -mx-3 flex items-start gap-4 sm:items-center rounded-surface px-3 py-6 transition-colors duration-(--dur-fast) ease-standard hover:bg-surface active:bg-surface sm:gap-6 sm:py-8"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-brand-soft text-brand transition-colors duration-(--dur-base) group-hover:bg-brand group-hover:text-white group-active:bg-brand group-active:text-white">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-ink sm:text-xl">{s.name}</h3>
                      {s.flagship && (
                        <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand-ink">
                          Flagship
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-base text-muted">{lines[s.href] ?? s.benefit}</p>
                  </div>
                  <ChevronRight
                    aria-hidden
                    className="size-5 shrink-0 self-center text-subtle transition-[color,transform] duration-(--dur-base) ease-standard group-hover:translate-x-0.5 group-hover:text-brand group-active:translate-x-0.5 group-active:text-brand"
                    strokeWidth={1.75}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
