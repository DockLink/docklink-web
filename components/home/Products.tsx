"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductShot from "@/components/ui/ProductShot";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { cn } from "@/components/ui/cn";
import { productLinks } from "@/data/navigation";
import { scrollToY } from "@/lib/smoothScroll";

// Longer benefit lines than the nav uses; name, link and icon come from data/navigation.ts
const details: Record<
  string,
  {
    benefit: string;
    short: string;
    shot: { label: string; path: string; phone?: boolean };
  }
> = {
  "/products/erp": {
    benefit: "Accounting, inventory, HR and payroll on one screen, not four spreadsheets.",
    short: "ERP",
    shot: {
      label: "DocLink ERP, inventory screen",
      path: "public/screens/home-erp.png",
    },
  },
  "/products/pos": {
    benefit: "Retail and restaurant billing with live stock counts and shift closeouts.",
    short: "POS",
    shot: {
      label: "DocLink POS, checkout screen",
      path: "public/screens/home-pos.png",
    },
  },
  "/products/doctor": {
    benefit: "Patient records, appointments and prescriptions from a phone in your pocket.",
    short: "Doctor App",
    shot: {
      label: "Doctor App, today's appointments",
      path: "public/screens/home-doctor.png",
      phone: true,
    },
  },
};

const products = productLinks.map((p) => ({ ...p, ...details[p.href] }));
const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * A product screenshot. In the pinned story every shot sits in the same 16:10 frame so
 * switching never changes the height; stacked on phones, a phone shot shows at phone size.
 */
function Shot({
  product,
  priority,
  framed,
}: {
  product: (typeof products)[number];
  priority?: boolean;
  framed?: boolean;
}) {
  if (product.shot.phone && !framed) {
    return (
      <div className="mx-auto w-full max-w-[240px]">
        <ProductShot device="phone" label={product.shot.label} expectedPath={product.shot.path} />
      </div>
    );
  }
  if (product.shot.phone) {
    return (
      <div className="relative aspect-[16/10] rounded-surface border border-line bg-surface">
        <div className="absolute inset-y-5 left-1/2 aspect-[9/19.5] -translate-x-1/2 sm:inset-y-8">
          <ProductShot device="phone" label={product.shot.label} expectedPath={product.shot.path} />
        </div>
      </div>
    );
  }
  return (
    <ProductShot label={product.shot.label} expectedPath={product.shot.path} ratio="16 / 10" priority={priority} />
  );
}

/**
 * Products as a scroll story (after ramp.com's "Busywork? Sorted." list).
 * Wide screens: the list and screenshot stay pinned while you scroll; each
 * product's line fills as you move through it and the screenshot swaps.
 * Phones and reduced motion: a plain stacked list, nothing pinned.
 */
export default function Products() {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      if (rect.height === 0) return; // pinned layout hidden (phone or reduced motion)
      const travel = rect.height - window.innerHeight;
      const progress = travel > 0 ? clamp(-rect.top / travel) : 0;
      const position = progress * products.length;
      barRefs.current.forEach((bar, i) => {
        if (bar) bar.style.transform = `scaleY(${clamp(position - i)})`;
      });
      setActive(Math.min(products.length - 1, Math.floor(position)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Choosing a product scrolls to its stretch of the story
  const jumpTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const travel = track.offsetHeight - window.innerHeight;
    scrollToY(top + (travel * (i + 0.15)) / products.length);
  };

  // Only one of the two layouts is ever displayed, so the header appears once on screen
  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      <Heading level={2} className="max-w-[18ch]">
        Software built for how you actually work
      </Heading>
      <Link
        href="/products"
        className="inline-flex h-11 shrink-0 items-center gap-1 self-start rounded-control text-sm font-medium text-brand transition-colors duration-(--dur-fast) hover:text-brand-hover active:text-brand-hover sm:self-auto"
      >
        Compare all products
        <ChevronRight aria-hidden className="size-4" strokeWidth={1.75} />
      </Link>
    </div>
  );

  return (
    <Section aria-label="Products" space="none">
      {/* ── Wide screens with motion: pinned story ─────────────────────── */}
      <div
        ref={trackRef}
        className="relative hidden lg:block motion-reduce:lg:hidden"
        style={{ height: `${products.length * 80 + 20}svh` }}
      >
        <div className="sticky top-0 flex h-svh flex-col justify-center gap-12">
          {header}
          <div className="grid w-full grid-cols-12 items-center gap-12">
            <ol className="col-span-5 space-y-2">
              {products.map((p, i) => {
                const Icon = p.icon;
                const isActive = active === i;
                return (
                  <li key={p.href} className="relative pl-7">
                    {/* Progress line: fills as you scroll through this product */}
                    <span
                      aria-hidden
                      className="absolute bottom-2 left-0 top-2 w-0.5 overflow-hidden rounded-full bg-line"
                    >
                      <span
                        ref={(el) => {
                          barRefs.current[i] = el;
                        }}
                        className="block h-full w-full origin-top bg-brand"
                        // Inline transform (not Tailwind's scale-y-*, which uses the separate `scale` property)
                        style={{ transform: "scaleY(0)" }}
                      />
                    </span>
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-current={isActive ? "true" : undefined}
                      className="group flex w-full items-center gap-4 rounded-control py-3 text-left"
                    >
                      <span
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-control transition-colors duration-(--dur-base) ease-standard",
                          isActive ? "bg-brand text-white" : "bg-surface text-subtle group-hover:text-ink group-active:text-ink",
                        )}
                      >
                        <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                      </span>
                      <h3
                        className={cn(
                          "text-2xl font-semibold transition-colors duration-(--dur-base) ease-standard",
                          isActive ? "text-ink" : "text-subtle group-hover:text-ink group-active:text-ink",
                        )}
                      >
                        {p.name}
                      </h3>
                    </button>
                    <div className={cn("accordion-content", isActive && "open")} inert={!isActive}>
                      <div>
                        <p className="max-w-[40ch] pb-1 pl-15 text-base text-muted">{p.benefit}</p>
                        <Link
                          href={p.href}
                          className="mb-3 ml-15 inline-flex h-11 items-center gap-1 text-sm font-medium text-brand transition-colors duration-(--dur-fast) hover:text-brand-hover active:text-brand-hover"
                        >
                          See the {p.short}
                          <ChevronRight aria-hidden className="size-4" strokeWidth={1.75} />
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Screenshots crossfade; inactive ones are hidden from assistive tech */}
            <div className="relative col-span-7 aspect-[16/10]">
              {products.map((p, i) => (
                <div
                  key={p.href}
                  aria-hidden={active !== i}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-(--dur-slow) ease-standard",
                    active === i ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
                  )}
                >
                  <Shot product={p} framed />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Phones, and anyone who prefers reduced motion: stacked ─────── */}
      <div className="py-section lg:hidden motion-reduce:lg:block">
        <div className="scroll-rise">{header}</div>
        <ul className="mt-10 space-y-14 sm:mt-12">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <li
                key={p.href}
                className="scroll-rise lg:grid lg:grid-cols-12 lg:items-center lg:gap-12"
                style={{ "--rise-i": i } as React.CSSProperties}
              >
                {/* Wide screens without motion: text beside its screenshot */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-brand-soft text-brand">
                      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="text-xl font-semibold text-ink sm:text-2xl">{p.name}</h3>
                  </div>
                  <p className="mt-3 max-w-prose text-base text-muted">{p.benefit}</p>
                  <Link
                    href={p.href}
                    className="inline-flex h-11 items-center gap-1 text-sm font-medium text-brand transition-colors duration-(--dur-fast) hover:text-brand-hover active:text-brand-hover"
                  >
                    See the {p.short}
                    <ChevronRight aria-hidden className="size-4" strokeWidth={1.75} />
                  </Link>
                </div>
                <div className="mt-4 lg:col-span-7 lg:mt-0">
                  <Shot product={p} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
