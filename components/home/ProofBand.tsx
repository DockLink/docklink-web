import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { featuredClients } from "@/data/clients";
import { companyStats } from "@/data/company";
import CountUp from "./CountUp";

// [TBC] Figures are unverified (see TODO.md). They come from data/company.ts only.
const stats = [companyStats.projects, companyStats.clients, companyStats.countries];

/**
 * Social proof in one band: who we've worked with, then how much.
 * Replaces the old logo marquee and the separate "Delivery at a glance" section.
 */
export default function ProofBand() {
  return (
    <section aria-labelledby="proof-title" className="border-y border-line bg-white">
      <Container>
        {/* Row 1: clients, each linking to its case study */}
        <div className="flex flex-col gap-5 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-10">
          <p className="text-sm text-muted lg:shrink-0">Trusted by businesses across Sri Lanka</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-12 lg:gap-x-16">
            {featuredClients.map((c) => (
              <li key={c.name}>
                <Link
                  href={`/case-studies/${c.caseStudy}`}
                  className="text-xl font-semibold tracking-tight text-subtle transition-colors duration-(--dur-fast) hover:text-ink sm:text-2xl"
                >
                  {c.name}
                  <span className="sr-only">: read the case study</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Row 2: headline beside the figures */}
        <div className="grid gap-8 border-t border-line py-10 lg:grid-cols-12 lg:items-end lg:gap-12 lg:py-14">
          <Heading level={2} size="3" id="proof-title" className="max-w-[16ch] lg:col-span-4">
            Built for teams near and far
          </Heading>
          <dl className="grid grid-cols-3 lg:col-span-8">
            {stats.map((s, i) => (
              <div key={s.label} className={i > 0 ? "border-l border-line pl-4 sm:pl-8" : "pr-4 sm:pr-8"}>
                <dt className="sr-only">{s.label}</dt>
                {/* Stat highlight: one of the three permitted uses of the brand gradient */}
                <dd className="bg-gradient-brand bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">
                  <CountUp value={s.value} />
                </dd>
                <dd aria-hidden className="mt-2 text-sm text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
