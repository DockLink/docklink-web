'use client';

import type { ReactNode } from 'react'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import TrustStrip from '@/components/TrustStrip'
import ProductCTA from '@/components/ProductCTA'
import { DocLinkIcon, type DocLinkIconName } from '@/components/icons/DocLinkIcons'

// ─── DocLink-specific ERP mockup (not generic SaaS tiles) ─────────────────────
function ERPMockup() {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-100 shadow-lg overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#FAFBFC] border-b border-slate-100">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200"/><span className="w-2.5 h-2.5 rounded-full bg-slate-200"/><span className="w-2.5 h-2.5 rounded-full bg-slate-200"/>
        <span className="ml-3 text-[10px] text-slate-400 font-medium">app.doclink.lk/erp</span>
      </div>
      <div className="grid grid-cols-5 min-h-[180px]">
        <div className="col-span-2 bg-[#0F172A] p-3 space-y-1">
          <div className="text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">Modules</div>
          {['CRM', 'Invoices', 'Inventory', 'Payroll'].map((m, i) => (
            <div
              key={m}
              className={`px-2 py-1.5 rounded-md text-[9px] font-medium ${
                i === 2 ? 'bg-[#1D4ED8] text-white' : 'text-slate-400'
              }`}
            >
              {m}
            </div>
          ))}
        </div>
        <div className="col-span-3 p-3 bg-[#F5F8FF]">
          <div className="text-[9px] font-semibold text-slate-500 mb-2">Inventory — Emaar Warehouse</div>
          <div className="bg-white rounded-lg border border-slate-100 divide-y divide-slate-50">
            {[
              ['SKU-4821', 'Office Chair', '142', 'OK'],
              ['SKU-3301', 'A4 Paper', '18', 'Low'],
              ['SKU-5590', 'Desk Lamp', '0', 'Out'],
            ].map(([sku, name, qty, status]) => (
              <div key={sku} className="flex items-center justify-between px-2.5 py-1.5">
                <div>
                  <div className="text-[9px] font-semibold text-slate-700">{name}</div>
                  <div className="text-[7.5px] text-slate-400">{sku}</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-bold text-slate-800">{qty}</div>
                  <div className={`text-[7.5px] font-semibold ${
                    status === 'OK' ? 'text-emerald-500' : status === 'Low' ? 'text-amber-500' : 'text-rose-500'
                  }`}>{status}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[8px] px-1">
            <span className="text-slate-400">EPF/ETF ready payroll</span>
            <span className="font-semibold text-[#1D4ED8]">LKR synced</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── POS mockup ───────────────────────────────────────────────────────────────
function POSMockup() {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-100 shadow-lg overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#FAFBFC] border-b border-slate-100">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200"/><span className="w-2.5 h-2.5 rounded-full bg-slate-200"/><span className="w-2.5 h-2.5 rounded-full bg-slate-200"/>
        <span className="ml-3 text-[10px] text-slate-400 font-medium">DocLink POS — Street82</span>
      </div>
      <div className="grid grid-cols-5 h-[160px]">
        <div className="col-span-3 p-3 bg-[#F5F8FF] border-r border-slate-100">
          <div className="text-[8.5px] font-semibold text-slate-400 mb-2">Quick sale</div>
          <div className="grid grid-cols-3 gap-1.5">
            {['Shirt L', 'Jeans 32', 'Sneaker 9', 'Cap Red', 'Belt M', 'Socks 3pk'].map(p=>(
              <div key={p} className="bg-white border border-slate-100 rounded-lg p-1.5 text-center hover:border-blue-200 cursor-pointer transition-colors">
                <div className="w-6 h-6 mx-auto mb-0.5 rounded bg-blue-50 text-[#1D4ED8] flex items-center justify-center">
                  <DocLinkIcon name="pos" size={12} />
                </div>
                <div className="text-[7.5px] text-slate-600 font-medium leading-tight">{p}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 p-3 flex flex-col">
          <div className="text-[8.5px] font-semibold text-slate-400 mb-1.5">Current Sale</div>
          <div className="space-y-1 flex-1">
            {[['Shirt L','× 2','LKR 3,200'],['Jeans 32','× 1','LKR 4,500']].map(([n,q,p])=>(
              <div key={n} className="flex justify-between text-[8px]">
                <span className="text-slate-600">{n} <span className="text-slate-400">{q}</span></span>
                <span className="font-semibold text-slate-700">{p}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-2 mt-1">
            <div className="flex justify-between text-[9px] font-bold text-slate-800 mb-2">
              <span>Total</span><span>LKR 7,700</span>
            </div>
            <div className="w-full py-1.5 gradient-brand text-white text-[9px] font-bold rounded-lg text-center cursor-pointer">
              Charge →
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Doctor App mockup ────────────────────────────────────────────────────────
function DoctorMockup() {
  return (
    <div className="w-[180px] bg-white rounded-[22px] border-4 border-slate-200 shadow-xl overflow-hidden mx-auto">
      <div className="bg-slate-800 text-white text-center py-1.5 px-3 flex items-center justify-between">
        <span className="text-[7px]">9:41</span>
        <div className="w-10 h-3 bg-slate-700 rounded-full mx-auto" />
        <span className="text-[7px] opacity-60">LTE</span>
      </div>
      <div className="bg-[#F5F8FF] p-2.5">
        <div className="text-[8px] font-bold text-slate-800 mb-2">Dr. Perera&apos;s Practice</div>
        <div className="bg-white rounded-xl p-2 border border-slate-100 mb-2">
          <div className="text-[7px] font-semibold text-slate-400 mb-1.5">Today&apos;s Appointments</div>
          {[['9:00 AM','K. Silva','Follow-up'],['10:30 AM','R. Fernando','Consult'],['2:00 PM','M. Perera','Review']].map(([t,n,r])=>(
            <div key={n} className="flex items-center gap-1.5 py-1 border-b border-slate-50 last:border-0">
              <div className="w-1 h-5 rounded-full bg-[#1D4ED8] shrink-0"/>
              <div>
                <div className="text-[7px] font-semibold text-slate-700">{n}</div>
                <div className="text-[6.5px] text-slate-400">{t} · {r}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {([
            ['Records', 'doctor'],
            ['Rx', 'invoice'],
            ['Schedule', 'estimate'],
            ['Reports', 'accounting'],
          ] as [string, DocLinkIconName][]).map(([lb, ic]) => (
            <div key={lb} className="bg-white border border-slate-100 rounded-lg p-2 flex flex-col items-center gap-1">
              <span className="text-[#1D4ED8]"><DocLinkIcon name={ic} size={14} /></span>
              <span className="text-[7px] font-semibold text-slate-500">{lb}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Product cards ────────────────────────────────────────────────────────────
const products: {
  icon: DocLinkIconName
  name: string
  desc: string
  link: string
  cta: string
  mockup: ReactNode
  bg: string
}[] = [
  {
    icon: 'erp',
    name: 'ERP System',
    desc: 'All-in-one system for accounting, inventory, HR and payroll',
    link: '/products/erp',
    cta: 'Explore ERP',
    mockup: <ERPMockup />,
    bg: 'from-blue-50 to-indigo-50/60',
  },
  {
    icon: 'pos',
    name: 'POS System',
    desc: 'Smart sales and inventory for retail and restaurants',
    link: '/products/pos',
    cta: 'Explore POS',
    mockup: <POSMockup />,
    bg: 'from-sky-50 to-blue-50/60',
  },
  {
    icon: 'doctor',
    name: 'Doctor App',
    desc: 'Mobile practice management for clinicians',
    link: '/products/doctor',
    cta: 'Explore App',
    mockup: <DoctorMockup />,
    bg: 'from-slate-50 to-blue-50/40',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Products() {
  useScrollReveal()
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob absolute -top-24 right-0 w-[440px] h-[440px] opacity-[0.12]"
            style={{background:'radial-gradient(circle,#1D4ED8 0%,transparent 70%)'}}/>
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="pgrid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#1D4ED8"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#pgrid)"/>
          </svg>
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-pulse"/>
            <span className="text-[11.5px] font-semibold text-[#1D4ED8] tracking-wide">Our Products</span>
          </div>
          <h1 className="fade-up-2 font-display font-black text-[37px] sm:text-[48px] xl:text-[60px] leading-[1.06] tracking-[-0.02em] text-slate-900 mb-5">
            Software for the Way Your<br className="hidden md:block"/>
            <span className="gradient-text"> Business Actually Runs</span>
          </h1>
          <p className="fade-up-3 text-[16px] text-slate-500 max-w-xl mx-auto">
            Three products. One ecosystem. Built for Sri Lankan SMEs who&apos;ve outgrown spreadsheets.
          </p>
        </div>
      </section>

      {/* Product Cards */}
      <section className="py-20 bg-[#FAFBFC]">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {products.map((p) => (
            <div key={p.name} className={`reveal rounded-[20px] border border-[#E5E7EB] bg-gradient-to-br ${p.bg} overflow-hidden`}>
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-10 xl:p-14 flex flex-col justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-blue-100 shadow-sm flex items-center justify-center text-[#1D4ED8] mb-6">
                    <DocLinkIcon name={p.icon} size={28} />
                  </div>
                  <h2 className="font-display font-black text-[32px] xl:text-[38px] leading-[1.1] tracking-[-0.02em] text-slate-900 mb-3">{p.name}</h2>
                  <p className="text-[16px] text-slate-500 mb-8 leading-relaxed">{p.desc}</p>
                  <Link
                    href={p.link}
                    className="self-start inline-flex items-center gap-2 px-7 py-3.5 gradient-brand text-white font-semibold rounded-full text-[14.5px] transition-all hover:shadow-xl hover:shadow-blue-300/25 hover:-translate-y-0.5"
                  >
                    {p.cta} →
                  </Link>
                </div>
                <div className="hidden lg:flex items-center justify-center p-8 xl:p-12">
                  <div className="w-full max-w-[380px]">
                    {p.mockup}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TrustStrip />

      <ProductCTA
        headline="Not sure which product fits?"
        sub="We'll tell you in 20 minutes — no sales pitch."
      />
    </>
  )
}
