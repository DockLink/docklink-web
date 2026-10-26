'use client';

import Link from 'next/link'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import FeatureBlock from '@/components/FeatureBlock'
import ProductCTA from '@/components/ProductCTA'

// ─── Phone frame reused from Doctor page ─────────────────────────────────────
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[200px]">
      <div className="relative bg-slate-800 rounded-[38px] p-[9px] shadow-2xl shadow-slate-300/40">
        <div className="relative bg-[#F5F8FF] rounded-[30px] overflow-hidden min-h-[400px]">
          <div className="flex items-center justify-between px-5 py-2 bg-slate-800">
            <span className="text-[8px] text-white font-semibold">9:41</span>
            <div className="w-[52px] h-[16px] bg-slate-700 rounded-full"/>
            <span className="text-[8px] text-white">📶</span>
          </div>
          {children}
        </div>
      </div>
      <div className="absolute right-[-5px] top-20 w-[4px] h-7 bg-slate-600 rounded-r-full"/>
      <div className="absolute left-[-5px] top-16 w-[4px] h-5 bg-slate-600 rounded-l-full"/>
      <div className="absolute left-[-5px] top-24 w-[4px] h-7 bg-slate-600 rounded-l-full"/>
    </div>
  )
}

// ─── Process strip ────────────────────────────────────────────────────────────
const steps = [
  { n: '01', title: 'Discovery', sub: 'Platform, features, user flows' },
  { n: '02', title: 'Design', sub: 'UI/UX prototypes & sign-off' },
  { n: '03', title: 'Build', sub: 'Flutter codebase, weekly demos' },
  { n: '04', title: 'Test', sub: 'Device testing & UAT' },
  { n: '05', title: 'Submit', sub: 'App Store & Play Store' },
]

function ProcessStrip() {
  return (
    <section className="py-24 bg-[#FAFBFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 reveal">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8] mb-3 block">Timeline</span>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <h2 className="font-display font-black text-[30px] sm:text-[38px] xl:text-[46px] leading-[1.08] tracking-[-0.02em] text-slate-900">
              In Users&apos; Hands in 6 to 12 Weeks
            </h2>
            <p className="text-[15px] text-slate-500 pb-1.5 max-w-[340px]">
              End-to-end — from first wireframe to App Store approval.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <div key={s.n} className={`reveal reveal-delay-${i + 1} bg-white border border-[#E5E7EB] rounded-[16px] p-5`}>
              <div className="font-display font-black text-[34px] gradient-text leading-none mb-2">{s.n}</div>
              <h4 className="font-display font-bold text-[15px] text-slate-900 mb-1">{s.title}</h4>
              <p className="text-[12px] text-slate-500 leading-relaxed">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Mockup screens ───────────────────────────────────────────────────────────
function CrossPlatformScreen() {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="text-center">
        <PhoneFrame>
          <div className="p-3">
            <div className="text-[9px] font-bold text-slate-800 mb-3 text-center">🍎 iOS</div>
            <div className="bg-white rounded-xl border border-slate-100 p-2.5 mb-2">
              <div className="h-2 bg-[#1D4ED8]/20 rounded mb-1.5 w-3/4"/>
              <div className="h-1.5 bg-slate-100 rounded mb-1 w-full"/>
              <div className="h-1.5 bg-slate-100 rounded mb-2.5 w-4/5"/>
              <div className="h-6 gradient-brand rounded-full"/>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[...Array(4)].map((_,i)=><div key={i} className="h-12 bg-white border border-slate-100 rounded-xl"/>)}
            </div>
          </div>
        </PhoneFrame>
        <div className="text-[9px] font-semibold text-slate-400 mt-3">iPhone 15</div>
      </div>
      <div className="text-[10px] font-bold text-slate-300">Same<br/>codebase</div>
      <div className="text-center">
        <PhoneFrame>
          <div className="p-3">
            <div className="text-[9px] font-bold text-slate-800 mb-3 text-center">🤖 Android</div>
            <div className="bg-white rounded-xl border border-slate-100 p-2.5 mb-2">
              <div className="h-2 bg-[#1D4ED8]/20 rounded mb-1.5 w-3/4"/>
              <div className="h-1.5 bg-slate-100 rounded mb-1 w-full"/>
              <div className="h-1.5 bg-slate-100 rounded mb-2.5 w-4/5"/>
              <div className="h-6 gradient-brand rounded-full"/>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[...Array(4)].map((_,i)=><div key={i} className="h-12 bg-white border border-slate-100 rounded-xl"/>)}
            </div>
          </div>
        </PhoneFrame>
        <div className="text-[9px] font-semibold text-slate-400 mt-3">Samsung S24</div>
      </div>
    </div>
  )
}

function UIScreen() {
  return (
    <PhoneFrame>
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[8px] text-slate-400">Good morning,</div>
            <div className="text-[11px] font-black text-slate-900">Nalaka</div>
          </div>
          <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold">N</div>
        </div>
        {/* Feature card with gradient */}
        <div className="gradient-brand rounded-2xl p-4 mb-3 text-white">
          <div className="text-[8.5px] font-semibold opacity-70 mb-1">Today&apos;s Revenue</div>
          <div className="text-[20px] font-black leading-none mb-1">LKR 84,200</div>
          <div className="text-[8px] opacity-70">↑ 14% vs yesterday</div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[['📦','42 Orders'],['⭐','4.9 Rating'],['📊','12 Reports'],['💬','3 Messages']].map(([ic,l])=>(
            <div key={l} className="bg-white border border-slate-100 rounded-xl p-2.5 flex items-center gap-2">
              <span className="text-base">{ic}</span>
              <span className="text-[9px] font-semibold text-slate-700">{l}</span>
            </div>
          ))}
        </div>
        <div className="bg-white border border-slate-100 rounded-xl p-2.5">
          <div className="text-[8px] font-semibold text-slate-400 mb-1.5">Recent Activity</div>
          {['Order #1184 placed','Stock alert: Item #88','Invoice sent to Emaar'].map(a=>(
            <div key={a} className="text-[8px] text-slate-600 py-1 border-b border-slate-50 last:border-0">{a}</div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}

function OfflineScreen() {
  return (
    <PhoneFrame>
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] font-bold text-slate-800">Field Rep View</div>
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400"/>
            <span className="text-[8px] font-semibold text-amber-600">Offline</span>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-2.5 mb-3 text-[8px] text-amber-700 font-semibold">
          No internet — working from local cache. Changes will sync when you&apos;re back online.
        </div>
        <div className="space-y-2">
          {[
            {client:'Emaar Holdings',task:'Site visit — complete form',done:true},
            {client:'Street82 Kandy',task:'Stock count — 14 SKUs',done:false},
            {client:'GRID Corp',task:'Demo sign-off',done:false},
          ].map(({client,task,done})=>(
            <div key={client} className="bg-white border border-slate-100 rounded-xl p-3">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[9px] font-bold text-slate-800">{client}</span>
                {done && <span className="text-[8px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 font-bold rounded-full">Done</span>}
              </div>
              <span className="text-[8px] text-slate-400">{task}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[8px] text-slate-400 text-center">
          3 changes queued to sync
        </div>
      </div>
    </PhoneFrame>
  )
}

function AppStoreScreen() {
  return (
    <div className="space-y-3 w-full max-w-[340px]">
      {[
        {store:'App Store',icon:'🍎',color:'bg-slate-900 text-white',rating:'4.8',reviews:'1.2k'},
        {store:'Google Play',icon:'🤖',color:'bg-emerald-600 text-white',rating:'4.7',reviews:'2.4k'},
      ].map(({store,icon,color,rating,reviews})=>(
        <div key={store} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-xl`}>{icon}</div>
            <div>
              <div className="text-[11px] font-bold text-slate-800">{store}</div>
              <div className="text-[10px] text-slate-400">Published by DocLink</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <div className="font-display font-black text-[24px] text-[#1D4ED8] leading-none">{rating}</div>
              <div className="flex gap-0.5 mt-0.5">{[...Array(5)].map((_,i)=><span key={i} className="text-[9px] text-amber-400">★</span>)}</div>
            </div>
            <div className="text-[11px] text-slate-500">{reviews} ratings</div>
          </div>
        </div>
      ))}
      <div className="text-[11px] text-slate-400 text-center">We handle submission, review, and version management.</div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServiceMobile() {
  useScrollReveal()
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob absolute -top-24 right-0 w-[440px] h-[440px] opacity-[0.09]"
            style={{background:'radial-gradient(circle,#1D4ED8 0%,transparent 70%)'}}/>
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="mobgrid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#1D4ED8"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#mobgrid)"/>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
                <span className="text-[11.5px] font-semibold text-[#1D4ED8]">Mobile App Development</span>
              </div>
              <h1 className="fade-up-2 font-display font-black text-[34px] sm:text-[44px] xl:text-[58px] leading-[1.05] tracking-[-0.02em] text-slate-900 mb-5">
                Take Your Business Mobile
              </h1>
              <p className="fade-up-3 text-[16px] text-slate-500 mb-8">
                iOS and Android — one codebase, native performance, and a UX your team will actually use.
              </p>
              <div className="fade-up-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 gradient-brand text-white font-semibold rounded-full text-[15px] transition-all hover:shadow-xl hover:shadow-blue-300/25 hover:-translate-y-0.5">
                  Get a Quote
                </Link>
              </div>
            </div>
            {/* Hero phone */}
            <div className="hidden lg:flex justify-center fade-up-5">
              <div className="float-slow">
                <UIScreen />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature blocks */}
      <section className="bg-white">
        <FeatureBlock
          label="Native & Cross-platform Builds"
          title="One app. Both stores. Half the build cost."
          body="We build with Flutter — Google's cross-platform framework — which delivers native performance on iOS and Android from a single codebase. You get both platforms without paying twice."
          side="left"
          screen={<CrossPlatformScreen />}
        />
        <FeatureBlock
          label="Polished UI/UX"
          title="An app that feels like it belongs on the store."
          body="We follow platform design guidelines — iOS HIG and Material 3 — so the app feels native to each platform. Smooth animations, accessible tap targets, and a visual language that matches your brand."
          side="right"
          screen={<div className="flex justify-center"><UIScreen /></div>}
        />
        <FeatureBlock
          label="Offline-first / Real-time Sync"
          title="Works without a signal. Syncs the moment it returns."
          body="Field teams, delivery drivers, and clinicians can't wait for good WiFi. We build offline-first — data is stored locally and synced automatically the moment connectivity returns, with conflict resolution handled automatically."
          side="left"
          screen={<div className="flex justify-center"><OfflineScreen /></div>}
        />
        <FeatureBlock
          label="App Store Deployment & Support"
          title="Published, rated, and maintained by us."
          body="We handle the entire submission process — developer accounts, store listings, screenshots, privacy policy. And after launch, we manage updates, OS compatibility patches, and review responses on your behalf."
          side="right"
          screen={<div className="flex items-center justify-center py-2"><AppStoreScreen /></div>}
        />
      </section>

      <ProcessStrip />

      <ProductCTA
        headline="Your business deserves a proper mobile app."
        sub="We'll scope it, price it, and build it end-to-end."
        buttonLabel="Get a Quote"
      />
    </>
  )
}
