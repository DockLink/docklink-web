"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type DeliveredWorkCard = {
  id: string;
  client: string;
  industry: string;
  image: string;
  imageAlt: string;
  href: string;
  stats: [{ value: string; label: string }, { value: string; label: string }];
};

const deliveredWork: DeliveredWorkCard[] = [
  {
    id: "emaar",
    client: "Emaar",
    industry: "Real Estate",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=900&q=80",
    imageAlt: "Industrial manufacturing floor",
    href: "/case-studies",
    stats: [
      { value: "12", label: "Departments linked" },
      { value: "8.5k", label: "SKUs tracked" },
    ],
  },
];

function IndustryIcon({ industry }: { industry: string }) {
  const common = "w-3 h-3 shrink-0 opacity-90";
  switch (industry) {
    case "Real Estate":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
        </svg>
      );
    case "Retail":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case "Technology":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "Interior Design":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h10M4 17h7" />
        </svg>
      );
    case "Healthcare":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      );
    case "Hospitality":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M5 10V6a1 1 0 011-1h12a1 1 0 011 1v4M4 10v10h16V10" />
        </svg>
      );
    default:
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m5-11h4" />
        </svg>
      );
  }
}

export default function DeliveredWorkCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const loopingRef = useRef(false);
  const setWidthRef = useRef(0);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    scrollLeft: number;
    moved: boolean;
  }>({ active: false, startX: 0, scrollLeft: 0, moved: false });

  const count = deliveredWork.length;
  const loop = [...deliveredWork, ...deliveredWork, ...deliveredWork];

  const measureSetWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.children.length < count * 2) return 0;
    const first = el.children[0] as HTMLElement;
    const mid = el.children[count] as HTMLElement;
    return mid.offsetLeft - first.offsetLeft;
  }, [count]);

  const syncActive = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    if (!cards.length) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const center = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(((best % count) + count) % count);
  }, [count]);

  const handleLoopScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || loopingRef.current) return;

    const setWidth = setWidthRef.current || measureSetWidth();
    if (!setWidth) return;
    setWidthRef.current = setWidth;

    if (el.scrollLeft <= setWidth * 0.15) {
      loopingRef.current = true;
      el.scrollLeft += setWidth;
      loopingRef.current = false;
    } else if (el.scrollLeft >= setWidth * 1.85) {
      loopingRef.current = true;
      el.scrollLeft -= setWidth;
      loopingRef.current = false;
    }

    syncActive();
  }, [measureSetWidth, syncActive]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const init = () => {
      const setWidth = measureSetWidth();
      if (!setWidth) return;
      setWidthRef.current = setWidth;
      el.scrollLeft = setWidth;
      syncActive();
    };

    const onResize = () => {
      setWidthRef.current = measureSetWidth();
      handleLoopScroll();
    };

    const raf = requestAnimationFrame(init);
    el.addEventListener("scroll", handleLoopScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", handleLoopScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [handleLoopScroll, measureSetWidth, syncActive]);

  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    // Target the middle copy
    const card = el.children[count + index] as HTMLElement | undefined;
    if (!card) return;
    const left = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none";
    el.style.scrollBehavior = "auto";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    const drag = dragRef.current;
    if (!el || !drag.active) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 4) drag.moved = true;
    el.scrollLeft = drag.scrollLeft - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    const drag = dragRef.current;
    if (!el || !drag.active) return;
    drag.active = false;
    el.releasePointerCapture(e.pointerId);
    el.style.cursor = "grab";
    el.style.scrollSnapType = "";
    el.style.scrollBehavior = "";
    handleLoopScroll();
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-[#F7F8FA]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #E5E7EB 1px, transparent 1px), linear-gradient(45deg, #E5E7EB 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mb-12 px-6 max-w-7xl mx-auto">
        <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8] mb-4">
          Case Studies
        </p>
        <h2 className="font-display font-black text-[31px] sm:text-[40px] xl:text-[48px] leading-[1.1] tracking-[-0.02em] text-slate-900">
          Real Results
        </h2>
      </div>

      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
        }}
      >
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          className="relative flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 px-[max(1.5rem,calc((100%-1280px)/2+1.5rem))] cursor-grab select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loop.map((item, i) => (
            <Link
              key={`${item.id}-${i}`}
              href={item.href}
              draggable={false}
              // Only the middle copy is reachable by keyboard / screen readers
              aria-hidden={i < count || i >= count * 2 || undefined}
              tabIndex={i < count || i >= count * 2 ? -1 : undefined}
              className="group relative shrink-0 w-[280px] sm:w-[300px] md:w-[320px] h-[440px] md:h-[480px] rounded-[22px] overflow-hidden snap-center shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="320px"
                draggable={false}
                className="object-cover pointer-events-none transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-sm text-white text-[11px] font-medium">
                  <IndustryIcon industry={item.industry} />
                  {item.industry}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="font-display font-bold text-[26px] sm:text-[28px] text-white leading-tight mb-5">
                  {item.client}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {item.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="font-display font-black text-[22px] sm:text-[24px] text-white leading-none mb-1">
                        {stat.value}
                      </div>
                      <div className="text-[12px] text-white/75 leading-snug">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="relative mt-10 flex flex-col items-center gap-5">
        <div className="flex items-center gap-2">
          {deliveredWork.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to ${item.client}`}
              aria-current={active === i ? "true" : undefined}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i
                  ? "w-7 bg-[#1D4ED8]"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <Link
          href="/case-studies"
          className="text-[14px] font-semibold text-slate-700 hover:text-[#1D4ED8] transition-colors inline-flex items-center gap-1.5"
        >
          View all case studies
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
