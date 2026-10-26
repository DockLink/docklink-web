import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";

/** Centred content column: 1200px max, 16px gutter at phone width. */
export function Container({ className, children, ...rest }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-site px-gutter sm:px-6 lg:px-8", className)} {...rest}>
      {children}
    </div>
  );
}

export type SectionTone = "white" | "surface" | "navy";

const tones: Record<SectionTone, string> = {
  white: "bg-white",
  surface: "bg-surface",
  navy: "bg-navy text-on-navy-muted",
};

const spacing = {
  default: "py-section",
  compact: "py-section-sm",
  none: "",
} as const;

type SectionProps = Omit<ComponentProps<"section">, "children"> & {
  tone?: SectionTone;
  space?: keyof typeof spacing;
  /** Set false for full-bleed content that manages its own width */
  contained?: boolean;
  containerClassName?: string;
  children: ReactNode;
};

/** A page band. Pick the tone by content, not to alternate for its own sake. */
export function Section({
  tone = "white",
  space = "default",
  contained = true,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cn(tones[tone], spacing[space], className)} {...rest}>
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  );
}
