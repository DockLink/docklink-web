'use client';

import Link from 'next/link'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import TrustStrip from '@/components/TrustStrip'
import ProductCTA from '@/components/ProductCTA'

// ─── Phone frame mockup ───────────────────────────────────────────────────────
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[240px]">
      {/* Device outer */}
      <div className="relative bg-slate-800 rounded-[40px] p-[10px] shadow-2xl shadow-slate-400/30">
        {/* Screen */}
        <div className="relative bg-[#F5F8FF] rounded-[32px] overflow-hidden min-h-[480px]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-slate-800">
            <span className="text-[9px] text-white font-semibold">9:41</span>
            <div className="w-[60px] h-[18px] bg-slate-700 rounded-full"/>
            <div className="flex items-center gap-1">
              <span className="text-[8px] text-white">📶</span>
              <span className="text-[8px] text-white">🔋</span>
            </div>
          </div>
          {children}
        </div>
      </div>
      {/* Side buttons */}
      <div className="absolute right-[-6px] top-20 w-[5px] h-8 bg-slate-600 rounded-r-full"/>
      <div className="absolute left-[-6px] top-16 w-[5px] h-6 bg-slate-600 rounded-l-full"/>
      <div className="absolute left-[-6px] top-24 w-[5px] h-8 bg-slate-600 rounded-l-full"/>
    </div>
  )
}

function DoctorAppHome() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[8.5px] text-slate-500">Good morning,</div>
          <div className="text-[12px] font-black text-slate-900">Dr. Perera</div>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#1D4ED8] flex items-center justify-center text-white text-sm font-bold">DP</div>
      </div>
      {/* Today summary */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[['📅','12','Appointments'],['🧑‍⚕️','8','Completed'],['💊','4','Prescriptions'],['🔔','2','Follow-ups']].map(([ic,v,l])=>(
          <div key={l} className="bg-white rounded-xl p-2.5 border border-slate-100 text-center">
            <div className="text-lg mb-0.5">{ic}</div>
            <div className="text-[14px] font-black text-[#1D4ED8]">{v}</div>
            <div className="text-[8px] text-slate-400">{l}</div>
          </div>
        ))}
      </div>
      {/* Next appointments */}
      <div className="bg-white rounded-xl border border-slate-100 p-3">
        <div className="text-[9px] font-semibold text-slate-400 mb-2">Next Appointments</div>
        {[
          {t:'10:00 AM',n:'K. Silva',r:'General Consult',dot:'bg-[#1D4ED8]'},
          {t:'10:45 AM',n:'R. Fernando',r:'Follow-up',dot:'bg-emerald-400'},
          {t:'11:30 AM',n:'M. Perera',r:'Lab Review',dot:'bg-slate-300'},
        ].map(({t,n,r,dot})=>(
          <div key={n} className="flex items-center gap-2.5 py-1.5 border-b border-slate-50 last:border-0">
            <div className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`}/>
            <div className="flex-1">
              <div className="text-[9px] font-semibold text-slate-800">{n}</div>
              <div className="text-[8px] text-slate-400">{r}</div>
            </div>
            <span className="text-[8px] font-semibold text-slate-500">{t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PatientRecordScreen() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-base">👩</div>
        <div>
          <div className="text-[11px] font-black text-slate-900">Kaveesha Silva</div>
          <div className="text-[8px] text-slate-400">F · 34 yrs · B+</div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-3 mb-3">
        <div className="text-[9px] font-semibold text-slate-400 mb-2">Medical History</div>
        {['Hypertension (2020)','Type 2 Diabetes (2022)','Allergic: Penicillin'].map(h=>(
          <div key={h} className="text-[8.5px] text-slate-700 py-0.5 border-b border-slate-50 last:border-0">{h}</div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-3">
        <div className="text-[9px] font-semibold text-slate-400 mb-2">Last Visit — 14 Oct</div>
        <div className="text-[8.5px] text-slate-600 mb-2">BP: 138/88 · Weight: 62kg · Pulse: 76bpm</div>
        <div className="text-[8.5px] text-[#1D4ED8] font-semibold">View full record →</div>
      </div>
    </div>
  )
}

function AppointmentScreen() {
  return (
    <div className="p-4">
      <div className="text-[10px] font-bold text-slate-800 mb-3">Book Appointment</div>
      <div className="bg-white rounded-xl border border-slate-100 p-3 mb-3">
        <div className="text-[8.5px] font-semibold text-slate-400 mb-2">November 2024</div>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['M','T','W','T','F','S','S'].map((d,i)=><div key={i} className="text-[7px] text-slate-400 font-medium">{d}</div>)}
          {[...Array(4)].map((_,i)=><div key={i}/>)}
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map(d=>(
            <div key={d} className={`text-[8px] rounded-full w-5 h-5 flex items-center justify-center mx-auto font-medium cursor-pointer ${d===14?'gradient-brand text-white':d===7||d===12?'bg-blue-50 text-[#1D4ED8]':'text-slate-600 hover:bg-slate-50'}`}>{d}</div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-3">
        <div className="text-[8.5px] font-semibold text-slate-400 mb-2">Available — 14 Nov</div>
        {['9:00 AM','10:00 AM','2:30 PM'].map(t=>(
          <div key={t} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
            <span className="text-[9px] font-semibold text-slate-700">{t}</span>
            <button className="text-[8px] px-2 py-0.5 bg-blue-50 text-[#1D4ED8] font-bold rounded-full">Book</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function PrescriptionScreen() {
  return (
    <div className="p-4">
      <div className="text-[10px] font-bold text-slate-800 mb-3">New Prescription</div>
      <div className="bg-white rounded-xl border border-slate-100 p-3 mb-3">
        <div className="text-[8.5px] font-semibold text-slate-400 mb-1">Patient</div>
        <div className="text-[10px] font-bold text-slate-800 mb-1">Kaveesha Silva, 34F</div>
        <div className="text-[8px] text-slate-400">Dr. Perera · 14 Nov 2024</div>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-3">
        <div className="text-[8.5px] font-semibold text-slate-400 mb-2">Medications</div>
        {[
          {m:'Metformin 500mg','d':'1-0-1 × 30 days'},
          {m:'Amlodipine 5mg','d':'1-0-0 × 30 days'},
          {m:'Vitamin D 1000IU','d':'0-0-1 × 60 days'},
        ].map(({m,d})=>(
          <div key={m} className="py-1.5 border-b border-slate-50 last:border-0">
            <div className="text-[9px] font-semibold text-slate-800">{m}</div>
            <div className="text-[8px] text-slate-400">{d}</div>
          </div>
        ))}
        <button className="mt-2 w-full py-1.5 gradient-brand text-white text-[9px] font-bold rounded-lg">
          Sign & Send to Pharmacy
        </button>
      </div>
    </div>
  )
}

// ─── Feature block ────────────────────────────────────────────────────────────
function FeatureBlock({ label, title, body, side, screen }: { label: string; title: string; body: string; side: 'left'|'right'; screen: React.ReactNode }) {
  return (
    <div className="py-20 border-b border-[#E5E7EB] last:border-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-12 xl:gap-20 items-center ${side === 'right' ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <div className="reveal">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8] mb-3 block">{label}</span>
            <h3 className="font-display font-black text-[28px] xl:text-[34px] leading-[1.1] tracking-[-0.02em] text-slate-900 mb-3">{title}</h3>
            <p className="text-[15px] text-slate-500 leading-relaxed">{body}</p>
          </div>
          <div className="flex items-center justify-center py-8 reveal reveal-delay-2">
            {screen}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductDoctor() {
  useScrollReveal()
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob absolute -top-28 right-0 w-[440px] h-[440px] opacity-[0.09]"
            style={{background:'radial-gradient(circle,#1D4ED8 0%,transparent 70%)'}}/>
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="drgrid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#1D4ED8"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#drgrid)"/>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
                <span className="text-[11.5px] font-semibold text-[#1D4ED8] tracking-wide">Doctor App</span>
              </div>
              <h1 className="fade-up-2 font-display font-black text-[34px] sm:text-[44px] xl:text-[58px] leading-[1.05] tracking-[-0.02em] text-slate-900 mb-5">
                Manage Your Practice From Your Phone
              </h1>
              <p className="fade-up-3 text-[16px] text-slate-500 mb-8">
                Patient records, appointments, and prescriptions — always with you.
              </p>
              <div className="fade-up-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 gradient-brand text-white font-semibold rounded-full text-[15px] transition-all hover:shadow-xl hover:shadow-blue-300/25 hover:-translate-y-0.5">
                  Book a Demo
                </Link>
              </div>
            </div>
            {/* Hero phone */}
            <div className="hidden lg:flex justify-center fade-up-5">
              <div className="float-slow">
                <PhoneFrame>
                  <DoctorAppHome />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature blocks */}
      <section className="bg-white">
        <FeatureBlock
          label="Patient Records"
          title="Every patient. Every visit. One tap away."
          body="Complete medical histories, allergies, diagnoses, vitals, and visit notes are stored securely per patient. No paper files to lose, no illegible handwriting to decipher."
          side="left"
          screen={<PhoneFrame><PatientRecordScreen/></PhoneFrame>}
        />

        <FeatureBlock
          label="Appointment Scheduling"
          title="A fully booked calendar, managed in seconds."
          body="Set your availability once. Patients or staff book appointments into open slots — no phone tag, no double-booking. Reminders fire automatically the night before."
          side="right"
          screen={<PhoneFrame><AppointmentScreen/></PhoneFrame>}
        />

        <FeatureBlock
          label="Prescriptions"
          title="Write a prescription in under a minute."
          body="Search your drug formulary, set dosage and duration, and sign digitally. The prescription is sent to the patient's pharmacy directly — no paper, no lost slips."
          side="left"
          screen={<PhoneFrame><PrescriptionScreen/></PhoneFrame>}
        />

        <FeatureBlock
          label="Mobile-first Workflow"
          title="Designed to be used on a ward round."
          body="Large touch targets, offline mode when the wifi drops, and a layout that works with one hand. It feels like a consumer app because your time on the ward is too valuable for clunky software."
          side="right"
          screen={
            <div className="float-slow">
              <PhoneFrame>
                <div className="p-4">
                  <div className="text-[10px] font-bold text-slate-800 mb-3">Ward Round — Ward C</div>
                  <div className="bg-white rounded-xl border border-slate-100 p-3 mb-3">
                    <div className="text-[8.5px] font-semibold text-slate-400 mb-2">Bed assignments</div>
                    {[['Bed 1','K. Silva','Stable'],['Bed 2','R. Fernando','Monitoring'],['Bed 3','M. Perera','Discharge today']].map(([b,n,s])=>(
                      <div key={b} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                        <div><div className="text-[9px] font-semibold text-slate-800">{n}</div><div className="text-[8px] text-slate-400">{b}</div></div>
                        <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${s==='Stable'?'bg-emerald-50 text-emerald-600':s.includes('Discharge')?'bg-blue-50 text-[#1D4ED8]':'bg-amber-50 text-amber-600'}`}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {['🔇 Offline Mode','📋 Quick Notes','📊 Vitals','💊 Drug Ref'].map(f=>(
                      <div key={f} className="bg-white border border-slate-100 rounded-xl p-2.5 text-center text-[8.5px] font-semibold text-slate-600">{f}</div>
                    ))}
                  </div>
                </div>
              </PhoneFrame>
            </div>
          }
        />
      </section>

      <TrustStrip securityFocus={true} />
      <ProductCTA headline="See it running on your own device." sub="Book a demo — we'll walk you through a live patient workflow." />
    </>
  )
}
