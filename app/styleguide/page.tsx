import type { Metadata } from "next";
import {
  Check,
  ChevronDown,
  CodeXml,
  Globe,
  ImageIcon,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  Phone,
  ScanBarcode,
  Smartphone,
  Stethoscope,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Input, Select, Textarea } from "@/components/ui/Field";
import ProductShot from "@/components/ui/ProductShot";
import { Container, Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "DocLink design tokens and components.",
  robots: { index: false, follow: false },
};

// ── Contrast helpers (WCAG 2.x relative luminance) ──────────────────────────
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const colorGroups: { name: string; note: string; colors: { token: string; hex: string; role: string; on?: string }[] }[] = [
  {
    name: "Neutrals",
    note: "Navy-tinted greys. Body copy is ink-2; muted is the lightest colour allowed for readable text.",
    colors: [
      { token: "ink", hex: "#0b1a33", role: "Headings, primary text" },
      { token: "ink-2", hex: "#334155", role: "Body copy" },
      { token: "muted", hex: "#475569", role: "Secondary text" },
      { token: "subtle", hex: "#64748b", role: "Meta and placeholders only" },
      { token: "line-strong", hex: "#cbd3df", role: "Input borders, hover borders" },
      { token: "line", hex: "#e4e8ef", role: "Hairlines, card borders" },
      { token: "surface-2", hex: "#eef2f7", role: "Wells, placeholders" },
      { token: "surface", hex: "#f6f8fb", role: "Quiet panels, footer" },
    ],
  },
  {
    name: "DocLink blue",
    note: "The working colour: links, focus, selected states, icons.",
    colors: [
      { token: "brand", hex: "#1d4ed8", role: "Links, focus ring, icons" },
      { token: "brand-hover", hex: "#1e40af", role: "Link hover" },
      { token: "brand-ink", hex: "#1e3a8a", role: "Text on brand-soft", on: "#eef3fe" },
      { token: "brand-soft", hex: "#eef3fe", role: "Tinted backgrounds" },
    ],
  },
  {
    name: "Deep navy",
    note: "For contrast bands. Text on navy uses on-navy and on-navy-muted.",
    colors: [
      { token: "navy", hex: "#0a1a3f", role: "Contrast band background" },
      { token: "navy-2", hex: "#13285e", role: "Raised surface on navy" },
      { token: "on-navy-muted", hex: "#b9c6e0", role: "Secondary text on navy", on: "#0a1a3f" },
    ],
  },
  {
    name: "Status",
    note: "Form feedback only.",
    colors: [
      { token: "danger", hex: "#b91c1c", role: "Errors" },
      { token: "success", hex: "#15803d", role: "Confirmation" },
    ],
  },
];

const typeScale = [
  { token: "text-6xl", px: "76 / 76", use: "Home hero (desktop)" },
  { token: "text-5xl", px: "60 / 62", use: "Page headlines (desktop)" },
  { token: "text-4xl", px: "44 / 48", use: "Hero at phone width, section titles (desktop)" },
  { token: "text-3xl", px: "32 / 38", use: "Section titles (phone)" },
  { token: "text-2xl", px: "24 / 32", use: "Card and sub-section titles" },
  { token: "text-xl", px: "20 / 28", use: "Lead paragraph (desktop)" },
  { token: "text-lg", px: "18 / 28", use: "Lead paragraph (phone), h4" },
  { token: "text-base", px: "16 / 26", use: "Body copy, inputs" },
  { token: "text-sm", px: "14 / 22", use: "UI labels, captions, nav" },
  { token: "text-xs", px: "12 / 16", use: "Badges, file hints. Never body copy" },
];

const spacingScale = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32];

const motionTokens = [
  { token: "--dur-fast", value: "120ms", use: "Hover and colour changes" },
  { token: "--dur-base", value: "180ms", use: "Menus, tabs, screenshot crossfades" },
  { token: "--dur-slow", value: "320ms", use: "Accordions, the single hero load moment" },
  { token: "ease-standard", value: "cubic-bezier(.2,.7,.2,1)", use: "Everything entering or changing" },
  { token: "ease-exit", value: "cubic-bezier(.4,0,1,1)", use: "Things leaving the screen" },
];

const icons = [
  { Icon: LayoutGrid, name: "LayoutGrid", use: "ERP" },
  { Icon: ScanBarcode, name: "ScanBarcode", use: "POS" },
  { Icon: Stethoscope, name: "Stethoscope", use: "Doctor App" },
  { Icon: CodeXml, name: "CodeXml", use: "Software" },
  { Icon: Globe, name: "Globe", use: "Web" },
  { Icon: Smartphone, name: "Smartphone", use: "Mobile" },
  { Icon: Mail, name: "Mail", use: "Email" },
  { Icon: Phone, name: "Phone", use: "Phone" },
  { Icon: MapPin, name: "MapPin", use: "Address" },
  { Icon: Check, name: "Check", use: "Included" },
  { Icon: X, name: "X", use: "Not included, close" },
  { Icon: ChevronDown, name: "ChevronDown", use: "Disclosure" },
  { Icon: Menu, name: "Menu", use: "Mobile menu" },
  { Icon: ImageIcon, name: "ImageIcon", use: "Missing screenshot" },
];

const toc = [
  ["colour", "Colour"],
  ["type", "Type"],
  ["space", "Space"],
  ["radius", "Radius and elevation"],
  ["motion", "Motion"],
  ["icons", "Icons"],
  ["buttons", "Buttons"],
  ["cards", "Cards"],
  ["inputs", "Inputs"],
  ["shots", "Product shots"],
  ["sections", "Sections"],
] as const;

function GroupHeader({ id, title, children }: { id: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 max-w-2xl">
      <Heading level={2} size="3" id={id} className="scroll-mt-24">
        {title}
      </Heading>
      {children && (
        <Text variant="small" className="mt-2">
          {children}
        </Text>
      )}
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <Section space="compact" className="border-b border-line">
        <Heading level={1}>Styleguide</Heading>
        <Text variant="lead" className="mt-4">
          Direction A, working system. Every token and component the site is built from. If something isn&apos;t
          here, it shouldn&apos;t be on a page.
        </Text>
        <nav aria-label="Styleguide sections" className="mt-8 -mx-gutter overflow-x-auto px-gutter [scrollbar-width:none] sm:mx-0 sm:px-0">
          <ul className="flex gap-2 sm:flex-wrap">
            {toc.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-flex h-9 items-center whitespace-nowrap rounded-control border border-line px-3 text-sm text-ink-2 transition-colors duration-(--dur-fast) hover:border-line-strong hover:bg-surface"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {/* ── Colour ─────────────────────────────────────────────────────── */}
      <Section space="compact">
        <GroupHeader id="colour" title="Colour">
          White base, DocLink blue as the working colour, deep navy for contrast. Ratios are measured against white
          unless noted. AA needs 4.5:1 for body text.
        </GroupHeader>
        <div className="space-y-12">
          {colorGroups.map((group) => (
            <div key={group.name}>
              <Heading level={3} size="4">
                {group.name}
              </Heading>
              <Text variant="small" className="mt-1">
                {group.note}
              </Text>
              <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {group.colors.map((c) => {
                  const bg = c.on ?? "#ffffff";
                  const ratio = contrast(c.hex, bg);
                  return (
                    <li key={c.token} className="overflow-hidden rounded-surface border border-line">
                      <div className="h-20 border-b border-line" style={{ background: c.hex }} />
                      <div className="space-y-0.5 p-3">
                        <p className="text-sm font-medium text-ink">{c.token}</p>
                        <p className="text-sm text-muted">{c.hex}</p>
                        <p className="text-sm text-muted">{c.role}</p>
                        <p className="text-xs text-subtle">
                          {ratio.toFixed(1)}:1{c.on ? ` on ${c.on}` : ""}
                          {ratio >= 4.5 ? ", passes AA text" : ratio >= 3 ? ", large text / UI only" : ", decorative only"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div>
            <Heading level={3} size="4">
              Brand gradient
            </Heading>
            <Text variant="small" className="mt-1">
              Used in exactly three places: the hero background, primary buttons and stat highlights. Never on text,
              icons, cards or section bands.
            </Text>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex h-28 items-end rounded-surface border border-line bg-gradient-hero p-4 text-sm font-medium text-ink">
                bg-gradient-hero
              </div>
              <div className="flex h-28 items-end rounded-surface bg-gradient-brand p-4 text-sm font-medium text-white">
                bg-gradient-brand
              </div>
              <div className="flex h-28 items-center justify-center rounded-surface border border-line">
                <Button>Primary button</Button>
              </div>
              <div className="flex h-28 flex-col justify-center rounded-surface border border-line px-5">
                <span className="bg-gradient-brand bg-clip-text text-4xl font-semibold text-transparent">[TBC]</span>
                <span className="mt-1 text-sm text-muted">Stat highlight (number only)</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Type ───────────────────────────────────────────────────────── */}
      <Section space="compact" tone="surface">
        <GroupHeader id="type" title="Type">
          Geist, one variable family. Weights 400 (body), 500 (UI) and 600 (headings). Sentence case everywhere. No
          tracked-out capitals.
        </GroupHeader>
        <ul className="divide-y divide-line rounded-surface border border-line bg-white">
          {typeScale.map((t) => (
            <li key={t.token} className="grid gap-2 p-4 sm:grid-cols-[180px_1fr] sm:items-baseline sm:gap-6 sm:p-5">
              <div>
                <p className="text-sm font-medium text-ink">{t.token}</p>
                <p className="text-xs text-subtle">
                  {t.px}px. {t.use}
                </p>
              </div>
              <p className={`${t.token} truncate font-semibold text-ink`}>Run your business without the paper trail</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <Heading level={3} size="4">
              Heading component
            </Heading>
            <div className="space-y-4 rounded-surface border border-line bg-white p-6">
              <Heading level={2} size="display">
                Display
              </Heading>
              <Heading level={2} size="1">
                Heading 1
              </Heading>
              <Heading level={2} size="2">
                Heading 2
              </Heading>
              <Heading level={2} size="3">
                Heading 3
              </Heading>
              <Heading level={2} size="4">
                Heading 4
              </Heading>
            </div>
            <Text variant="small">
              Level sets the document outline; size sets the look. Every size steps down at phone width.
            </Text>
          </div>
          <div className="space-y-5">
            <Heading level={3} size="4">
              Text component
            </Heading>
            <div className="space-y-5 rounded-surface border border-line bg-white p-6">
              <Text variant="lead">
                Lead. ERP, POS and custom software that replaces the spreadsheets, without a six-month rollout.
              </Text>
              <Text>
                Body. Accounting, inventory, HR and payroll on one screen, not four spreadsheets. Line length is capped
                at 65 characters so paragraphs stay easy to read on wide screens.
              </Text>
              <Text variant="small">Small. Captions, helper text and footer links.</Text>
              <p className="text-base">
                Inline link:{" "}
                <a href="#type" className="font-medium text-brand underline-offset-4 hover:text-brand-hover hover:underline">
                  View all products
                </a>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Space ──────────────────────────────────────────────────────── */}
      <Section space="compact">
        <GroupHeader id="space" title="Space">
          4px base unit. Sections use one fluid token so vertical rhythm is the same on every page.
        </GroupHeader>
        <div className="grid gap-10 lg:grid-cols-2">
          <ul className="space-y-2.5">
            {spacingScale.map((n) => (
              <li key={n} className="flex items-center gap-4">
                <span className="w-24 shrink-0 text-sm text-muted">
                  {n * 4}px ({n})
                </span>
                <span className="h-3 rounded-sm bg-brand/80" style={{ width: n * 4 }} />
              </li>
            ))}
          </ul>
          <dl className="divide-y divide-line rounded-surface border border-line text-sm">
            {[
              ["py-section", "64px → 128px, fluid", "Default gap above and below a page band"],
              ["py-section-sm", "48px → 80px, fluid", "Compact bands, e.g. logo rows"],
              ["px-gutter", "16px", "Side gutter at phone width (24px from sm, 32px from lg)"],
              ["max-w-site", "1200px", "Content width"],
              ["max-w-prose", "65ch", "Reading width for paragraphs"],
            ].map(([t, v, u]) => (
              <div key={t} className="grid grid-cols-[120px_1fr] gap-3 p-4">
                <dt className="font-medium text-ink">{t}</dt>
                <dd className="text-muted">
                  {v}
                  <br />
                  {u}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ── Radius & elevation ─────────────────────────────────────────── */}
      <Section space="compact" tone="surface">
        <GroupHeader id="radius" title="Radius and elevation">
          Two radii by role, plus one for the phone frame. Shadows are rare: menus float, screenshots sit on the page,
          cards stay flat.
        </GroupHeader>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["rounded-control", "8px", "Buttons, inputs, menu items", "rounded-control"],
            ["rounded-surface", "16px", "Cards, panels, screenshots", "rounded-surface"],
            ["rounded-device", "32px", "Phone screenshot frame only", "rounded-device"],
          ].map(([t, v, u, cls]) => (
            <div key={t} className="flex items-center gap-4 rounded-surface border border-line bg-white p-5">
              <span className={`size-16 shrink-0 border-2 border-brand bg-brand-soft ${cls}`} />
              <span className="text-sm">
                <span className="block font-medium text-ink">{t}</span>
                <span className="block text-muted">
                  {v}, {u}
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            ["shadow-hairline", "Buttons, inputs", "shadow-hairline"],
            ["shadow-pop", "Menus and popovers", "shadow-pop"],
            ["shadow-shot", "Product screenshots", "shadow-shot"],
          ].map(([t, u, cls]) => (
            <div key={t} className={`rounded-surface bg-white p-6 ${cls}`}>
              <p className="text-sm font-medium text-ink">{t}</p>
              <p className="text-sm text-muted">{u}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Motion ─────────────────────────────────────────────────────── */}
      <Section space="compact">
        <GroupHeader id="motion" title="Motion">
          Motion answers what someone did. One load moment on the home hero, nothing on scroll. Everything is
          instant when the visitor prefers reduced motion.
        </GroupHeader>
        <div className="grid gap-10 lg:grid-cols-2">
          <dl className="divide-y divide-line rounded-surface border border-line text-sm">
            {motionTokens.map((m) => (
              <div key={m.token} className="grid grid-cols-[130px_1fr] gap-3 p-4">
                <dt className="font-medium text-ink">{m.token}</dt>
                <dd className="text-muted">
                  {m.value}
                  <br />
                  {m.use}
                </dd>
              </div>
            ))}
          </dl>
          <div className="space-y-3">
            <Text variant="small">Hover or focus each bar to compare durations.</Text>
            {(["--dur-fast", "--dur-base", "--dur-slow"] as const).map((d) => (
              <button
                key={d}
                type="button"
                className="group block w-full rounded-control border border-line p-3 text-left text-sm text-ink-2"
              >
                {d}
                <span className="mt-2 block h-2 overflow-hidden rounded-full bg-surface-2">
                  <span
                    className="block h-full w-1/5 rounded-full bg-brand ease-standard group-hover:w-full group-focus-visible:w-full"
                    style={{ transitionProperty: "width", transitionDuration: `var(${d})` }}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Icons ──────────────────────────────────────────────────────── */}
      <Section space="compact" tone="surface">
        <GroupHeader id="icons" title="Icons">
          Lucide only, 1.75 stroke, 16–20px, always with a visible label or aria-label. No emoji.
        </GroupHeader>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {icons.map(({ Icon, name, use }) => (
            <li key={name} className="flex flex-col items-start gap-3 rounded-surface border border-line bg-white p-4">
              <span className="flex size-9 items-center justify-center rounded-control bg-brand-soft text-brand">
                <Icon aria-hidden className="size-[18px]" strokeWidth={1.75} />
              </span>
              <span className="text-sm">
                <span className="block font-medium text-ink">{use}</span>
                <span className="block text-xs text-subtle">{name}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Buttons ────────────────────────────────────────────────────── */}
      <Section space="compact">
        <GroupHeader id="buttons" title="Buttons">
          One name per action across the site. Primary is the only gradient control. Minimum height 44px. Press Tab
          to see the focus ring.
        </GroupHeader>
        <div className="grid gap-6 lg:grid-cols-2">
          {(["md", "lg"] as const).map((size) => (
            <div key={size} className="rounded-surface border border-line p-6">
              <p className="mb-4 text-sm font-medium text-ink">Size {size}</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size={size} href="/contact">
                  Book a consultation
                </Button>
                <Button size={size} variant="secondary" href="/products">
                  View products
                </Button>
                <Button size={size} variant="ghost" href="/case-studies">
                  Read case studies
                </Button>
              </div>
            </div>
          ))}
          <div className="rounded-surface border border-line p-6">
            <p className="mb-4 text-sm font-medium text-ink">With icon, disabled</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" iconStart={<Mail aria-hidden className="size-4" strokeWidth={1.75} />} href="mailto:hello@doclink.lk">
                Email us
              </Button>
              <Button disabled>Sending…</Button>
              <Button variant="secondary" disabled>
                Back
              </Button>
            </div>
          </div>
          <div className="rounded-surface bg-navy p-6">
            <p className="mb-4 text-sm font-medium text-on-navy">On navy</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="inverse" href="/contact">
                Book a consultation
              </Button>
              <Button variant="ghost" href="/products" className="text-on-navy hover:bg-navy-2 hover:text-on-navy">
                View products
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Cards ──────────────────────────────────────────────────────── */}
      <Section space="compact" tone="surface">
        <GroupHeader id="cards" title="Cards">
          Flat, hairline border, 16px radius. Link cards change border on hover and show the focus ring. No lift, no
          shadow. Use a card only when content is a self-contained item.
        </GroupHeader>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <Heading level={3} size="4">
              Static card
            </Heading>
            <Text variant="small" className="mt-2">
              For grouped facts that aren&apos;t a link.
            </Text>
          </Card>
          <Card href="/products/erp">
            <span className="flex size-9 items-center justify-center rounded-control bg-brand-soft text-brand">
              <LayoutGrid aria-hidden className="size-[18px]" strokeWidth={1.75} />
            </span>
            <Heading level={3} size="4" className="mt-4">
              Link card
            </Heading>
            <Text variant="small" className="mt-2">
              The whole card is the link. Hover or tab to it.
            </Text>
          </Card>
          <Card tone="surface" padding="lg" className="md:col-span-1">
            <Heading level={3} size="4">
              Surface card, large padding
            </Heading>
            <Text variant="small" className="mt-2">
              For a quieter panel on a white band.
            </Text>
          </Card>
        </div>
      </Section>

      {/* ── Inputs ─────────────────────────────────────────────────────── */}
      <Section space="compact">
        <GroupHeader id="inputs" title="Inputs">
          Visible labels, helper text under the field, errors next to the field they belong to. 16px text so phones
          don&apos;t zoom.
        </GroupHeader>
        <form className="grid max-w-3xl gap-6 sm:grid-cols-2" aria-label="Input examples" action="#">
          <Input id="sg-name" label="Your name" placeholder="Kasun Perera" autoComplete="off" />
          <Input id="sg-email" type="email" label="Work email" hint="We only use this to reply to you." placeholder="you@company.lk" autoComplete="off" />
          <Input id="sg-company" label="Company" optional placeholder="Company name" autoComplete="off" />
          <Input id="sg-error" type="email" label="Email" defaultValue="kasun@" error="Enter an email address like name@company.lk" autoComplete="off" />
          <Select id="sg-select" label="How did you hear about us?" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            <option>Search</option>
            <option>Referral</option>
            <option>Social media</option>
          </Select>
          <Input id="sg-disabled" label="Disabled" disabled defaultValue="Not editable" />
          <div className="sm:col-span-2">
            <Textarea id="sg-message" label="What are you running on today?" optional placeholder="Excel for stock, WhatsApp for orders…" />
          </div>
        </form>
      </Section>

      {/* ── Product shots ──────────────────────────────────────────────── */}
      <Section space="compact" tone="surface">
        <GroupHeader id="shots" title="Product shots">
          The only way product visuals appear. Until a real screenshot is supplied, a labelled placeholder shows what
          is missing and where the file goes.
        </GroupHeader>
        <div className="grid items-start gap-10 lg:grid-cols-[2fr_1fr]">
          <ProductShot
            label="ERP inventory screen, desktop"
            expectedPath="public/screens/erp-inventory.png"
            caption="Desktop, 16:10. Supply at least 2400px wide."
          />
          <ProductShot
            device="phone"
            label="Doctor App appointments screen"
            expectedPath="public/screens/doctor-appointments.png"
            caption="Phone, 9:19.5. Supply at 1290×2796."
          />
        </div>
      </Section>

      {/* ── Section tones ──────────────────────────────────────────────── */}
      <div id="sections" className="scroll-mt-24">
        <Section space="compact">
          <Heading level={2} size="3">
            Sections
          </Heading>
          <Text variant="small" className="mt-2">
            Three tones. White is the default; surface separates related bands; navy is for one contrast moment per
            page at most.
          </Text>
        </Section>
        <Section space="compact" tone="surface" className="border-y border-line">
          <Heading level={3} size="4">
            tone=&quot;surface&quot;
          </Heading>
          <Text variant="small" className="mt-1">
            Quiet grouping, e.g. FAQs.
          </Text>
        </Section>
        <Section space="compact" tone="navy">
          <Heading level={3} size="2" onNavy>
            tone=&quot;navy&quot;
          </Heading>
          <Text onNavy className="mt-3">
            Deep navy band with on-navy text. Use the inverse button here.
          </Text>
          <div className="mt-6">
            <Button variant="inverse" href="/contact">
              Book a consultation
            </Button>
          </div>
        </Section>
      </div>

      <Container className="py-10">
        <Text variant="small">This page is excluded from search engines and the sitemap.</Text>
      </Container>
    </>
  );
}
