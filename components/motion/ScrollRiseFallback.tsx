"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One-shot rise for .scroll-rise / .scroll-zoom on touch devices that lack
 * CSS scroll timelines. Bails when the visitor prefers reduced motion, has a
 * hover pointer, or the browser already runs animation-timeline: view().
 */
export default function ScrollRiseFallback() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: hover)").matches) return;
    if (CSS.supports("animation-timeline: view()")) return;

    const els = document.querySelectorAll(".scroll-rise, .scroll-zoom");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-inview");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
