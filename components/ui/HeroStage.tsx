import type { CSSProperties, ReactNode } from "react";
import { cn } from "./cn";

/**
 * The navy-to-blue stage a hero's product shot sits on. On load the shot rises
 * onto it; as the visitor scrolls out of the hero the stage opens to the full
 * width of the screen and the shot straightens (see .hero-stage in globals.css).
 * Resting state with reduced motion: a rounded panel with a flat shot.
 */
export default function HeroStage({
  children,
  delayMs = 520,
  innerClassName,
}: {
  children: ReactNode;
  delayMs?: number;
  /** Width of the shot area inside the stage */
  innerClassName?: string;
}) {
  const delay = { "--enter-delay": `${delayMs}ms` } as CSSProperties;
  return (
    <div className="hero-stage relative">
      <div aria-hidden className="enter-glow pointer-events-none absolute inset-0" style={delay}>
        <div className="hero-stage-bg absolute inset-0" />
      </div>
      <div className={cn("relative mx-auto w-full max-w-[65rem] px-7 py-8 sm:px-12 sm:py-12 lg:py-16", innerClassName)}>
        <div className="hero-shot-tilt">
          <div className="enter-shot" style={delay}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
