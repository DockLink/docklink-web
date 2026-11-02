"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Armchair,
  Building2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Factory,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { cn } from "@/components/ui/cn";

type DeliveredWorkCard = {
  id: string;
  client: string;
  industry: string;
  image: string;
  imageAlt: string;
  href: string;
  stats: [{ value: string; label: string }, { value: string; label: string }];
};

// [TBC] Clients, figures and stock photos are unverified (see TODO.md).
const deliveredWork: DeliveredWorkCard[] = [
  {
    id: "emaar",
    client: "Emaar",
    industry: "Real Estate",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
    imageAlt: "Modern commercial buildings",
    href: "/case-studies/emaar",
    stats: [
      { value: "300", label: "Employees automated" },
      { value: "200 hrs", label: "Saved per month" },
    ],
  },
  {
    id: "street82",
    client: "Street82",
    industry: "Retail",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80",
    imageAlt: "Retail clothing store interior",
    href: "/case-studies/street82",
    stats: [
      { value: "94%", label: "Fewer stock errors" },
      { value: "3 wks", label: "To full deploy" },
    ],
  },
  {
    id: "grid",
    client: "GRID",
    industry: "Technology",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
    imageAlt: "Modern technology office workspace",
    href: "/case-studies/grid",
    stats: [
      { value: "6", label: "Tools replaced" },
      { value: "34%", label: "Revenue growth" },
    ],
  },
  {
    id: "a-design",
    client: "A-Design",
    industry: "Interior Design",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80",
    imageAlt: "Contemporary interior design space",
    href: "/case-studies/a-design",
    stats: [
      { value: "12", label: "Projects tracked" },
      { value: "LKR 0", label: "Lost invoices" },
    ],
  },
  {
    id: "novacare",
    client: "NovaCare",
    industry: "Healthcare",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80",
    imageAlt: "Modern medical clinic corridor",
    href: "/case-studies",
    stats: [
      { value: "4", label: "Clinics live" },
      { value: "2.4k", label: "Appointments / mo" },
    ],
  },
  {
    id: "harbour",
    client: "Harbour Bites",
    industry: "Hospitality",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80",
    imageAlt: "Restaurant dining interior",
    href: "/case-studies",
    stats: [
      { value: "8", label: "Outlets on POS" },
      { value: "40%", label: "Faster checkout" },
    ],
  },
  {
    id: "apex",
    client: "Apex Works",
    industry: "Manufacturing",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=900&q=80",
    imageAlt: "Industrial manufacturing floor",
    href: "/case-studies",
    stats: [
      { value: "12", label: "Departments linked" },
      { value: "8.5k", label: "SKUs tracked" },
    ],
  },
];

const industryIcons: Record<string, LucideIcon> = {
  "Real Estate": Building2,
  Retail: ShoppingBag,
  Technology: Cpu,
  "Interior Design": Armchair,
  Healthcare: Stethoscope,
  Hospitality: UtensilsCrossed,
  Manufacturing: Factory,
};

const railButton =
  "inline-flex size-11 items-center justify-center rounded-control border border-line-strong bg-white text-ink " +
  "transition-colors duration-(--dur-fast) ease-standard hover:border-ink/30 hover:bg-surface " +
  "active:border-ink/30 active:bg-surface " +
  "disabled:pointer-events-none disabled:opacity-40";

/**
 * Recent work as a native scroll-snap row: swipe, trackpad, Shift+wheel and
 * keyboard all scroll it; the buttons step one card at a time.
 */
export default function DeliveredWorkCarousel() {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEnds = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    syncEnds();
    el.addEventListener("scroll", syncEnds, { passive: true });
    window.addEventListener("resize", syncEnds, { passive: true });
    return () => {
      el.removeEventListener("scroll", syncEnds);
      window.removeEventListener("resize", syncEnds);
    };
  }, [syncEnds]);

  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section aria-labelledby="work-title" className="overflow-hidden bg-surface py-section">
      <Container>
        <div className="scroll-rise flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <Heading level={2} id="work-title">
            Recent work
          </Heading>
          <div className="flex items-center gap-2">
            <Link
              href="/case-studies"
              className="mr-2 inline-flex h-11 items-center gap-1 rounded-control text-sm font-medium text-brand transition-colors duration-(--dur-fast) hover:text-brand-hover active:text-brand-hover"
            >
              All case studies
              <ChevronRight aria-hidden className="size-4" strokeWidth={1.75} />
            </Link>
            <button type="button" className={railButton} onClick={() => step(-1)} disabled={atStart} aria-label="Previous case study" aria-controls="work-rail">
              <ChevronLeft aria-hidden className="size-5" strokeWidth={1.75} />
            </button>
            <button type="button" className={railButton} onClick={() => step(1)} disabled={atEnd} aria-label="Next case study" aria-controls="work-rail">
              <ChevronRight aria-hidden className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </Container>

      <ul
        ref={railRef}
        id="work-rail"
        aria-label="Case studies"
        className={cn(
          // Inline padding lines the first card up with the page container
          "mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 sm:mt-12 sm:gap-5",
          "[--rail-pad:var(--spacing-gutter)] sm:[--rail-pad:1.5rem] lg:[--rail-pad:max(2rem,calc((100%-var(--container-site))/2+2rem))]",
          "px-(--rail-pad) scroll-px-(--rail-pad) [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {deliveredWork.map((item, i) => {
          const Icon = industryIcons[item.industry] ?? Building2;
          return (
            <li key={item.id} className="rail-card w-[78vw] max-w-[320px] shrink-0 snap-start sm:w-[320px]">
              <Link
                href={item.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-surface bg-navy shadow-shot"
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="320px"
                  loading={i < 3 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-500 ease-standard group-hover:scale-[1.04] group-active:scale-[1.04]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/5" />

                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-navy/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <Icon aria-hidden className="size-3.5" strokeWidth={1.75} />
                  {item.industry}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <h3 className="text-2xl font-semibold text-white">{item.client}</h3>
                  <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                    {item.stats.map((stat) => (
                      // dt must come first in a <dl>; column-reverse shows the figure on top, aligned across both stats
                      <div key={stat.label} className="flex flex-col-reverse justify-end">
                        <dt className="mt-1 text-xs text-white/80">{stat.label}</dt>
                        <dd className="text-2xl font-semibold leading-none text-white tabular-nums">{stat.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
