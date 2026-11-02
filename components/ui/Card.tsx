import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "./cn";

type CardProps = {
  /** Makes the whole card a link. Hover and focus change the border only (no lift). */
  href?: string;
  tone?: "white" | "surface";
  padding?: "md" | "lg";
  as?: "div" | "article" | "li";
  className?: string;
  children: ReactNode;
};

const paddings = { md: "p-5 sm:p-6", lg: "p-6 sm:p-8" };

export default function Card({ href, tone = "white", padding = "md", as: Tag = "div", className, children }: CardProps) {
  const classes = cn(
    "block rounded-surface border border-line",
    tone === "white" ? "bg-white" : "bg-surface",
    paddings[padding],
    href && "transition-colors duration-(--dur-fast) ease-standard hover:border-line-strong hover:bg-surface/60 active:border-line-strong active:bg-surface/60",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <Tag className={classes}>{children}</Tag>;
}
