"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { getLenis, setLenis } from "@/lib/smoothScroll";

/**
 * Smooth, eased wheel scrolling for the public site (the fluid feel on
 * codemagic.global). Touch scrolling stays native. Never runs for visitors
 * who prefer reduced motion: they get the browser's own scrolling.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const start = () => {
      if (lenis || mq.matches) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 4), // ease-out quart: quick start, soft landing
        anchors: { offset: -80 }, // land in-page links below the sticky nav
        autoRaf: true,
        stopInertiaOnNavigate: true,
      });
      setLenis(lenis);
    };
    const stop = () => {
      lenis?.destroy();
      lenis = null;
      setLenis(null);
    };

    start();
    const onChange = () => (mq.matches ? stop() : start());
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  // New page: start at the top, without easing in from the old position
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
