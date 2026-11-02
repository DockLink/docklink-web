import type Lenis from "lenis";

// One shared Lenis instance for the public site, so other components
// (the nav, in-page "jump to" buttons) can pause it or scroll with it.
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

/** Scrolls to a page offset, smoothly when Lenis is running, natively otherwise. */
export function scrollToY(y: number) {
  if (instance) {
    instance.scrollTo(y);
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
}
