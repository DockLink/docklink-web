import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import HeroStage from "@/components/ui/HeroStage";
import ProductShot from "@/components/ui/ProductShot";
import { Container } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { primaryCta } from "@/data/navigation";

// [TBC] These promises are unverified (see TODO.md). They stay until confirmed or struck.
const promises = ["Free 20-minute consultation", "Fixed-price quotes", "Local support in Colombo"];

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/*
  Load sequence (one moment, then stillness):
    0ms        headline rises
    300ms      supporting line rises
    420ms      actions and promises rise
    520ms      product shot rises onto the stage, stage fades in behind it
  Then scrolling takes over: the stage opens to full width (see .hero-stage in globals.css).
*/
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      <Container className="pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pt-20">
        <div className="flex w-full min-w-0 flex-col">
          <Heading
            level={1}
            size="display"
            id="hero-title"
            className="enter min-w-0 max-w-full sm:max-w-[18ch]"
          >
            Run your business without <span className="block">the paper trail</span>
          </Heading>

          <p
            className="enter mt-6 min-w-0 w-full max-w-[52ch] break-words text-lg text-muted sm:mt-8 sm:text-xl"
            style={{ ...delay(300), textWrap: "wrap" }}
          >
            ERP, POS and custom software for Sri Lankan businesses moving off paper, Excel and WhatsApp, without a
            six-month rollout.
          </p>

          <div
            className="enter mt-8 flex min-w-0 flex-col gap-6 sm:mt-10 lg:flex-row lg:items-center lg:gap-10"
            style={delay(420)}
          >
            <div className="flex min-w-0 flex-wrap gap-3">
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
              </Button>
              <Button href="/products" variant="secondary" size="lg">
                View products
              </Button>
            </div>
            <ul className="flex min-w-0 flex-col gap-2 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <Check aria-hidden className="size-4 text-brand" strokeWidth={2} />
                  {p}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </Container>

      {/* The product carries the page. It sits on a navy-to-blue stage that, as you
          scroll, opens to the full width of the screen while the shot straightens. */}
      <HeroStage>
        <ProductShot
          label="DocLink ERP, main dashboard"
          expectedPath="public/screens/home-hero-erp.png"
          ratio="16 / 10"
          priority
        />
      </HeroStage>
    </section>
  );
}
