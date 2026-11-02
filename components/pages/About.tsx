import type { CSSProperties } from "react";
import { Building2, CalendarDays, MapPin, Rocket, Store, Users } from "lucide-react";
import ProductCTA from "@/components/ProductCTA";
import CountUp from "@/components/home/CountUp";
import ProductShot from "@/components/ui/ProductShot";
import { Container, Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { company, companyStats } from "@/data/company";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

// [TBC] Team members are unverified (see TODO.md)
const team = [
  {
    initials: "NS",
    name: "Nuwan Samarasinghe",
    role: "Founder & CEO",
    bio: "Former enterprise systems consultant. Has seen every flavour of Sri Lankan business process still running on paper.",
  },
  {
    initials: "PT",
    name: "Priya Thilakaratne",
    role: "Head of Engineering",
    bio: "10 years building bespoke systems for manufacturing, retail, and healthcare clients across the region.",
  },
  {
    initials: "RJ",
    name: "Ravindu Jayasekara",
    role: "Head of Delivery",
    bio: "Keeps every project on schedule. Runs discovery sprints, manages stakeholder sign-offs, and chases the final 10%.",
  },
  {
    initials: "AF",
    name: "Amali Fernando",
    role: "Client Success Lead",
    bio: "Handles onboarding, training, and every support ticket. The reason clients stay long after go-live.",
  },
];

// [TBC] Figures are unverified (see TODO.md)
const stats = [
  { number: companyStats.years.value, label: "Years building for Sri Lankan businesses" },
  { number: companyStats.clients.value, label: "Clients across retail, healthcare, and services" },
  { number: companyStats.projects.value, label: "Projects delivered end-to-end" },
  { number: companyStats.uptime.value, label: "Uptime across all hosted platforms" },
];

const principles = [
  { icon: Store, label: "SME-first", sub: "Pricing and scope sized for real Sri Lankan businesses" },
  { icon: Rocket, label: "Fast deploys", sub: "Weeks to live, not quarters — no drawn-out enterprise timelines" },
  { icon: Users, label: "Same team", sub: "The team that built your system handles your support" },
];

const storyLine = "We started because we saw the same spreadsheet across a hundred businesses.";

export default function About() {
  const words = storyLine.split(" ");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="about-title" className="bg-white">
        <Container className="pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pt-16">
          <p className="enter text-sm font-medium text-brand">About DocLink</p>
          <Heading level={1} size="1" id="about-title" className="enter mt-4 max-w-[18ch]" style={delay(80)}>
            Built for the businesses running on paper
          </Heading>
          <p className="enter mt-5 max-w-[56ch] text-lg text-muted sm:text-xl" style={delay(200)}>
            DocLink Technologies builds ERP, POS, and custom software for Sri Lankan SMEs — companies where the owner is
            still the system.
          </p>
          <dl className="enter mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm" style={delay(320)}>
            {[
              { icon: Building2, label: "Company", value: company.legalName },
              { icon: CalendarDays, label: "Founded", value: `Est. ${company.founded}` },
              { icon: MapPin, label: "Based in", value: `${company.address.city}, ${company.address.country}` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon aria-hidden className="size-4 text-subtle" strokeWidth={1.75} />
                <dt className="sr-only">{label}</dt>
                <dd className="text-muted">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section aria-label="DocLink at a glance" className="border-y border-line bg-white">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={[
                  "py-8 sm:py-10",
                  i % 2 === 1 ? "border-l border-line pl-4 sm:pl-8" : "pr-4 sm:pr-8",
                  i > 1 ? "border-t border-line lg:border-t-0" : "",
                  i === 2 ? "lg:border-l lg:pl-8" : "",
                ].join(" ")}
              >
                <dt className="sr-only">{s.label}</dt>
                {/* Stat highlight: a permitted use of the brand gradient */}
                <dd className="whitespace-nowrap bg-gradient-brand bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">
                  <CountUp value={s.number} />
                </dd>
                <dd aria-hidden className="mt-2 text-sm text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── Story: one line that fills word by word, then the detail ── */}
      <section aria-labelledby="story-title" className="statement bg-white pb-section pt-section">
        <Container>
          <p className="text-sm font-medium text-brand">Our story</p>
          <h2 id="story-title" className="mt-4 max-w-[26ch] text-3xl font-semibold sm:text-4xl lg:text-5xl">
            {words.map((word, i) => (
              <span key={i} className="statement-word" style={{ "--i": i, "--n": words.length } as CSSProperties}>
                {word}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>

          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
            <div className="scroll-rise space-y-5 text-lg text-muted lg:col-span-5">
              <p>
                DocLink was founded in Colombo after years of watching capable, growing businesses grind against the same
                bottleneck: all the intelligence locked in the founder&apos;s head, a handful of spreadsheets, and a
                WhatsApp group.
              </p>
              <p>
                We set out to build software that fits how Sri Lankan SMEs actually work — not how an enterprise vendor
                thinks they should. That means deployments that take weeks, not quarters. Pricing that a real business can
                absorb. Support from the same team that built it.
              </p>
              <p>{companyStats.projects.value} projects later, that&apos;s still the mission.</p>
            </div>
            <div className="scroll-zoom lg:col-span-7">
              {/* Replaces the initials-tile "office" illustration until a real photo is supplied */}
              <ProductShot
                label="DocLink team or office photo"
                expectedPath="public/about/team.jpg"
                ratio="4 / 3"
                sizes="(min-width: 1024px) 680px, 100vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Why Sri Lankan SMEs ──────────────────────────────────────── */}
      <Section tone="surface" aria-labelledby="why-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="scroll-rise lg:sticky lg:top-28">
              <p className="text-sm font-medium text-brand">Why Sri Lankan SMEs</p>
              <Heading level={2} size="2" id="why-title" className="mt-4 max-w-[18ch]">
                The market global SaaS vendors built nothing for
              </Heading>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="scroll-rise space-y-5 text-lg text-muted">
              <p>
                Most SME software is designed for a business owner in San Francisco or London who&apos;s already
                digitised. It assumes a CRM is already running, that the team knows what &quot;cloud sync&quot; means,
                and that someone in-house can run an implementation.
              </p>
              <p>
                Sri Lankan SMEs are different. The owner is often the accountant, the sales manager, and the warehouse
                supervisor. Payroll runs on a spreadsheet someone built eight years ago. Inventory is a physical ledger
                the cashier maintains by hand. Stock discrepancies go unnoticed for months.
              </p>
              <p>
                That&apos;s not a failure of the business — it&apos;s a gap in the software market. DocLink exists to
                fill that gap: local-language support, local pricing, and software designed around the workflow that
                already exists, not the workflow a vendor assumes you have.
              </p>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {principles.map(({ icon: Icon, label, sub }, i) => (
                <li
                  key={label}
                  className="scroll-rise spotlight group rounded-surface border border-line bg-white p-5 transition-colors duration-(--dur-base) hover:border-line-strong"
                  style={{ "--rise-i": i } as CSSProperties}
                >
                  <span className="flex size-10 items-center justify-center rounded-control bg-brand-soft text-brand transition-colors duration-(--dur-base) ease-standard group-hover:bg-brand group-hover:text-white">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 font-medium text-ink">{label}</p>
                  <p className="mt-1 text-sm text-muted">{sub}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Leadership ───────────────────────────────────────────────── */}
      <Section aria-labelledby="team-title">
        <div className="scroll-rise">
          <p className="text-sm font-medium text-brand">Leadership</p>
          <Heading level={2} size="2" id="team-title" className="mt-4">
            The people behind the product
          </Heading>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {team.map((member, i) => (
            <li
              key={member.name}
              className="scroll-rise spotlight group flex flex-col rounded-surface border border-line bg-white p-6 transition-colors duration-(--dur-base) hover:border-line-strong"
              style={{ "--rise-i": i } as CSSProperties}
            >
              <span
                aria-hidden
                className="flex size-14 items-center justify-center rounded-full bg-navy text-base font-semibold text-white transition-[background-color,transform] duration-(--dur-slow) ease-standard group-hover:-translate-y-0.5 group-hover:bg-brand"
              >
                {member.initials}
              </span>
              <p className="mt-6 font-semibold text-ink">{member.name}</p>
              <p className="mt-0.5 text-sm font-medium text-brand">{member.role}</p>
              <p className="mt-3 text-sm text-muted">{member.bio}</p>
            </li>
          ))}
        </ul>
      </Section>

      <ProductCTA
        headline="Let's build something together"
        sub="Tell us what you're running on today. We'll tell you what's possible."
        buttonLabel="Start the conversation"
        href="/contact"
      />
    </>
  );
}
