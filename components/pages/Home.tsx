'use client';

import { useState } from 'react'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import DeliveredWorkCarousel from '@/components/DeliveredWorkCarousel'
import Hero from '@/components/home/Hero'
import ProofBand from '@/components/home/ProofBand'
import { DocLinkIcon, type DocLinkIconName } from '@/components/icons/DocLinkIcons'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8] mb-4">{children}</p>
  )
}

// ─── 4. PRODUCT CATEGORIES (tinted cards) ─────────────────────────────────────
const productCards: {
  icon: DocLinkIconName
  name: string
  benefit: string
  href: string
}[] = [
  { icon: 'erp', name: 'ERP System', benefit: 'Accounting, inventory, HR, and payroll on one screen — not four spreadsheets.', href: '/products/erp' },
  { icon: 'pos', name: 'POS System', benefit: 'Retail and restaurant billing with live stock counts and shift closeouts.', href: '/products/pos' },
  { icon: 'doctor', name: 'Doctor App', benefit: 'Patient records, appointments, and prescriptions from a phone in your pocket.', href: '/products/doctor' },
]

function ProductCategories() {
  return (
    <section className="py-28 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 reveal">
          <Label>Product Suite</Label>
          <h2 className="font-display font-black text-[37px] sm:text-[48px] xl:text-[56px] leading-[1.06] tracking-[-0.03em] text-slate-900 max-w-[580px]">
            Software Built for How You Actually Work
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {productCards.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className="card-hover group flex flex-col p-10 rounded-[18px] border border-[#E5E7EB] bg-[#F5F8FF]"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-blue-100 shadow-sm flex items-center justify-center text-[#1D4ED8] mb-6">
                <DocLinkIcon name={p.icon} size={26} />
              </div>
              <h3 className="font-display font-bold text-[20px] text-slate-900 mb-3">{p.name}</h3>
              <p className="text-[15px] text-slate-500 leading-relaxed flex-1">{p.benefit}</p>
              <div className="mt-6 flex items-center gap-1 text-[13px] font-semibold text-[#1D4ED8] group-hover:gap-2 transition-all">
                View Product
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 5. OUR TECHNOLOGIES ──────────────────────────────────────────────────────
const technologies = [
  'React',
  'Next.js',
  'TypeScript',
  'Flutter',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'AWS',
  'Tailwind CSS',
  'React Native',
]

function OurTechnologies() {
  return (
    <section className="pt-10 pb-16 bg-white border-t border-slate-100">
      <p className="text-center text-[12px] font-medium text-slate-500 uppercase tracking-[0.14em] mb-10 px-6">
        Our Technologies
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div className="marquee-track items-center gap-16 md:gap-24 px-8">
          {[...technologies, ...technologies, ...technologies, ...technologies].map(
            (name, i) => (
              <span
                key={`${name}-${i}`}
                aria-hidden={i >= technologies.length || undefined}
                className="shrink-0 text-[22px] md:text-[26px] font-semibold text-slate-400 tracking-tight whitespace-nowrap select-none"
              >
                {name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  )
}

// ─── 6. SERVICES STRIP (distinct: numbered left-rule rows) ─────────────────────
const serviceCards: {
  icon: DocLinkIconName
  name: string
  line: string
  href: string
  flagship?: boolean
  num: string
}[] = [
  { num: '01', icon: 'software', name: 'Software Development', line: 'Bespoke systems scoped around your exact workflow — our flagship engagement.', href: '/services/software', flagship: true },
  { num: '02', icon: 'web', name: 'Web Development', line: 'Marketing sites and web apps that convert visitors, not just look finished.', href: '/services/web' },
  { num: '03', icon: 'mobile', name: 'Mobile App Development', line: 'iOS and Android from one codebase, with a full native feel.', href: '/services/mobile' },
]

function ServicesStrip() {
  return (
    <section className="py-28 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 reveal">
          <Label>Services</Label>
          <h2 className="font-display font-black text-[31px] sm:text-[40px] xl:text-[48px] leading-[1.08] tracking-[-0.025em] text-slate-900 max-w-[480px]">
            Need Something Custom?
          </h2>
        </div>
        <div className="border-t border-slate-200">
          {serviceCards.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[64px_48px_1fr_auto] gap-4 sm:gap-6 items-center py-8 md:py-10 border-b border-slate-200 hover:bg-[#F5F8FF]/60 transition-colors -mx-2 px-2 md:px-4 rounded-lg"
            >
              <span className="hidden sm:block font-display font-black text-[22px] text-slate-300 group-hover:text-[#1D4ED8]/50 transition-colors tabular-nums">
                {s.num}
              </span>
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1D4ED8] group-hover:bg-[#1D4ED8] group-hover:text-white transition-colors">
                <DocLinkIcon name={s.icon} size={20} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-[18px] md:text-[20px] text-slate-900 group-hover:text-[#1D4ED8] transition-colors">
                    {s.name}
                  </h3>
                  {s.flagship && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#1D4ED8] text-white rounded-full">Flagship</span>
                  )}
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed max-w-xl">{s.line}</p>
              </div>
              <span className="text-[#1D4ED8] font-semibold text-[13px] opacity-60 group-hover:opacity-100 transition-opacity hidden sm:inline">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 7. FAQ ───────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Do you build fully custom software?',
    a: "Yes — custom software is our core offering. We scope, design, and build systems tailored to your exact processes. Nothing off the shelf.",
  },
  {
    q: 'How long does a typical project take?',
    a: 'A POS system typically takes 6–10 weeks. A full ERP rolls out in 4–6 months. We provide a fixed timeline in your proposal — and we hold to it.',
  },
  {
    q: 'Do you support us after launch?',
    a: 'Every project ships with a 30-day warranty. Most clients stay on a monthly retainer covering updates, bug fixes, and ongoing feature work.',
  },
  {
    q: "What's your pricing model?",
    a: 'We quote fixed-price projects for well-scoped work. For ongoing builds and retainers, we offer monthly plans. No time-and-materials surprises.',
  },
  {
    q: 'Can you integrate with our existing tools?',
    a: 'Yes — we regularly connect with accounting software, payment gateways, e-commerce platforms, and legacy systems via REST and SOAP APIs.',
  },
  {
    q: 'Do you work with businesses outside Sri Lanka?',
    a: "We do. We've delivered projects in the UAE, UK, Australia, and Southeast Asia. Our team is async-first and time-zone friendly.",
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-[#FAFBFC]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 reveal">
          <Label>FAQ</Label>
          <h2 className="font-display font-black text-[32px] md:text-[36px] leading-[1.1] tracking-[-0.02em] text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-[16px] border overflow-hidden transition-all ${open === i ? 'border-blue-200 shadow-sm' : 'border-[#E5E7EB]'}`}
            >
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={open === i}
                aria-controls={`faq-a-${i}`}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-slate-800 text-[15px] leading-snug">{faq.q}</span>
                <span className={`shrink-0 w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-200 ${open === i ? 'rotate-45 bg-blue-50 border-blue-200' : ''}`}>
                  <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                </span>
              </button>
              <div
                id={`faq-a-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                className={`accordion-content ${open === i ? 'open' : ''}`}
              >
                <div>
                  <p className="px-6 pb-5 text-[14.5px] text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 8. FINAL CTA BAND ────────────────────────────────────────────────────────
function CTABand() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="gradient-brand py-24">
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="ctadots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="white"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#ctadots)"/>
          </svg>
        </div>
        <div className="relative max-w-2xl mx-auto px-6 text-center reveal">
          <h2 className="font-display font-black text-[33px] sm:text-[42px] xl:text-[52px] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Still running the business on spreadsheets?
          </h2>
          <p className="text-blue-100/80 text-[16px] mb-9 leading-relaxed">
            Let&apos;s talk. A 20-minute call is all it takes to figure out what you need.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D4ED8] font-bold rounded-full text-[15px] transition-all hover:shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-1 active:translate-y-0"
          >
            Book a Consultation
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useScrollReveal()
  return (
    <>
      <Hero />
      <ProofBand />
      <ProductCategories />
      <DeliveredWorkCarousel />
      <OurTechnologies />
      <ServicesStrip />
      <FAQ />
      <CTABand />
    </>
  )
}
