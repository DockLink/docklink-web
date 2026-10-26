'use client';

import Link from 'next/link'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import FeatureBlock from '@/components/FeatureBlock'
import MiniScreen from '@/components/MiniScreen'
import ProductCTA from '@/components/ProductCTA'

// ─── Process strip ────────────────────────────────────────────────────────────
const steps = [
  { n: '01', title: 'Discovery', sub: 'Goals, audience, pages' },
  { n: '02', title: 'Design', sub: 'Wireframes & visual design' },
  { n: '03', title: 'Build', sub: 'Coded, tested, optimised' },
  { n: '04', title: 'Launch', sub: 'Domain, hosting, go live' },
]

function ProcessSection() {
  return (
    <section className="py-24 bg-[#FAFBFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 reveal">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8] mb-3 block">Timeline</span>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <h2 className="font-display font-black text-[30px] sm:text-[38px] xl:text-[46px] leading-[1.08] tracking-[-0.02em] text-slate-900">
              Live in 2 to 6 Weeks
            </h2>
            <p className="text-[15px] text-slate-500 pb-1.5 max-w-[360px]">
              Depending on scope — a landing page ships in two weeks, a full marketing site in six.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.n} className={`reveal reveal-delay-${i + 1} relative`}>
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 h-full">
                <div className="font-display font-black text-[36px] gradient-text leading-none mb-3">{s.n}</div>
                <h4 className="font-display font-bold text-[17px] text-slate-900 mb-1">{s.title}</h4>
                <p className="text-[13px] text-slate-500">{s.sub}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-2.5 z-10">
                  <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Mockup screens ───────────────────────────────────────────────────────────
function SEOScreen() {
  return (
    <MiniScreen url="search.google.com/search-console">
      <div className="mb-3">
        <div className="text-[9px] font-semibold text-slate-400 mb-1.5">Search Performance — Last 28 Days</div>
        <div className="flex items-end gap-1 h-12">
          {[20,32,28,45,38,55,42,60,50,72,65,80,70,88].map((h,i)=>(
            <div key={i} className="flex-1 rounded-t-sm"
              style={{height:`${h}%`,background:i>=12?'linear-gradient(180deg,#1D4ED8,#38bdf8)':'#E0E7FF'}}/>
          ))}
        </div>
      </div>
      {[['Impressions','24,810','↑ 34%'],['Clicks','1,204','↑ 28%'],['Avg Position','4.2','↑ 1.8']].map(([l,v,d])=>(
        <div key={l} className="flex justify-between py-1.5 border-b border-slate-50 last:border-0">
          <span className="text-[9px] text-slate-500">{l}</span>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-slate-700">{v}</span>
            <span className="text-[8.5px] font-semibold text-emerald-500">{d}</span>
          </div>
        </div>
      ))}
    </MiniScreen>
  )
}

function CWVScreen() {
  return (
    <MiniScreen url="pagespeed.web.dev">
      <div className="text-[9px] font-semibold text-slate-500 mb-3">Core Web Vitals — Mobile</div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[['LCP','1.8s','Good'],['FID','< 10ms','Good'],['CLS','0.02','Good']].map(([m,v,s])=>(
          <div key={m} className="text-center bg-emerald-50 border border-emerald-100 rounded-xl p-2">
            <div className="text-[8px] text-emerald-600 font-semibold mb-0.5">{m}</div>
            <div className="text-[10px] font-black text-emerald-700">{v}</div>
            <div className="text-[7.5px] text-emerald-500">{s}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#F5F8FF] rounded-lg p-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-semibold text-slate-600">Performance Score</span>
          <span className="text-[10px] font-black text-emerald-600">96</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-emerald-400" style={{width:'96%'}}/>
        </div>
      </div>
    </MiniScreen>
  )
}

function ConversionScreen() {
  return (
    <MiniScreen url="app.doclink.lk/web-demo">
      <div className="text-[9px] font-semibold text-slate-500 mb-3">Conversion Funnel</div>
      {[
        {stage:'Visited landing page',n:4820,pct:100,w:'100%'},
        {stage:'Scrolled past hero',n:3614,pct:75,w:'75%'},
        {stage:'Clicked CTA button',n:1446,pct:30,w:'30%'},
        {stage:'Submitted enquiry',n:482,pct:10,w:'10%'},
      ].map(({stage,n,pct,w})=>(
        <div key={stage} className="mb-2">
          <div className="flex justify-between text-[8.5px] mb-0.5">
            <span className="text-slate-500">{stage}</span>
            <span className="font-bold text-slate-700">{n.toLocaleString()} <span className="text-slate-400">({pct}%)</span></span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#38bdf8]" style={{width:w}}/>
          </div>
        </div>
      ))}
    </MiniScreen>
  )
}

function ResponsiveScreen() {
  return (
    <div className="flex items-end justify-center gap-4">
      {/* Desktop */}
      <div className="w-[140px] bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="bg-[#F5F8FF] border-b border-slate-100 px-2 py-1.5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-200"/><span className="w-1.5 h-1.5 rounded-full bg-slate-200"/><span className="w-1.5 h-1.5 rounded-full bg-slate-200"/>
        </div>
        <div className="p-2">
          <div className="h-4 bg-[#1D4ED8]/10 rounded mb-1.5 w-3/4"/>
          <div className="h-2 bg-slate-100 rounded mb-1 w-full"/>
          <div className="h-2 bg-slate-100 rounded mb-2 w-4/5"/>
          <div className="h-5 gradient-brand rounded-full w-1/2 mb-2"/>
          <div className="grid grid-cols-3 gap-1">
            {[...Array(3)].map((_,i)=><div key={i} className="h-8 bg-[#F5F8FF] border border-slate-100 rounded"/>)}
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="w-[56px] bg-white border-2 border-slate-300 rounded-[14px] overflow-hidden shadow-md">
        <div className="bg-slate-800 h-3 flex items-center justify-center">
          <div className="w-8 h-1.5 bg-slate-600 rounded-full"/>
        </div>
        <div className="p-1.5">
          <div className="h-2.5 bg-[#1D4ED8]/10 rounded mb-1 w-full"/>
          <div className="h-1.5 bg-slate-100 rounded mb-0.5 w-full"/>
          <div className="h-1.5 bg-slate-100 rounded mb-1.5 w-4/5"/>
          <div className="h-3.5 gradient-brand rounded-full w-full mb-1.5"/>
          <div className="space-y-1">
            {[...Array(2)].map((_,i)=><div key={i} className="h-6 bg-[#F5F8FF] border border-slate-100 rounded"/>)}
          </div>
        </div>
      </div>
      <div className="text-center ml-2">
        <div className="text-[9px] font-semibold text-slate-500 leading-tight">Every device.<br/>Same experience.</div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServiceWeb() {
  useScrollReveal()
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob absolute -top-24 right-0 w-[440px] h-[440px] opacity-[0.09]"
            style={{background:'radial-gradient(circle,#1D4ED8 0%,transparent 70%)'}}/>
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="webgrid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#1D4ED8"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#webgrid)"/>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-[620px] mb-12">
            <div className="fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
              <span className="text-[11.5px] font-semibold text-[#1D4ED8]">Web Development</span>
            </div>
            <h1 className="fade-up-2 font-display font-black text-[34px] sm:text-[44px] xl:text-[58px] leading-[1.05] tracking-[-0.02em] text-slate-900 mb-5">
              A Website That Actually Brings You Customers
            </h1>
            <p className="fade-up-3 text-[16px] text-slate-500 mb-8">
              Fast, search-optimised, and designed to convert — not just to look good on Behance.
            </p>
            <div className="fade-up-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 gradient-brand text-white font-semibold rounded-full text-[15px] transition-all hover:shadow-xl hover:shadow-blue-300/25 hover:-translate-y-0.5">
                Get a Quote
              </Link>
            </div>
          </div>
          {/* Hero browser mockup */}
          <div className="fade-up-5 max-w-5xl">
            <MiniScreen url="your-business.com">
              <div className="bg-[#F5F8FF] rounded-lg overflow-hidden">
                {/* Simulated landing page */}
                <div className="gradient-brand px-8 py-10 text-white">
                  <div className="text-[11px] font-semibold opacity-60 mb-2 uppercase tracking-widest">Your Business Name</div>
                  <div className="font-display font-black text-[22px] mb-2 max-w-[320px] leading-tight">The Headline That Gets People to Stay</div>
                  <div className="text-[11px] opacity-75 mb-5 max-w-[280px]">One-line subhead that explains the value clearly.</div>
                  <div className="flex gap-2">
                    <div className="px-4 py-2 bg-white text-[#1D4ED8] text-[10px] font-bold rounded-full">Get Started →</div>
                    <div className="px-4 py-2 border border-white/30 text-white text-[10px] font-semibold rounded-full">Learn More</div>
                  </div>
                </div>
                <div className="px-8 py-6">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[...Array(3)].map((_,i)=>(
                      <div key={i} className="bg-white border border-slate-100 rounded-xl p-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 mb-2"/>
                        <div className="h-2 bg-slate-200 rounded w-3/4 mb-1.5"/>
                        <div className="h-1.5 bg-slate-100 rounded w-full mb-1"/>
                        <div className="h-1.5 bg-slate-100 rounded w-4/5"/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MiniScreen>
          </div>
        </div>
      </section>

      {/* Feature blocks */}
      <section className="bg-white">
        <FeatureBlock
          label="Technical SEO Foundation"
          title="Google finds you before your competitors."
          body="Semantic HTML, structured data, optimised meta tags, auto-generated sitemaps, and canonical URLs wired in from day one — not bolted on after launch."
          side="left"
          screen={<SEOScreen />}
        />
        <FeatureBlock
          label="Core Web Vitals"
          title="Loads in under two seconds on mobile."
          body="We optimise images, minify assets, and implement code-splitting as standard. Our sites score 90+ on PageSpeed Insights — which Google rewards with higher rankings."
          side="right"
          screen={<CWVScreen />}
        />
        <FeatureBlock
          label="Conversion-focused UX"
          title="Visitors become enquiries, not bounces."
          body="We design every page around a single next action — a call, a form, a WhatsApp message. Clear hierarchy, minimal friction, and strategic CTA placement backed by real analytics."
          side="left"
          screen={<ConversionScreen />}
        />
        <FeatureBlock
          label="Responsive, Mobile-first Build"
          title="Perfect on every screen — by default."
          body="We build mobile-first and test on real devices before handoff. Because 70% of your visitors in Sri Lanka are on a phone, not a desktop."
          side="right"
          screen={<ResponsiveScreen />}
        />
      </section>

      <ProcessSection />

      <ProductCTA
        headline="Ready to stop losing customers to a slow website?"
        sub="We'll scope and price your project in one call."
        buttonLabel="Get a Quote"
      />
    </>
  )
}
