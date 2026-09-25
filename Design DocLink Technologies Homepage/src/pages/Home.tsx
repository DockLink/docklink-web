import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'

// ─── Scroll-reveal hook (export for reuse in Products page) ───────────────────
export function useScrollReveal() {
  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll('.reveal')
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
        { threshold: 0.1 }
      )
      els.forEach((el) => io.observe(el))
      return io
    }
    const io = run()
    return () => io.disconnect()
  }, [])
}

// ─── Section label ────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8] mb-4">{children}</p>
  )
}

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-[62px] overflow-hidden bg-white">
      {/* Gradient mesh behind content */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob absolute -top-40 right-0 w-[600px] h-[600px] opacity-[0.18]"
          style={{ background: 'radial-gradient(circle, #1D4ED8 0%, transparent 70%)' }} />
        <div className="blob-2 absolute top-60 -right-20 w-[320px] h-[320px] opacity-[0.10]"
          style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }} />
        {/* Subtle dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#1D4ED8"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 grid lg:grid-cols-[1fr_480px] gap-16 xl:gap-20 items-center w-full">
        {/* Copy */}
        <div className="max-w-[600px]">
          <div className="fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-pulse" />
            <span className="text-[11.5px] font-semibold text-[#1D4ED8] tracking-wide">ERP · POS · Custom Software · Sri Lanka</span>
          </div>

          <h1 className="fade-up-2 font-display font-black text-[52px] xl:text-[68px] leading-[1.04] tracking-[-0.02em] text-slate-900 mb-5">
            Run Your Business<br />
            <span className="gradient-text">Without the</span><br />
            Paper Trail
          </h1>

          <p className="fade-up-3 text-[17px] text-slate-500 leading-relaxed mb-9 max-w-[460px]">
            ERP, POS, and custom software that replaces the spreadsheets — without a six-month rollout.
          </p>

          <div className="fade-up-4 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="px-7 py-3.5 gradient-brand text-white font-semibold rounded-full text-[15px] transition-all hover:shadow-xl hover:shadow-blue-300/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              Talk to Us
            </a>
            <Link
              to="/products"
              className="px-7 py-3.5 bg-white border border-slate-200 text-slate-800 font-semibold rounded-full text-[15px] transition-all hover:border-blue-300 hover:text-[#1D4ED8] hover:-translate-y-0.5"
            >
              View Products
            </Link>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="hidden lg:flex justify-center relative">
          <div className="float-slow relative">
            {/* Main card */}
            <div className="w-[430px] bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-[#FAFBFC] border-b border-slate-100">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="ml-3 text-[11px] text-slate-400 font-medium">DocLink ERP — Overview</span>
              </div>
              <div className="p-5">
                {/* KPIs */}
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  {[
                    { label: 'Revenue', value: 'LKR 2.4M', delta: '+18%', up: true },
                    { label: 'Orders', value: '1,284', delta: '+9%', up: true },
                    { label: 'Staff', value: '48', delta: 'active', up: null },
                  ].map((k) => (
                    <div key={k.label} className="bg-[#F5F8FF] rounded-xl p-3">
                      <div className="text-[10px] text-slate-400 mb-1 font-medium">{k.label}</div>
                      <div className="text-[13px] font-bold text-slate-800">{k.value}</div>
                      <div className={`text-[9.5px] font-semibold mt-0.5 ${k.up === true ? 'text-emerald-500' : k.up === false ? 'text-rose-500' : 'text-slate-400'}`}>{k.delta}</div>
                    </div>
                  ))}
                </div>
                {/* Mini bar chart */}
                <div className="bg-[#F5F8FF] rounded-xl p-4 mb-3">
                  <div className="text-[10px] font-semibold text-slate-400 mb-2.5">Monthly Revenue</div>
                  <div className="flex items-end gap-1 h-14">
                    {[38,54,44,72,55,84,65,90,60,80,72,100].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm"
                        style={{ height: `${h}%`, background: i >= 10 ? 'linear-gradient(180deg,#1D4ED8,#38bdf8)' : '#E0E7FF', opacity: 1 }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {['Jan','Apr','Jul','Oct','Dec'].map(m => <span key={m} className="text-[8.5px] text-slate-400">{m}</span>)}
                  </div>
                </div>
                {/* Transactions */}
                <div className="space-y-2">
                  {[
                    { ref: 'INV-1182', dept: 'Sales', amount: '+LKR 124,500', pos: true },
                    { ref: 'PAY-0891', dept: 'Payroll', amount: '−LKR 48,200', pos: false },
                    { ref: 'PO-3341',  dept: 'Inventory', amount: '−LKR 32,100', pos: false },
                  ].map((tx) => (
                    <div key={tx.ref} className="flex items-center justify-between py-1">
                      <div>
                        <div className="text-[11px] font-semibold text-slate-700">{tx.ref}</div>
                        <div className="text-[9.5px] text-slate-400">{tx.dept}</div>
                      </div>
                      <span className={`text-[11px] font-bold ${tx.pos ? 'text-emerald-600' : 'text-slate-500'}`}>{tx.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating stat chips */}
            <div className="float-card-1 absolute -top-7 -right-9 bg-white border border-slate-100 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 min-w-[148px]">
              <div className="w-8 h-8 rounded-xl gradient-brand-sky flex items-center justify-center text-white text-base">📈</div>
              <div>
                <div className="text-[9.5px] text-slate-400 font-medium">Efficiency</div>
                <div className="text-[13px] font-bold text-slate-900">+45%</div>
              </div>
            </div>
            <div className="float-card-2 absolute -bottom-6 -left-9 bg-white border border-slate-100 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 min-w-[148px]">
              <div className="w-8 h-8 rounded-xl bg-[#F5F8FF] flex items-center justify-center text-base">⚡</div>
              <div>
                <div className="text-[9.5px] text-slate-400 font-medium">Live Sync</div>
                <div className="text-[13px] font-bold text-slate-900">Real-time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 2. CLIENT LOGOS ──────────────────────────────────────────────────────────
const clients = [
  { name: 'Emaar', sub: 'Real Estate' },
  { name: 'Street82', sub: 'Retail' },
  { name: 'GRID', sub: 'Technology' },
  { name: 'A-Design', sub: 'Interior Design' },
]

function ClientLogos() {
  return (
    <section className="py-14 border-y border-slate-100 bg-[#FAFBFC]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[11.5px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-10">
          Trusted by businesses across Sri Lanka
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {clients.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-1 group cursor-default">
              <span className="text-[20px] font-black text-slate-200 group-hover:text-[#1D4ED8] transition-colors tracking-tight font-display leading-none">
                {c.name}
              </span>
              <span className="text-[10px] font-medium text-slate-300 group-hover:text-blue-400 transition-colors uppercase tracking-widest">
                {c.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 3. PRODUCT CATEGORIES ────────────────────────────────────────────────────
const productCards = [
  { icon: '📊', name: 'ERP System', benefit: 'Stop tracking stock on paper — every department, one screen.', href: '/products#erp' },
  { icon: '🏪', name: 'POS System', benefit: 'Bill faster, close shifts in seconds, never lose a receipt.', href: '/products#pos' },
  { icon: '🩺', name: 'Doctor App', benefit: 'Patient records, appointments, and prescriptions in your pocket.', href: '/products#doctor' },
]

function ProductCategories() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 reveal">
          <Label>Product Suite</Label>
          <h2 className="font-display font-black text-[40px] xl:text-[48px] leading-[1.1] tracking-[-0.02em] text-slate-900 max-w-[540px]">
            Software Built for How You Actually Work
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {productCards.map((p, i) => (
            <Link
              key={p.name}
              to={p.href}
              className={`card-hover group flex flex-col p-8 rounded-[18px] border border-[#E5E7EB] bg-[#F5F8FF] reveal reveal-delay-${i + 1}`}
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-blue-100 shadow-sm flex items-center justify-center text-2xl mb-5">
                {p.icon}
              </div>
              <h3 className="font-display font-bold text-[18px] text-slate-900 mb-2">{p.name}</h3>
              <p className="text-[14px] text-slate-500 leading-relaxed flex-1">{p.benefit}</p>
              <div className="mt-5 flex items-center gap-1 text-[13px] font-semibold text-[#1D4ED8] group-hover:gap-2 transition-all">
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

// ─── 4. CASE STUDY TEASERS ────────────────────────────────────────────────────
const caseStudies = [
  {
    client: 'Emaar',
    industry: 'Real Estate',
    headline: 'How Emaar automated payroll for 300 employees',
    gradient: 'from-[#1e3a8a] to-[#1D4ED8]',
    stats: [
      { number: '300', label: 'employees on automated payroll' },
      { number: '6 hrs', label: 'saved per payroll cycle' },
    ],
  },
  {
    client: 'Street82',
    industry: 'Retail',
    headline: 'How Street82 cut stock discrepancies to near zero',
    gradient: 'from-[#1D4ED8] to-[#0284c7]',
    stats: [
      { number: '94%', label: 'reduction in inventory errors' },
      { number: '3 wks', label: 'to full deployment' },
    ],
  },
]

function CaseStudyTeasers() {
  return (
    <section className="py-24 bg-[#FAFBFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 reveal">
          <Label>Case Studies</Label>
          <h2 className="font-display font-black text-[40px] xl:text-[48px] leading-[1.1] tracking-[-0.02em] text-slate-900">
            Real Results
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((cs, i) => (
            <a
              key={cs.client}
              href="#"
              className={`card-hover group rounded-[18px] border border-[#E5E7EB] bg-white overflow-hidden block reveal reveal-delay-${i + 1}`}
            >
              {/* Gradient header */}
              <div className={`h-[120px] bg-gradient-to-r ${cs.gradient} p-6 flex items-end`}>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 border border-white/25 rounded-full text-[11px] font-semibold text-white backdrop-blur-sm">
                  {cs.industry}
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-display font-bold text-[17px] text-slate-900 leading-snug mb-5">
                  {cs.headline}
                </h3>
                <div className="h-px bg-slate-100 mb-5" />
                <div className="grid grid-cols-2 gap-4">
                  {cs.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display font-black text-[28px] text-[#1D4ED8] leading-none mb-1">{s.number}</div>
                      <div className="text-[12px] text-slate-500 leading-snug">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold text-[#1D4ED8] group-hover:gap-2.5 transition-all">
                  Read case study
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 5. SERVICES STRIP ────────────────────────────────────────────────────────
const serviceCards = [
  { icon: '🌐', name: 'Web Development', line: 'Sites and apps that convert — not just look good.' },
  { icon: '⚙️', name: 'Software Development', line: 'Bespoke systems scoped around your exact workflow.', flagship: true },
  { icon: '📱', name: 'Mobile App Development', line: 'iOS and Android — one codebase, full native feel.' },
]

function ServicesStrip() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 reveal">
          <Label>Services</Label>
          <h2 className="font-display font-black text-[40px] xl:text-[48px] leading-[1.1] tracking-[-0.02em] text-slate-900">
            Need Something Custom?
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {serviceCards.map((s, i) => (
            <a
              key={s.name}
              href="#"
              className={`card-hover group flex flex-col p-7 rounded-[18px] border border-[#E5E7EB] bg-white reveal reveal-delay-${i + 1}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl">{s.icon}</div>
                {s.flagship && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#1D4ED8] text-white rounded-full">Flagship</span>
                )}
              </div>
              <h3 className="font-display font-bold text-[16px] text-slate-900 mb-1.5">{s.name}</h3>
              <p className="text-[13.5px] text-slate-500 leading-relaxed flex-1">{s.line}</p>
              <div className="mt-4 flex items-center gap-1 text-[12.5px] font-semibold text-[#1D4ED8] group-hover:gap-2 transition-all">
                Learn more
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 6. FAQ ───────────────────────────────────────────────────────────────────
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
          <h2 className="font-display font-black text-[40px] leading-[1.1] tracking-[-0.02em] text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-[16px] border overflow-hidden transition-all reveal reveal-delay-1 ${open === i ? 'border-blue-200 shadow-sm' : 'border-[#E5E7EB]'}`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-slate-800 text-[14.5px] leading-snug">{faq.q}</span>
                <span className={`shrink-0 w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-200 ${open === i ? 'rotate-45 bg-blue-50 border-blue-200' : ''}`}>
                  <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                </span>
              </button>
              <div className={`accordion-content ${open === i ? 'open' : ''}`}>
                <p className="px-6 pb-5 text-[14px] text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 7. FINAL CTA BAND ────────────────────────────────────────────────────────
function CTABand() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="gradient-brand py-24">
        {/* Subtle dot overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="ctadots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="white"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#ctadots)"/>
          </svg>
        </div>
        <div className="relative max-w-2xl mx-auto px-6 text-center reveal">
          <h2 className="font-display font-black text-[42px] xl:text-[52px] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Still running the business on spreadsheets?
          </h2>
          <p className="text-blue-100/80 text-[16px] mb-9 leading-relaxed">
            Let's talk. A 20-minute call is all it takes to figure out what you need.
          </p>
          <a
            href="mailto:hello@doclink.lk"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D4ED8] font-bold rounded-full text-[15px] transition-all hover:shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-1 active:translate-y-0"
          >
            Book a Consultation
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal()
  return (
    <>
      <Hero />
      <ClientLogos />
      <ProductCategories />
      <CaseStudyTeasers />
      <ServicesStrip />
      <FAQ />
      <CTABand />
    </>
  )
}
