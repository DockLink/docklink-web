'use client';

import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { caseStudyData } from '@/data/caseStudies'

export default function CaseStudyDetail({ id }: { id: string }) {
  useScrollReveal()
  const cs = caseStudyData[id]

  if (!cs) return null

  return (
    <>
      {/* ── Back link ──────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-4">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-[#1D4ED8] transition-colors group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          All Case Studies
        </Link>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pt-6 pb-14">
        {/* Industry tag */}
        <div className="fade-up-1 flex items-center gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[11.5px] font-semibold text-[#1D4ED8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]"/>
            {cs.industry}
          </span>
        </div>

        {/* Headline */}
        <h1 className="fade-up-2 font-display font-black text-[30px] sm:text-[38px] xl:text-[50px] leading-[1.06] tracking-[-0.02em] text-slate-900 mb-5 max-w-3xl">
          {cs.headline}
        </h1>

        {/* Subhead */}
        <p className="fade-up-3 text-[16.5px] text-slate-500 leading-relaxed max-w-2xl mb-7">
          {cs.subhead}
        </p>

        {/* Meta line */}
        <div className="fade-up-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-400 font-medium border-t border-[#E5E7EB] pt-6">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            {cs.industry}
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-200"/>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            {cs.location}
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-200"/>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            {cs.date}
          </span>
        </div>
      </section>

      {/* ── Stat bar ───────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#1D4ED8] py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id={`sdots-${cs.id}`} width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="white"/></pattern></defs>
            <rect width="100%" height="100%" fill={`url(#sdots-${cs.id})`}/>
          </svg>
        </div>
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {cs.stats.map((s, i) => (
              <div key={i} className="text-center reveal">
                <div className="font-display font-black text-[31px] sm:text-[40px] xl:text-[52px] text-white leading-none mb-2">
                  {s.number}
                </div>
                <div className="text-[13px] text-white/65 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Narrative body ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="space-y-14">
          {cs.sections.map((s, i) => (
            <div key={i} className="reveal">
              <h2 className="font-display font-bold text-[22px] text-slate-900 mb-4 leading-snug">
                {s.heading}
              </h2>
              <p className="text-[16px] text-slate-500 leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pull-quote ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F8FF] border-y border-[#E5E7EB] py-16">
        <div className="max-w-3xl mx-auto px-6 reveal">
          <svg className="w-10 h-10 text-[#1D4ED8] opacity-30 mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <blockquote className="font-display font-medium text-[22px] xl:text-[26px] text-slate-800 leading-snug italic mb-8">
            &ldquo;{cs.quote.text}&rdquo;
          </blockquote>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${cs.avatarColor} flex items-center justify-center shrink-0`}>
              <span className="font-display font-black text-white text-[16px] leading-none">{cs.avatarInitials}</span>
            </div>
            <div>
              <div className="font-semibold text-[14px] text-slate-900">{cs.quote.name}</div>
              <div className="text-[12.5px] text-slate-400 mt-0.5">{cs.quote.title}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product screenshot ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20 reveal">
        <div className="text-center mb-10">
          <span className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-slate-400">The Platform</span>
          <h2 className="font-display font-bold text-[26px] text-slate-900 mt-2">
            What {cs.client} sees every morning
          </h2>
        </div>
        {cs.screen}
      </section>

      {/* ── Client photo / avatar card ─────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="reveal flex items-center gap-6 bg-white rounded-[20px] border border-[#E5E7EB] p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${cs.avatarColor} flex items-center justify-center shrink-0 shadow-lg`}>
            <span className="font-display font-black text-white text-[28px] leading-none">{cs.avatarInitials}</span>
          </div>
          <div>
            <div className="font-display font-bold text-[17px] text-slate-900">{cs.quote.name}</div>
            <div className="text-[13px] text-slate-400 mt-1">{cs.photoCaption}</div>
            <div className="mt-3 flex gap-3">
              {['linkedin.com', 'twitter.com'].map((sn) => (
                <a key={sn} href="#" className="text-[11px] font-semibold text-slate-400 hover:text-[#1D4ED8] transition-colors">
                  {sn.split('.')[0].charAt(0).toUpperCase() + sn.split('.')[0].slice(1)} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA band ───────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1e3a8a] to-[#1D4ED8] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id={`ctadots-${cs.id}`} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="white"/></pattern></defs>
            <rect width="100%" height="100%" fill={`url(#ctadots-${cs.id})`}/>
          </svg>
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-black text-[36px] xl:text-[46px] leading-[1.08] tracking-[-0.02em] text-white mb-4">
            Want results like this?
          </h2>
          <p className="text-[16px] text-white/70 mb-10 max-w-xl mx-auto">
            Tell us what you&apos;re running on today. A 20-minute call is all it takes to know whether we can help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D4ED8] font-bold text-[15px] rounded-full hover:bg-blue-50 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Book a Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/25 text-white font-semibold text-[15px] rounded-full hover:bg-white/20 transition-all"
            >
              See all case studies
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
