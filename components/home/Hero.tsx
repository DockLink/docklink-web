import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import ProductShot from "@/components/ui/ProductShot";
import { Container } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { primaryCta } from "@/data/navigation";

// [TBC] These promises are unverified (see TODO.md). They stay until confirmed or struck.
const promises = ["Free 20-minute consultation", "Fixed-price quotes", "Local support in Colombo"];

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      <Container className="pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-24">
        {/* Headline left; supporting copy, actions and promises right, aligned to the headline's last line */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Heading level={1} size="display" id="hero-title" className="enter lg:col-span-7">
            Run your business without the paper trail
          </Heading>

          <div className="enter lg:col-span-5 lg:pb-1.5" style={delay(80)}>
            <p className="max-w-[44ch] text-lg text-muted sm:text-xl">
              ERP, POS and custom software for Sri Lankan businesses moving off paper, Excel and WhatsApp, without
              a six-month rollout.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
              </Button>
              <Button href="/products" variant="secondary" size="lg">
                View products
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <Check aria-hidden className="size-4 text-brand" strokeWidth={2} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The product carries the page. The glow is anchored to the shot so it sits behind it at every width. */}
        <div className="enter relative mt-12 sm:mt-16 lg:mt-20" style={delay(200)}>
          <div aria-hidden className="pointer-events-none absolute -inset-x-[15%] -inset-y-[20%] bg-gradient-hero" />
          <ProductShot
            label="DocLink ERP, main dashboard"
            expectedPath="public/screens/home-hero-erp.png"
            ratio="16 / 10"
            priority
            className="relative"
          />
        </div>
      </Container>
    </section>
  );
}
