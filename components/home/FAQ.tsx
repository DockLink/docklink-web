"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/components/ui/cn";
import { primaryCta } from "@/data/navigation";

// [TBC] Timelines, warranty and countries are unverified (see TODO.md).
const faqs = [
  {
    q: "Do you build fully custom software?",
    a: "Yes. Custom software is our core offering. We scope, design and build systems tailored to your exact processes. Nothing off the shelf.",
  },
  {
    q: "How long does a typical project take?",
    a: "A POS system typically takes 6–10 weeks. A full ERP rolls out in 4–6 months. We give you a fixed timeline in your proposal, and we hold to it.",
  },
  {
    q: "Do you support us after launch?",
    a: "Every project ships with a 30-day warranty. Most clients stay on a monthly retainer covering updates, bug fixes and ongoing feature work.",
  },
  {
    q: "What's your pricing model?",
    a: "We quote fixed-price projects for well-scoped work. For ongoing builds and retainers, we offer monthly plans. No time-and-materials surprises.",
  },
  {
    q: "Can you integrate with our existing tools?",
    a: "Yes. We regularly connect with accounting software, payment gateways, e-commerce platforms and legacy systems via REST and SOAP APIs.",
  },
  {
    q: "Do you work with businesses outside Sri Lanka?",
    a: "We do. We've delivered projects in the UAE, UK, Australia and Southeast Asia. Our team works async-first and across time zones.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section tone="surface" aria-labelledby="faq-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="scroll-rise lg:sticky lg:top-28">
            <Heading level={2} id="faq-title">
              Questions we hear first
            </Heading>
            <Text className="mt-4 text-muted">Something else on your mind? Ask us on a free call.</Text>
            <Button href={primaryCta.href} variant="secondary" className="mt-6">
              {primaryCta.label}
            </Button>
          </div>
        </div>

        <ul className="divide-y divide-line border-y border-line lg:col-span-8">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <li key={faq.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex min-h-11 w-full items-center justify-between gap-6 py-5 text-left text-base font-medium text-ink transition-colors duration-(--dur-fast) hover:text-brand sm:text-lg"
                  >
                    {faq.q}
                    <span
                      aria-hidden
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-(--dur-base) ease-standard",
                        isOpen ? "rotate-45 border-brand bg-brand text-white" : "border-line-strong bg-white text-muted group-hover:border-brand/40",
                      )}
                    >
                      <Plus className="size-4" strokeWidth={1.75} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={cn("accordion-content", isOpen && "open")}
                  inert={!isOpen}
                >
                  <div>
                    <p className="max-w-prose pb-6 pr-14 text-base text-ink-2">{faq.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
