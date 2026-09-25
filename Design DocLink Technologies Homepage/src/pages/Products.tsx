import { Link } from 'react-router'
import { useScrollReveal } from './Home'
import TrustStrip from '../components/TrustStrip'
import ProductCTA from '../components/ProductCTA'

// ─── ERP mockup ───────────────────────────────────────────────────────────────
function ERPMockup() {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-100 shadow-lg overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#FAFBFC] border-b border-slate-100">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200"/><span className="w-2.5 h-2.5 rounded-full bg-slate-200"/><span className="w-2.5 h-2.5 rounded-full bg-slate-200"/>
        <span className="ml-3 text-[10px] text-slate-400 font-medium">DocLink ERP — Dashboard</span>
      </div>
      <div className="p-4 bg-[#F5F8FF]">
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[['Revenue','LKR 2.4M','↑18%'],['Orders','1,284','↑9%'],['Payroll','LKR 0.9M','–'],['Stock','4,821','–']].map(([l,v,d])=>(
            <div key={l} className="bg-white rounded-xl p-2.5 border border-slate-100">
              <div className="text-[8.5px] text-slate-400 mb-1">{l}</div>
              <div className="text-[11px] font-bold text-slate-800">{v}</div>
              <div className="text-[8px] text-emerald-500 font-semibold">{d}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-3 border border-slate-100 mb-2">
          <div className="text-[8.5px] font-semibold text-slate-400 mb-2">Monthly Sales vs Expenses</div>
          <div className="flex items-end gap-1 h-10">
            {[40,55,44,72,55,84,65,90,60,80,72,100].map((h,i)=>(
              <div key={i} className="flex-1 rounded-t-sm" style={{height:`${h}%`,background:i>=10?'linear-gradient(180deg,#1D4ED8,#38bdf8)':'#E0E7FF'}}/>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-50">
          {[['INV-1182','Sales','+LKR 124,500'],['PAY-0891','Payroll','−LKR 48,200'],['PO-3341','Inventory','−LKR 32,100']].map(([r,d,a])=>(
            <div key={r} className="flex justify-between px-3 py-2">
              <div><div className="text-[9px] font-semibold text-slate-700">{r}</div><div className="text-[8px] text-slate-400">{d}</div></div>
              <span className={`text-[9px] font-bold ${(a as string).startsWith('+') ? 'text-emerald-600':'text-slate-500'}`}>{a}</span>
            </div>
          ))}
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
        <span className="ml-3 text-[10px] text-slate-400 font-medium">DocLink POS — Sales</span>
      </div>
      <div className="grid grid-cols-5 h-[160px]">
        <div className="col-span-3 p-3 bg-[#F5F8FF] border-r border-slate-100">
          <div className="text-[8.5px] font-semibold text-slate-400 mb-2">Products</div>
          <div className="grid grid-cols-3 gap-1.5">
            {['Shirt L','Jeans 32','Sneaker 9','Cap Red','Belt M','Socks 3pk'].map(p=>(
              <div key={p} className="bg-white border border-slate-100 rounded-lg p-1.5 text-center hover:border-blue-200 cursor-pointer transition-colors">
                <div className="text-base mb-0.5">👕</div>
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
        <span className="text-[7px]">📶</span>
      </div>
      <div className="bg-[#F5F8FF] p-2.5">
        <div className="text-[8px] font-bold text-slate-800 mb-2">Dr. Perera's Practice</div>
        <div className="bg-white rounded-xl p-2 border border-slate-100 mb-2">
          <div className="text-[7px] font-semibold text-slate-400 mb-1.5">Today's Appointments</div>
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
          {[['📋','Records'],['💊','Rx'],['📅','Schedule'],['📊','Reports']].map(([ic,lb])=>(
            <div key={lb} className="bg-white border border-slate-100 rounded-lg p-2 flex flex-col items-center gap-1">
              <span className="text-base">{ic}</span>
              <span className="text-[7px] font-semibold text-slate-500">{lb}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Product cards ────────────────────────────────────────────────────────────
const products = [
  {
    icon: '📊',
    name: 'ERP System',
    desc: 'All-in-one system for accounting, inventory, HR and payroll',
    link: '/products/erp',
    cta: 'Explore ERP',
    mockup: <ERPMockup />,
    bg: 'from-blue-50 to-indigo-50/60',
  },
  {
    icon: '🏪',
    name: 'POS System',
    desc: 'Smart sales and inventory for retail and restaurants',
    link: '/products/pos',
    cta: 'Explore POS',
    mockup: <POSMockup />,
    bg: 'from-sky-50 to-blue-50/60',
  },
  {
    icon: '🩺',
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
          <h1 className="fade-up-2 font-display font-black text-[48px] xl:text-[60px] leading-[1.06] tracking-[-0.02em] text-slate-900 mb-5">
            Software for the Way Your<br className="hidden md:block"/>
            <span className="gradient-text"> Business Actually Runs</span>
          </h1>
          <p className="fade-up-3 text-[16px] text-slate-500 max-w-xl mx-auto">
            Three products. One ecosystem. Built for Sri Lankan SMEs who've outgrown spreadsheets.
          </p>
        </div>
      </section>

      {/* Product Cards */}
      <section className="py-20 bg-[#FAFBFC]">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {products.map((p, i) => (
            <div key={p.name} className={`reveal reveal-delay-${i+1} rounded-[20px] border border-[#E5E7EB] bg-gradient-to-br ${p.bg} overflow-hidden`}>
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Copy side */}
                <div className="p-10 xl:p-14 flex flex-col justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-blue-100 shadow-sm flex items-center justify-center text-3xl mb-6">{p.icon}</div>
                  <h2 className="font-display font-black text-[32px] xl:text-[38px] leading-[1.1] tracking-[-0.02em] text-slate-900 mb-3">{p.name}</h2>
                  <p className="text-[16px] text-slate-500 mb-8 leading-relaxed">{p.desc}</p>
                  <Link
                    to={p.link}
                    className="self-start inline-flex items-center gap-2 px-7 py-3.5 gradient-brand text-white font-semibold rounded-full text-[14.5px] transition-all hover:shadow-xl hover:shadow-blue-300/25 hover:-translate-y-0.5"
                  >
                    {p.cta} →
                  </Link>
                </div>
                {/* Mockup side */}
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
