import Button from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";

/**
 * A page's closing call to action: the navy band used on the homepage
 * (the brand gradient is reserved for hero, buttons and stats).
 */
export default function ProductCTA({
  headline = "Ready to see it in action?",
  sub = "A 20-minute demo is all it takes.",
  buttonLabel = "Book a demo",
  href = "/contact",
}: {
  headline?: string;
  sub?: string;
  buttonLabel?: string;
  href?: string;
}) {
  return (
    <Section tone="navy" aria-labelledby="page-cta-title" className="relative overflow-hidden">
      {/* Faint grid, echoing the spreadsheets the product replaces */}
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
          <Heading level={2} size="1" id="page-cta-title" onNavy className="max-w-[20ch]">
            {headline}
          </Heading>
          <Text variant="lead" onNavy className="mt-4">
            {sub}
          </Text>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <Button href={href} variant="inverse" size="lg">
            {buttonLabel}
          </Button>
        </div>
      </div>
    </Section>
  );
}
