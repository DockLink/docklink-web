import { useState } from 'react'
import { useScrollReveal } from './Home'

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+94 11 234 5678',
    href: 'tel:+94112345678',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    label: 'Email',
    value: 'hello@doclink.lk',
    href: 'mailto:hello@doclink.lk',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    label: 'Address',
    value: '42 Bauddhaloka Mawatha, Colombo 07, Sri Lanka',
    href: 'https://maps.google.com/?q=Bauddhaloka+Mawatha+Colombo+7',
  },
]

const socials = [
  { label: '𝕏', href: '#' },
  { label: 'in', href: '#' },
  { label: 'fb', href: '#' },
]

const services = [
  'ERP / Accounting System',
  'POS System',
  'Doctor / Healthcare App',
  'Custom Software',
  'Web Development',
  'Mobile App',
  'Other',
]

export default function Contact() {
  useScrollReveal()

  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const field = (
    id: keyof typeof form,
    label: string,
    type = 'text',
    required = false
  ) => {
    const active = focused === id || form[id].length > 0
    return (
      <div className="relative">
        <input
          id={id}
          type={type}
          value={form[id]}
          required={required}
          autoComplete="off"
          onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
          onFocus={() => setFocused(id)}
          onBlur={() => setFocused(null)}
          className={`peer w-full px-4 pt-6 pb-2 bg-white border rounded-xl text-[14.5px] text-slate-800 outline-none transition-all ${
            focused === id ? 'border-[#1D4ED8] ring-2 ring-[#1D4ED8]/10' : 'border-[#E5E7EB] hover:border-slate-300'
          }`}
        />
        <label
          htmlFor={id}
          className={`absolute left-4 pointer-events-none transition-all text-slate-400 ${
            active ? 'top-2 text-[10.5px] font-semibold text-[#1D4ED8]' : 'top-1/2 -translate-y-1/2 text-[14px]'
          }`}
        >
          {label}{required && ' *'}
        </label>
      </div>
    )
  }

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="blob absolute -top-20 right-0 w-[380px] h-[380px] opacity-[0.09]"
            style={{ background: 'radial-gradient(circle,#1D4ED8 0%,transparent 70%)' }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="contact-grid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#1D4ED8"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#contact-grid)"/>
          </svg>
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-pulse"/>
            <span className="text-[11.5px] font-semibold text-[#1D4ED8] tracking-wide">Get in Touch</span>
          </div>
          <h1 className="fade-up-2 font-display font-black text-[46px] xl:text-[60px] leading-[1.05] tracking-[-0.02em] text-slate-900 mb-5">
            Let's Talk About<br/>
            <span className="gradient-text">Your Project</span>
          </h1>
          <p className="fade-up-3 text-[16px] text-slate-500 max-w-lg mx-auto leading-relaxed">
            Tell us what you're running on today. A 20-minute call is all it takes to know whether we can help.
          </p>
        </div>
      </section>

      {/* ── Form + Info split ──────────────────────────────────────────────── */}
      <section className="pb-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">

            {/* ── Form ── */}
            <div className="reveal bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#1D4ED8] flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-[22px] text-slate-900 mb-2">Message sent!</h3>
                  <p className="text-[14.5px] text-slate-500 max-w-sm mx-auto">We'll get back to you within one business day. Check your inbox at <span className="font-semibold text-slate-700">{form.email}</span>.</p>
                  <button
                    className="mt-8 px-6 py-2.5 border border-[#E5E7EB] rounded-full text-[13px] font-semibold text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-colors"
                    onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',company:'',service:'',message:'' }) }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="font-display font-bold text-[20px] text-slate-900 mb-6">Send us a message</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {field('name', 'Full Name', 'text', true)}
                    {field('email', 'Email Address', 'email', true)}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {field('phone', 'Phone Number', 'tel')}
                    {field('company', 'Company Name')}
                  </div>

                  {/* Service select */}
                  <div className="relative">
                    <select
                      id="service"
                      value={form.service}
                      onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                      onFocus={() => setFocused('service')}
                      onBlur={() => setFocused(null)}
                      className={`w-full px-4 pt-6 pb-2 bg-white border rounded-xl text-[14.5px] text-slate-800 outline-none appearance-none transition-all ${
                        focused === 'service' ? 'border-[#1D4ED8] ring-2 ring-[#1D4ED8]/10' : 'border-[#E5E7EB] hover:border-slate-300'
                      } ${!form.service ? 'text-slate-400' : ''}`}
                    >
                      <option value="">Select a service</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <label className={`absolute left-4 pointer-events-none transition-all ${form.service || focused === 'service' ? 'top-2 text-[10.5px] font-semibold text-[#1D4ED8]' : 'top-1/2 -translate-y-1/2 text-[14px] text-slate-400'}`}>
                      What are you looking for?
                    </label>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </div>

                  {/* Textarea */}
                  <div className="relative">
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      required
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className={`peer w-full px-4 pt-6 pb-2 bg-white border rounded-xl text-[14.5px] text-slate-800 outline-none resize-none transition-all ${
                        focused === 'message' ? 'border-[#1D4ED8] ring-2 ring-[#1D4ED8]/10' : 'border-[#E5E7EB] hover:border-slate-300'
                      }`}
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-4 pointer-events-none transition-all text-slate-400 ${
                        focused === 'message' || form.message.length > 0 ? 'top-2 text-[10.5px] font-semibold text-[#1D4ED8]' : 'top-4 text-[14px]'
                      }`}
                    >
                      Tell us about your project *
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 gradient-brand text-white font-bold text-[15px] rounded-full hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
                  >
                    Send Message
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </button>
                  <p className="text-center text-[12px] text-slate-400">We respond within one business day.</p>
                </form>
              )}
            </div>

            {/* ── Info panel ── */}
            <div className="space-y-6 reveal">
              {/* Contact details */}
              <div className="bg-[#F5F8FF] rounded-[20px] border border-[#E5E7EB] p-7">
                <h3 className="font-display font-bold text-[17px] text-slate-900 mb-6">Contact Information</h3>
                <div className="space-y-5">
                  {contactInfo.map(c => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.label === 'Address' ? '_blank' : undefined}
                      rel="noreferrer"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#1D4ED8] shrink-0 shadow-sm group-hover:bg-[#1D4ED8] group-hover:text-white group-hover:border-[#1D4ED8] transition-all">
                        {c.icon}
                      </div>
                      <div className="pt-0.5">
                        <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 mb-1">{c.label}</div>
                        <div className="text-[14px] text-slate-700 group-hover:text-[#1D4ED8] transition-colors leading-snug">{c.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-7 pt-6 border-t border-[#E5E7EB]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 mb-3">Follow Us</div>
                  <div className="flex gap-2">
                    {socials.map(s => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="w-9 h-9 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[12px] font-bold text-slate-500 hover:bg-[#1D4ED8] hover:text-white hover:border-[#1D4ED8] transition-all shadow-sm"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-[20px] border border-[#E5E7EB] overflow-hidden bg-[#F5F8FF] h-[220px] relative shadow-sm">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Grid lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1D4ED8" strokeWidth="0.8"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#map-grid)"/>
                  </svg>
                  {/* Road lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#1D4ED8" strokeWidth="6" strokeLinecap="round"/>
                    <line x1="38%" y1="0" x2="38%" y2="100%" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round"/>
                    <line x1="68%" y1="0" x2="68%" y2="100%" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  {/* Pin */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#1D4ED8] flex items-center justify-center shadow-lg mb-2">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div className="bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 shadow-md text-center">
                      <div className="text-[10px] font-bold text-slate-800">DocLink Technologies</div>
                      <div className="text-[9.5px] text-slate-400 mt-0.5">Bauddhaloka Mawatha, Colombo 07</div>
                    </div>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Bauddhaloka+Mawatha+Colombo+7"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 bg-white border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-[11px] font-semibold text-[#1D4ED8] hover:bg-blue-50 transition-colors shadow-sm"
                >
                  Open in Maps ↗
                </a>
              </div>

              {/* Response SLA card */}
              <div className="bg-white rounded-[20px] border border-[#E5E7EB] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"/>
                  <span className="text-[13px] font-semibold text-slate-800">Currently accepting new projects</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    ['Response time', '< 1 business day'],
                    ['Discovery call', 'Free, 20 minutes'],
                    ['Office hours', 'Mon–Fri, 9am–6pm LKT'],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between text-[13px]">
                      <span className="text-slate-400">{l}</span>
                      <span className="font-semibold text-slate-700">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
