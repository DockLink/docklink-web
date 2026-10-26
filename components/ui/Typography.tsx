import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";

export type HeadingSize = "display" | "1" | "2" | "3" | "4";

// Mobile-first: each size steps up at sm / lg. All headings are Geist 600, sentence case.
const headingSizes: Record<HeadingSize, string> = {
  display: "text-4xl sm:text-5xl lg:text-6xl",
  "1": "text-3xl sm:text-4xl lg:text-5xl",
  "2": "text-3xl lg:text-4xl",
  "3": "text-xl sm:text-2xl",
  "4": "text-lg",
};

const defaultSize: Record<1 | 2 | 3 | 4, HeadingSize> = { 1: "1", 2: "2", 3: "3", 4: "4" };

type HeadingProps = Omit<ComponentProps<"h2">, "children"> & {
  /** Document outline level. Keep levels in order; style with `size`. */
  level: 1 | 2 | 3 | 4;
  size?: HeadingSize;
  onNavy?: boolean;
  children: ReactNode;
};

export function Heading({ level, size, onNavy, className, children, ...rest }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag
      className={cn(
        "font-display font-semibold",
        headingSizes[size ?? defaultSize[level]],
        onNavy ? "text-on-navy" : "text-ink",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export type TextVariant = "lead" | "body" | "small";

const textVariants: Record<TextVariant, string> = {
  lead: "text-lg sm:text-xl text-muted",
  body: "text-base text-ink-2",
  small: "text-sm text-muted",
};

type TextProps = Omit<ComponentProps<"p">, "children"> & {
  variant?: TextVariant;
  as?: "p" | "span" | "div";
  onNavy?: boolean;
  children: ReactNode;
};

export function Text({ variant = "body", as: Tag = "p", onNavy, className, children, ...rest }: TextProps) {
  return (
    <Tag className={cn(textVariants[variant], onNavy && "text-on-navy-muted", "max-w-prose", className)} {...rest}>
      {children}
    </Tag>
  );
}
