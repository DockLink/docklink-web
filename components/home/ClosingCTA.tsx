import { Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { company } from "@/data/company";
import { primaryCta } from "@/data/navigation";

/** The page's conclusion: a navy band (the brand gradient is reserved for hero, buttons and stats). */
export default function ClosingCTA() {
  return (
    <Section id="contact" tone="navy" aria-labelledby="cta-title" className="relative overflow-hidden">
      {/* Faint grid: echoes the spreadsheet the heading talks about */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(70%_80%_at_80%_50%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 32px",
        }}
      />
      <div className="scroll-rise relative grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-8">
          <Heading level={2} size="1" id="cta-title" onNavy className="max-w-[20ch]">
            Still running the business on spreadsheets?
          </Heading>
          <Text variant="lead" onNavy className="mt-4">
            A 20-minute call is all it takes to work out what you need.
          </Text>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:col-span-4 lg:flex-col lg:items-start">
          <Button href={primaryCta.href} variant="inverse" size="lg">
            {primaryCta.label}
          </Button>
          <a
            href={`mailto:${company.email}`}
            className="inline-flex h-11 items-center gap-2 rounded-control text-sm font-medium text-on-navy-muted transition-colors duration-(--dur-fast) hover:text-white"
          >
            <Mail aria-hidden className="size-4" strokeWidth={1.75} />
            Or email {company.email}
          </a>
        </div>
      </div>
    </Section>
  );
}
