"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a figure up from zero the first time it scrolls into view.
 * The server renders the final value, so it's correct without JS, for crawlers,
 * and for visitors who prefer reduced motion. Screen readers get the static value.
 */
export default function CountUp({ value, duration = 1200 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    // "20+", "99.9%", "5": prefix, number, suffix
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !match || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, num, suffix] = match;
    const target = Number(num);
    const decimals = num.split(".")[1]?.length ?? 0;
    const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;

    let raf = 0;
    let armed = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!armed) {
          armed = true;
          // Already on screen when the page loads: leave the real value alone
          if (entry.isIntersecting) return io.disconnect();
          el.textContent = format(0);
          return;
        }
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          el.textContent = format(target * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value, duration]);

  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
