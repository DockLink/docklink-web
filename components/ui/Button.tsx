import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control font-medium whitespace-nowrap select-none " +
  "transition-[background-color,border-color,color,filter] duration-(--dur-fast) ease-standard " +
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  // Gradient is reserved for the primary action (brief: buttons, hero bg, stat highlights)
  primary: "bg-gradient-brand text-white shadow-hairline hover:brightness-110 active:brightness-95",
  secondary: "border border-line-strong bg-white text-ink hover:border-ink/30 hover:bg-surface",
  ghost: "text-brand hover:bg-brand-soft hover:text-brand-hover",
  // For use on navy bands
  inverse: "bg-white text-navy hover:bg-white/90",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-4 text-sm", // 44px: minimum touch target
  lg: "h-12 px-5 text-base",
};

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Lucide icon (or any node) shown before / after the label */
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], variant === "ghost" && "px-3", className);
}

export default function Button(props: AsLink | AsButton) {
  const { variant, size, iconStart, iconEnd, className, children, ...rest } = props;
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {iconStart}
      <span>{children}</span>
      {iconEnd}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchor } = rest as AsLink;
    // Internal routes use client navigation; mailto:, tel: and external URLs use a plain <a>
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} className={classes} {...anchor}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchor}>
        {content}
      </a>
    );
  }

  const { type = "button", ...button } = rest as AsButton;
  return (
    <button type={type} className={classes} {...button}>
      {content}
    </button>
  );
}
