import type { CSSProperties } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductIcon from "@/components/icons/ProductIcon";
import Button from "@/components/ui/Button";
import HeroStage from "@/components/ui/HeroStage";
import { Container } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import Shot from "./Shot";
import type { ShotSpec } from "./shots";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/**
 * Product page hero, matching the home hero: headline and actions, then the
 * product on the blue stage that opens to full width as you scroll.
 */
export default function ProductHero({
  icon,
  name,
  headline,
  subhead,
  ctaLabel,
  ctaHref,
  shot,
  parent = { label: "Products", href: "/products" },
  secondary = { label: "Compare products", href: "/products" },
  badge,
}: {
  icon: string;
  name: string;
  headline: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
  shot: ShotSpec;
  /** Breadcrumb parent: Products or Services */
  parent?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Small tag after the name, e.g. "Flagship" */
  badge?: string;
}) {
  return (
    <section aria-labelledby="product-title" className="relative overflow-hidden bg-white">
      <Container className="pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pt-16">
        {/* Where you are, in place of a decorative pill */}
        <nav aria-label="Breadcrumb" className="enter">
          <ol className="flex items-center gap-1.5 text-sm text-muted">
            <li>
              <Link href={parent.href} className="transition-colors duration-(--dur-fast) hover:text-ink">
                {parent.label}
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5" strokeWidth={1.75} />
            </li>
            <li aria-current="page" className="flex items-center gap-1.5 font-medium text-ink">
              <ProductIcon name={icon} className="size-4 text-brand" />
              {name}
              {badge && (
                <span className="ml-1 rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand-ink">{badge}</span>
              )}
            </li>
          </ol>
        </nav>

        <Heading level={1} size="1" id="product-title" className="enter mt-6 max-w-[20ch]" style={delay(80)}>
          {headline}
        </Heading>
        <p className="enter mt-5 max-w-[52ch] text-lg text-muted sm:text-xl" style={delay(220)}>
          {subhead}
        </p>
        <div className="enter mt-8 flex flex-wrap gap-3" style={delay(340)}>
          <Button href={ctaHref} size="lg">
            {ctaLabel}
          </Button>
          <Button href={secondary.href} variant="secondary" size="lg">
            {secondary.label}
          </Button>
        </div>
      </Container>

      <HeroStage delayMs={440} innerClassName={shot.phone ? "max-w-[24rem]" : undefined}>
        <Shot shot={shot} priority />
      </HeroStage>
    </section>
  );
}
