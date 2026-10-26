'use client';

import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const cases = [
  {
    id: 'emaar',
    client: 'Emaar',
    industry: 'Payroll & HR',
    gradient: 'from-[#1e3a8a] to-[#1D4ED8]',
    headline: 'How Emaar automated payroll for 300 employees and cut processing time to minutes',
    stats: [
      { number: '300', label: 'employees on automated payroll' },
      { number: '200 hrs', label: 'saved per month on payroll processing' },
    ],
  },
  {
    id: 'street82',
    client: 'Street82',
    industry: 'Retail ERP & Inventory',
    gradient: 'from-[#1D4ED8] to-[#0284c7]',
    headline: 'How Street82 cut stock discrepancies to near zero across three branches',
    stats: [
      { number: '94%', label: 'reduction in inventory counting errors' },
      { number: '3 wks', label: 'from kickoff to full system deployment' },
    ],
  },
  {
    id: 'grid',
    client: 'GRID',
    industry: 'Custom Software Platform',
    gradient: 'from-[#1e3a8a] to-[#1D4ED8]',
    headline: 'How GRID replaced six internal tools with one custom platform and actually got their team to use it',
    stats: [
      { number: '6', label: 'legacy tools replaced by a single system' },
      { number: '4 mo', label: 'end-to-end delivery including training' },
    ],
  },
  {
    id: 'a-design',
    client: 'A-Design',
    industry: 'Project & Client Management',
    gradient: 'from-[#1D4ED8] to-[#0284c7]',
    headline: 'How A-Design tracks every client, project, and invoice in one place — and hasn\'t lost an invoice since',
    stats: [
      { number: '100%', label: 'of projects tracked digitally, no spreadsheets' },
      { number: 'LKR 0', label: 'in invoices lost or uncollected since launch' },
    ],
  },
]

export default function CaseStudies() {
  useScrollReveal()
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="blob absolute -top-24 right-0 w-[440px] h-[440px] opacity-[0.10]"
            style={{ background: 'radial-gradient(circle,#1D4ED8 0%,transparent 70%)' }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="csgrid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#1D4ED8"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#csgrid)"/>
          </svg>
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-pulse"/>
            <span className="text-[11.5px] font-semibold text-[#1D4ED8] tracking-wide">Case Studies</span>
          </div>
          <h1 className="fade-up-2 font-display font-black text-[37px] sm:text-[48px] xl:text-[62px] leading-[1.05] tracking-[-0.02em] text-slate-900 mb-5">
            Real Businesses,{' '}
            <span className="gradient-text">Real Results</span>
          </h1>
          <p className="fade-up-3 text-[16px] text-slate-500 max-w-xl mx-auto">
            Four Sri Lankan businesses that replaced paper, spreadsheets, and guesswork with software that works.
          </p>
        </div>
      </section>

      {/* Case study grid */}
      <section className="pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {cases.map((cs, i) => (
              <Link
                key={cs.id}
                href={`/case-studies/${cs.id}`}
                className={`group block rounded-[20px] border border-[#E5E7EB] bg-white overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/70 hover:border-slate-200 reveal reveal-delay-${(i % 2) + 1}`}
              >
                {/* Gradient header */}
                <div className={`h-[140px] bg-gradient-to-br ${cs.gradient} relative overflow-hidden`}>
                  {/* Subtle dot texture */}
                  <div className="absolute inset-0 opacity-[0.08]">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs><pattern id={`dots-${cs.id}`} width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="white"/></pattern></defs>
                      <rect width="100%" height="100%" fill={`url(#dots-${cs.id})`}/>
                    </svg>
                  </div>
                  {/* Client initial mark */}
                  <div className="absolute bottom-5 left-6 flex items-end gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center">
                      <span className="font-display font-black text-white text-xl leading-none">
                        {cs.client[0]}
                      </span>
                    </div>
                    <span className="font-display font-black text-white/90 text-[22px] leading-none pb-0.5">
                      {cs.client}
                    </span>
                  </div>
                  {/* Industry tag */}
                  <div className="absolute top-5 right-5">
                    <span className="inline-flex items-center px-3 py-1 bg-white/15 border border-white/25 rounded-full text-[11px] font-semibold text-white backdrop-blur-sm">
                      {cs.industry}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-7">
                  <h2 className="font-display font-bold text-[17px] text-slate-900 leading-snug mb-5">
                    {cs.headline}
                  </h2>

                  {/* Divider */}
                  <div className="h-px bg-[#E5E7EB] mb-5"/>

                  {/* Hard numbers */}
                  <div className="grid grid-cols-2 gap-5 mb-5">
                    {cs.stats.map((s) => (
                      <div key={s.label}>
                        <div className="font-display font-black text-[30px] xl:text-[34px] text-[#1D4ED8] leading-none mb-1.5">
                          {s.number}
                        </div>
                        <div className="text-[12.5px] text-slate-500 leading-snug">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Read more link */}
                  <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1D4ED8] group-hover:gap-3 transition-all">
                    Read case study
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
