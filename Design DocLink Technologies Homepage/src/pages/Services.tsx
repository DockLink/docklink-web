import { Link } from 'react-router'
import { useScrollReveal } from './Home'
import ProductCTA from '../components/ProductCTA'
import Footer from '../components/Footer'

// ─── Process stat strip ───────────────────────────────────────────────────────
function ProcessStrip() {
  const stats = [
    { value: '2–6 wks', label: 'MVP delivery window' },
    { value: '500+', label: 'businesses served' },
    { value: '10+', label: 'years building software' },
    { value: '99.9%', label: 'uptime SLA' },
  ]
  return (
    <section className="py-16 bg-[#FAFBFC] border-y border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center reveal">
              <div className="font-display font-black text-[40px] xl:text-[48px] gradient-text leading-none mb-1">{s.value}</div>
              <div className="text-[13px] text-slate-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Service cards ────────────────────────────────────────────────────────────
const serviceCards = [
  {
    icon: '⚙️',
    name: 'Software Development',
    tagline: 'Flagship Service',
    desc: 'Tailored business systems built from the ground up — no templates, no compromises.',
    link: '/services/software',
    cta: 'Explore',
    flagship: true,
  },
  {
    icon: '🌐',
    name: 'Web Development',
    tagline: null,
    desc: 'Modern, SEO-optimized websites that convert visitors into customers.',
    link: '/services/web',
    cta: 'Explore',
    flagship: false,
  },
  {
    icon: '📱',
    name: 'Mobile App Development',
    tagline: null,
    desc: 'Native and cross-platform apps that put your business in your customers\' pocket.',
    link: '/services/mobile',
    cta: 'Explore',
    flagship: false,
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Services() {
  useScrollReveal()
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="blob absolute -top-28 right-0 w-[480px] h-[480px] opacity-[0.10]"
            style={{ background: 'radial-gradient(circle,#1D4ED8 0%,transparent 70%)' }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="svgrid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#1D4ED8"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#svgrid)"/>
          </svg>
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-pulse"/>
            <span className="text-[11.5px] font-semibold text-[#1D4ED8] tracking-wide">Our Services</span>
          </div>
          <h1 className="fade-up-2 font-display font-black text-[48px] xl:text-[62px] leading-[1.05] tracking-[-0.02em] text-slate-900 mb-5">
            Custom Software,{' '}
            <span className="gradient-text">Built Around Your Business</span>
          </h1>
          <p className="fade-up-3 text-[16px] text-slate-500 max-w-xl mx-auto">
            Three disciplines. One team. We build the software your business actually needs — not what fits a pre-packaged template.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-20 bg-[#FAFBFC]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Flagship — full-width top card */}
          <div className="reveal mb-6">
            <Link
              to={serviceCards[0].link}
              className="group flex flex-col lg:flex-row items-start lg:items-center gap-8 p-10 xl:p-12 rounded-[20px] border-2 border-[#1D4ED8]/20 bg-gradient-to-br from-[#F5F8FF] to-white hover:border-[#1D4ED8]/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/60 transition-all"
            >
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center text-3xl shadow-lg shadow-blue-200">
                  {serviceCards[0].icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-display font-black text-[26px] xl:text-[30px] text-slate-900 tracking-tight">{serviceCards[0].name}</h2>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#1D4ED8] text-white rounded-full">FLAGSHIP</span>
                </div>
                <p className="text-[16px] text-slate-500 leading-relaxed max-w-[560px]">{serviceCards[0].desc}</p>
              </div>
              <div className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 gradient-brand text-white font-semibold rounded-full text-[14.5px] transition-all group-hover:shadow-xl group-hover:shadow-blue-300/25">
                Explore →
              </div>
            </Link>
          </div>

          {/* Two remaining + coming soon */}
          <div className="grid md:grid-cols-3 gap-5">
            {serviceCards.slice(1).map((s, i) => (
              <div key={s.name} className={`reveal reveal-delay-${i + 1}`}>
                <Link
                  to={s.link}
                  className="group flex flex-col p-8 rounded-[18px] border border-[#E5E7EB] bg-white hover:border-blue-200 hover:-translate-y-1 hover:shadow-lg transition-all h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F5F8FF] border border-blue-50 flex items-center justify-center text-2xl mb-5">{s.icon}</div>
                  <h3 className="font-display font-bold text-[19px] text-slate-900 mb-2">{s.name}</h3>
                  <p className="text-[14px] text-slate-500 leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold text-[#1D4ED8] group-hover:gap-2.5 transition-all">
                    {s.cta} →
                  </div>
                </Link>
              </div>
            ))}

            {/* Coming soon teaser */}
            <div className="reveal reveal-delay-3">
              <div className="flex flex-col p-8 rounded-[18px] border border-[#E5E7EB] bg-[#FAFBFC] opacity-60 h-full cursor-default select-none">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl mb-5 grayscale">
                  📣
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-display font-bold text-[19px] text-slate-400">Marketing</h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-200 text-slate-500 rounded-full">COMING SOON</span>
                </div>
                <p className="text-[13px] text-slate-400 leading-relaxed">We're expanding into digital marketing services. Watch this space.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProcessStrip />

      <ProductCTA
        headline="Tell us what you need to build."
        sub="We'll come back with a scope, timeline, and price."
        buttonLabel="Get a Quote"
      />
    </>
  )
}
