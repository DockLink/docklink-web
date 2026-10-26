'use client'

import { useState } from 'react'
import OptionCard from './OptionCard'
import PillGroup from './PillGroup'
import ProgressBar from './ProgressBar'
import WizardHeader from './WizardHeader'

export type FindYourFitData = {
  need: 'products' | 'custom'
  start: string
  budget: string
  name: string
  email: string
  company: string
  hearAbout: string
}

const START_OPTIONS = ['As soon as possible', 'This quarter', 'Just exploring']
const BUDGET_OPTIONS = ['Under $2k/mo', '$2k–$5k/mo', '$5k+ /mo', 'Not sure yet']
const HEAR_OPTIONS = [
  'Google / Search',
  'Referral',
  'Social media',
  'Existing customer',
  'Other',
]

const CodeIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const ChartIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

export default function FindYourFitForm({
  onComplete,
}: {
  onComplete: (data: FindYourFitData) => void
}) {
  const [step, setStep] = useState(1)
  const [need, setNeed] = useState<'products' | 'custom' | ''>('')
  const [start, setStart] = useState('')
  const [budget, setBudget] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [hearAbout, setHearAbout] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const selectNeed = (value: 'products' | 'custom') => {
    setNeed(value)
    setStep(2)
  }

  const continueFromQualify = () => {
    if (!start) return
    setStep(3)
  }

  const submitDetails = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !need || submitting) return
    const data: FindYourFitData = {
      need,
      start,
      budget,
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      hearAbout,
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, website }),
      })
      if (!res.ok) throw new Error()
      onComplete(data)
    } catch {
      setError('fail')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative">
      <ProgressBar step={step} total={3} />

      <div className="pt-2">
        <WizardHeader onBack={step > 1 ? () => setStep(s => s - 1) : undefined} />

        {step === 1 && (
          <div>
            <h2 className="font-display font-bold text-[26px] sm:text-[28px] text-slate-900 leading-tight mb-2">
              What do you need?
            </h2>
            <p className="text-[14.5px] text-slate-500 mb-7 leading-relaxed">
              We&apos;ll match you to the right team and tailor your plan.
            </p>
            <div className="space-y-3">
              <OptionCard
                icon={ChartIcon}
                title="Our products"
                subtitle="ERP, POS, Doctor apps"
                onClick={() => selectNeed('products')}
              />
              <OptionCard
                icon={CodeIcon}
                title="Custom build"
                subtitle="Software, web & mobile"
                onClick={() => selectNeed('custom')}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-display font-bold text-[26px] sm:text-[28px] text-slate-900 leading-tight mb-2">
              A couple of quick things
            </h2>
            <p className="text-[14.5px] text-slate-500 mb-8 leading-relaxed">
              So your call and your plan are tailored to you.
            </p>

            <div className="space-y-7">
              <div>
                <div className="text-[14px] font-semibold text-slate-800 mb-3">
                  When do you want to start?
                </div>
                <PillGroup options={START_OPTIONS} value={start} onChange={setStart} />
              </div>

              <div>
                <div className="text-[14px] font-semibold text-slate-800 mb-3">
                  Rough monthly budget?{' '}
                  <span className="font-normal text-slate-400">(optional)</span>
                </div>
                <PillGroup options={BUDGET_OPTIONS} value={budget} onChange={setBudget} />
              </div>
            </div>

            <button
              type="button"
              disabled={!start}
              onClick={continueFromQualify}
              className="mt-10 w-full py-3.5 gradient-brand text-white font-bold text-[15px] rounded-full hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Continue
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={submitDetails}>
            <h2 className="font-display font-bold text-[26px] sm:text-[28px] text-slate-900 leading-tight mb-2">
              Who are we meeting?
            </h2>
            <p className="text-[14.5px] text-slate-500 mb-8 leading-relaxed">
              So we can look at your business properly before the call, rather than spending it on questions.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="fyf-name" className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                  Name
                </label>
                <input
                  id="fyf-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[14.5px] text-slate-800 placeholder:text-slate-400 outline-none hover:border-slate-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all"
                />
              </div>

              <div>
                <label htmlFor="fyf-email" className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                  Work email <span className="text-[#1D4ED8]">*</span>
                </label>
                <input
                  id="fyf-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[14.5px] text-slate-800 placeholder:text-slate-400 outline-none hover:border-slate-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all"
                />
              </div>

              <div>
                <label htmlFor="fyf-company" className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                  Company
                </label>
                <input
                  id="fyf-company"
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Company name"
                  autoComplete="organization"
                  className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[14.5px] text-slate-800 placeholder:text-slate-400 outline-none hover:border-slate-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all"
                />
              </div>

              <div>
                <label htmlFor="fyf-hear" className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                  How did you hear about us?{' '}
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <div className="relative">
                  <select
                    id="fyf-hear"
                    value={hearAbout}
                    onChange={e => setHearAbout(e.target.value)}
                    className={`w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[14.5px] outline-none appearance-none hover:border-slate-300 focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 transition-all ${
                      hearAbout ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    <option value="">Select one...</option>
                    {HEAR_OPTIONS.map(o => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Honeypot — hidden from people, catches bots */}
            <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor="fyf-website">Website</label>
              <input
                id="fyf-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={e => setWebsite(e.target.value)}
              />
            </div>

            {error && (
              <div role="alert" className="mt-6 px-4 py-3 rounded-xl bg-rose-50 border border-rose-100 text-[13.5px] text-rose-700 leading-relaxed">
                We couldn&apos;t send your details just now. Please email us at{' '}
                <a href="mailto:hello@doclink.lk" className="font-semibold underline">hello@doclink.lk</a>{' '}
                and we&apos;ll reply within one business day.
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 w-full py-3.5 gradient-brand text-white font-bold text-[15px] rounded-full hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitting ? 'Sending…' : 'Book my free call'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
