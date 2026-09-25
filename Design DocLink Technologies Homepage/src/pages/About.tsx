import { Link } from 'react-router'
import { useScrollReveal } from './Home'
import ProductCTA from '../components/ProductCTA'

const team = [
  {
    initials: 'NS',
    name: 'Nuwan Samarasinghe',
    role: 'Founder & CEO',
    bio: 'Former enterprise systems consultant. Has seen every flavour of Sri Lankan business process still running on paper.',
    gradient: 'from-[#1e3a8a] to-[#1D4ED8]',
  },
  {
    initials: 'PT',
    name: 'Priya Thilakaratne',
    role: 'Head of Engineering',
    bio: '10 years building bespoke systems for manufacturing, retail, and healthcare clients across the region.',
    gradient: 'from-[#1D4ED8] to-[#0284c7]',
  },
  {
    initials: 'RJ',
    name: 'Ravindu Jayasekara',
    role: 'Head of Delivery',
    bio: 'Keeps every project on schedule. Runs discovery sprints, manages stakeholder sign-offs, and chases the final 10%.',
    gradient: 'from-[#1e3a8a] to-[#1D4ED8]',
  },
  {
    initials: 'AF',
    name: 'Amali Fernando',
    role: 'Client Success Lead',
    bio: 'Handles onboarding, training, and every support ticket. The reason clients stay long after go-live.',
    gradient: 'from-[#1D4ED8] to-[#0284c7]',
  },
]

const stats = [
  { number: '5+', label: 'Years building for Sri Lankan businesses' },
  { number: '40+', label: 'Clients across retail, healthcare, and services' },
  { number: '80+', label: 'Projects delivered end-to-end' },
  { number: '99.9%', label: 'Uptime across all hosted platforms' },
]

export default function About() {
  useScrollReveal()
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="blob absolute -top-24 right-0 w-[440px] h-[440px] opacity-[0.09]"
            style={{ background: 'radial-gradient(circle,#1D4ED8 0%,transparent 70%)' }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="about-grid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#1D4ED8"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#about-grid)"/>
          </svg>
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-pulse"/>
            <span className="text-[11.5px] font-semibold text-[#1D4ED8] tracking-wide">About DocLink</span>
          </div>
          <h1 className="fade-up-2 font-display font-black text-[48px] xl:text-[62px] leading-[1.05] tracking-[-0.02em] text-slate-900 mb-5">
            Built for the businesses<br/>
            <span className="gradient-text">running on paper</span>
          </h1>
          <p className="fade-up-3 text-[16.5px] text-slate-500 max-w-xl mx-auto leading-relaxed">
            DocLink Technologies builds ERP, POS, and custom software for Sri Lankan SMEs — companies where the owner is still the system.
          </p>
        </div>
      </section>

      {/* ── Story — split layout ───────────────────────────────────────────── */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="reveal">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8] mb-4 block">Our Story</span>
            <h2 className="font-display font-black text-[36px] xl:text-[44px] leading-[1.1] tracking-[-0.02em] text-slate-900 mb-6">
              We started because we saw the same spreadsheet across a hundred businesses
            </h2>
            <div className="space-y-4 text-[15.5px] text-slate-500 leading-relaxed">
              <p>
                DocLink was founded in Colombo after years of watching capable, growing businesses grind against the same bottleneck: all the intelligence locked in the founder's head, a handful of spreadsheets, and a WhatsApp group.
              </p>
              <p>
                We set out to build software that fits how Sri Lankan SMEs actually work — not how an enterprise vendor thinks they should. That means deployments that take weeks, not quarters. Pricing that a real business can absorb. Support from the same team that built it.
              </p>
              <p>
                Five years and 80+ projects later, that's still the mission.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#1D4ED8] flex items-center justify-center shrink-0">
                  <span className="font-display font-black text-white text-sm">DL</span>
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-slate-800">DocLink Technologies (Pvt) Ltd</div>
                  <div className="text-[12px] text-slate-400">Est. 2019 · Colombo, Sri Lanka</div>
                </div>
              </div>
            </div>
          </div>

          {/* Office / team illustration */}
          <div className="reveal">
            <div className="rounded-[24px] overflow-hidden border border-[#E5E7EB] shadow-xl shadow-slate-100/80 bg-white aspect-[4/3] relative">
              {/* Illustrated office stand-in */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F5F8FF] to-white flex flex-col items-center justify-center p-10">
                <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
                  {['NS','PT','RJ','AF','KP','MF'].map((init,i)=>(
                    <div key={i} className={`aspect-square rounded-2xl bg-gradient-to-br ${i%2===0?'from-[#1e3a8a] to-[#1D4ED8]':'from-[#1D4ED8] to-[#0284c7]'} flex items-center justify-center shadow-md`}>
                      <span className="font-display font-black text-white text-lg">{init}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <div className="font-display font-bold text-[15px] text-slate-700">The DocLink Team</div>
                  <div className="text-[12px] text-slate-400 mt-1">Colombo 07, Sri Lanka</div>
                </div>
              </div>
              {/* Corner badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-[#E5E7EB] rounded-xl px-3 py-2 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Office</div>
                <div className="text-[12px] font-semibold text-slate-700">Colombo, LK</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Sri Lankan SMEs ───────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 reveal">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8] block mb-4">Why Sri Lankan SMEs</span>
              <h2 className="font-display font-black text-[32px] xl:text-[38px] leading-[1.12] tracking-[-0.02em] text-slate-900">
                The market global SaaS vendors built nothing for
              </h2>
            </div>
            <div className="space-y-5 text-[15.5px] text-slate-500 leading-relaxed pt-1">
              <p>
                Most SME software is designed for a business owner in San Francisco or London who's already digitised. It assumes a CRM is already running, that the team knows what "cloud sync" means, and that someone in-house can run an implementation.
              </p>
              <p>
                Sri Lankan SMEs are different. The owner is often the accountant, the sales manager, and the warehouse supervisor. Payroll runs on a spreadsheet someone built eight years ago. Inventory is a physical ledger the cashier maintains by hand. Stock discrepancies go unnoticed for months.
              </p>
              <p>
                That's not a failure of the business — it's a gap in the software market. DocLink exists to fill that gap: local-language support, local pricing, and software designed around the workflow that already exists, not the workflow a vendor assumes you have.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#E5E7EB]">
                {[
                  { icon: '🏪', label: 'SME-first', sub: 'Pricing and scope sized for real Sri Lankan businesses' },
                  { icon: '⚡', label: 'Fast deploys', sub: 'Weeks to live, not quarters — no drawn-out enterprise timelines' },
                  { icon: '🤝', label: 'Same team', sub: 'The team that built your system handles your support' },
                ].map(f => (
                  <div key={f.label}>
                    <div className="text-2xl mb-2">{f.icon}</div>
                    <div className="font-semibold text-[14px] text-slate-800 mb-1">{f.label}</div>
                    <div className="text-[12.5px] text-slate-400 leading-snug">{f.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8] block mb-3">Leadership</span>
            <h2 className="font-display font-black text-[36px] xl:text-[44px] leading-[1.1] tracking-[-0.02em] text-slate-900">
              The people behind the product
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`group bg-white rounded-[20px] border border-[#E5E7EB] overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60 transition-all reveal reveal-delay-${(i % 4) + 1}`}
              >
                {/* Avatar strip */}
                <div className={`h-[88px] bg-gradient-to-br ${member.gradient} flex items-end px-5 pb-0 relative overflow-hidden`}>
                  <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
                    <defs><pattern id={`tm-${i}`} width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="white"/></pattern></defs>
                    <rect width="100%" height="100%" fill={`url(#tm-${i})`}/>
                  </svg>
                  <div className="relative w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center translate-y-7 shadow-md">
                    <span className="font-display font-black text-white text-xl leading-none">{member.initials}</span>
                  </div>
                </div>
                {/* Body */}
                <div className="pt-10 px-5 pb-6">
                  <div className="font-display font-bold text-[15px] text-slate-900 mb-0.5">{member.name}</div>
                  <div className="text-[12px] font-semibold text-[#1D4ED8] mb-3">{member.role}</div>
                  <p className="text-[12.5px] text-slate-500 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats band ────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#1D4ED8] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="about-stat-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="white"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#about-stat-dots)"/>
          </svg>
        </div>
        <div className="relative max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center reveal">
              <div className="font-display font-black text-[44px] xl:text-[52px] text-white leading-none mb-2">{s.number}</div>
              <div className="text-[13px] text-white/60 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <ProductCTA
        headline="Let's Build Something Together"
        sub="Tell us what you're running on today. We'll tell you what's possible."
        buttonLabel="Start the Conversation"
        href="/contact"
      />
    </>
  )
}
