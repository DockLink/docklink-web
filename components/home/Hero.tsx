import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import ProductShot from "@/components/ui/ProductShot";
import { Container } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { primaryCta } from "@/data/navigation";

// [TBC] These promises are unverified (see TODO.md). They stay until confirmed or struck.
const promises = ["Free 20-minute consultation", "Fixed-price quotes", "Local support in Colombo"];

// Headline lines, each revealed in turn. On phones each line can wrap; the mask still works.
const headline = ["Run your business without", "the paper trail"];

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/*
  Load sequence (one moment, then stillness):
    0–200ms    headline lines slide up from their masks
    300ms      supporting line rises
    420ms      actions and promises rise
    520ms      product shot tilts up and settles flat, glow fades in behind it
*/
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      <Container className="pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-20">
        <Heading level={1} size="display" id="hero-title" className="max-w-[20ch]">
          {headline.map((line, i) => (
            <span key={line} className="enter-line">
              {/* Trailing space keeps the sentence intact for screen readers and copy-paste */}
              <span style={delay(i * 120)}>
                {line}
                {i < headline.length - 1 ? " " : ""}
              </span>
            </span>
          ))}
        </Heading>

        <p className="enter mt-6 max-w-[52ch] text-lg text-muted sm:mt-8 sm:text-xl" style={delay(300)}>
          ERP, POS and custom software for Sri Lankan businesses moving off paper, Excel and WhatsApp, without a
          six-month rollout.
        </p>

        <div
          className="enter mt-8 flex flex-col gap-6 sm:mt-10 lg:flex-row lg:items-center lg:gap-10"
          style={delay(420)}
        >
          <div className="flex flex-wrap gap-3">
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
            </Button>
            <Button href="/products" variant="secondary" size="lg">
              View products
            </Button>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <Check aria-hidden className="size-4 text-brand" strokeWidth={2} />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* The product carries the page. Glow is anchored to the shot so it sits behind it at every width. */}
        <div className="relative mt-12 sm:mt-16">
          <div
            aria-hidden
            className="enter-glow pointer-events-none absolute -inset-x-[15%] -inset-y-[20%] bg-gradient-hero"
            style={delay(520)}
          />
          <div className="enter-shot relative" style={delay(520)}>
            <ProductShot
              label="DocLink ERP, main dashboard"
              expectedPath="public/screens/home-hero-erp.png"
              ratio="16 / 10"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
