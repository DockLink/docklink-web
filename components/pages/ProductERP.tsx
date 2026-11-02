"use client";

import { useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import CaseStudyCard from "@/components/CaseStudyCard";
import ProductCTA from "@/components/ProductCTA";
import TrustStrip from "@/components/TrustStrip";
import ProductIcon from "@/components/icons/ProductIcon";
import ProductHero from "@/components/products/ProductHero";
import Shot from "@/components/products/Shot";
import { heroShotFor, shotForVisual } from "@/components/products/shots";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/components/ui/cn";
import type { CaseStudySummary, ProductDocument, ProductModule, ProductModuleGroup } from "@/lib/cms/types";
import { scrollToY } from "@/lib/smoothScroll";

const cardBase =
  "spotlight group flex h-full w-full flex-col rounded-surface border border-line bg-white p-6 text-left " +
  "transition-colors duration-(--dur-base) ease-standard";

/** One module. Modules with a detail write-up open it below; others are plain cards. */
function ModuleCard({ module, onOpen }: { module: ProductModule; onOpen: (slug: string) => void }) {
  const body = (
    <>
      <span className="flex size-11 items-center justify-center rounded-control bg-brand-soft text-brand transition-colors duration-(--dur-base) ease-standard group-hover:bg-brand group-hover:text-white">
        <ProductIcon name={module.icon} className="size-5" />
      </span>
      <h4 className="mt-5 text-lg font-semibold text-ink">{module.name}</h4>
      <p className="mt-1 flex-1 text-base text-muted">{module.benefit}</p>
    </>
  );

  if (!module.detail) return <div className={cardBase}>{body}</div>;

  return (
    <button
      type="button"
      onClick={() => onOpen(module.slug)}
      aria-controls={`module-${module.slug}`}
      className={cn(cardBase, "hover:border-line-strong")}
    >
      {body}
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
        See how it works
        <ChevronRight
          aria-hidden
          className="size-4 transition-transform duration-(--dur-base) ease-standard group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      </span>
    </button>
  );
}

function ModuleGroup({ group, onOpen }: { group: ProductModuleGroup; onOpen: (slug: string) => void }) {
  return (
    <div className="grid gap-8 border-t border-line py-section-sm first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-12">
      {/* Group intro stays beside its modules while they scroll past on wide screens */}
      <div className="lg:col-span-4">
        <div className="scroll-rise lg:sticky lg:top-24">
          {group.label && <p className="text-sm font-medium text-brand">{group.label}</p>}
          <Heading level={3} size="2" className="mt-3">
            {group.title}
          </Heading>
          <Text className="mt-3 text-muted">{group.intro}</Text>
        </div>
      </div>
      <ul className={cn("grid gap-4 sm:grid-cols-2 lg:col-span-8", group.columns === 3 && "xl:grid-cols-3")}>
        {group.modules.map((m, i) => (
          <li key={m.id} className="scroll-rise" style={{ "--rise-i": i % 3 } as React.CSSProperties}>
            <ModuleCard module={m} onOpen={onOpen} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductERP({
  data,
  relatedCaseStudy,
}: {
  data: ProductDocument;
  relatedCaseStudy: CaseStudySummary | null;
}) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const toggle = (slug: string) =>
    setExpanded((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]));
  const detailedModules = data.moduleGroups.flatMap((group) => group.modules.filter((item) => item.detail));

  // From a module card: open its detail and bring it into view
  const openModule = (slug: string) => {
    setExpanded((p) => (p.includes(slug) ? p : [...p, slug]));
    requestAnimationFrame(() => {
      const el = document.getElementById(`module-${slug}`);
      if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY - 96);
      el?.querySelector("button")?.focus({ preventScroll: true });
    });
  };

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

      {data.moduleGroups.length > 0 && (
        <Section tone="surface" aria-labelledby="modules-title">
          <Heading level={2} id="modules-title" className="scroll-rise max-w-[22ch]">
            Every module your business runs on
          </Heading>
          <div className="mt-12 sm:mt-16">
            {data.moduleGroups.map((group) => (
              <ModuleGroup key={group.id} group={group} onOpen={openModule} />
            ))}
          </div>
        </Section>
      )}

      {detailedModules.length > 0 && (
        <Section aria-labelledby="details-title">
          <Heading level={2} id="details-title" className="scroll-rise">
            How each module works
          </Heading>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {detailedModules.map((item) => {
              const open = expanded.includes(item.slug);
              const detail = item.detail!;
              return (
                <li key={item.id} id={`module-${item.slug}`}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(item.slug)}
                      aria-expanded={open}
                      aria-controls={`module-${item.slug}-detail`}
                      className="group flex min-h-11 w-full items-center gap-4 py-5 text-left"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-control bg-brand-soft text-brand transition-colors duration-(--dur-base) group-hover:bg-brand group-hover:text-white">
                        <ProductIcon name={item.icon} className="size-5" />
                      </span>
                      <span className="flex-1 text-lg font-medium text-ink transition-colors duration-(--dur-fast) group-hover:text-brand">
                        {item.name}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-(--dur-base) ease-standard",
                          open
                            ? "rotate-45 border-brand bg-brand text-white"
                            : "border-line-strong bg-white text-muted group-hover:border-brand/40",
                        )}
                      >
                        <Plus className="size-4" strokeWidth={1.75} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`module-${item.slug}-detail`}
                    role="region"
                    aria-label={`${item.name} details`}
                    className={cn("accordion-content", open && "open")}
                    inert={!open}
                  >
                    <div>
                      <div className="pb-10 pt-2">
                        <p className="text-xl font-semibold text-ink">{detail.title}</p>
                        <p className="mt-2 max-w-prose text-base text-muted">{detail.sub}</p>
                        <div className="mt-8 space-y-10">
                          {detail.blocks.map((block) => (
                            <div key={block.id} className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
                              <div className={cn("md:col-span-7", block.side === "right" && "md:order-2")}>
                                <Shot shot={shotForVisual(block.visualKey)} />
                              </div>
                              <p className="max-w-prose text-base text-ink-2 md:col-span-5">{block.caption}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      <TrustStrip securityFocus={data.trustVariant === "security"} />
      {relatedCaseStudy ? <CaseStudyCard study={relatedCaseStudy} /> : null}
      <ProductCTA headline={data.cta.headline} sub={data.cta.sub} buttonLabel={data.cta.buttonLabel} href={data.cta.href} />
    </>
  );
}
