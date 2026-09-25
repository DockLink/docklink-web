import { useState } from 'react'
import { useScrollReveal } from './Home'
import TrustStrip from '../components/TrustStrip'
import ProductCTA from '../components/ProductCTA'
import CaseStudyCard from '../components/CaseStudyCard'

// ─── Browser-frame ERP screenshot ────────────────────────────────────────────
function ERPScreenshot({ mini = false }: { mini?: boolean }) {
  return (
    <div className={`w-full bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden ${mini ? 'max-w-[420px]' : ''}`}>
      <div className="flex items-center gap-1.5 px-5 py-3 bg-[#FAFBFC] border-b border-slate-100">
        <span className="w-3 h-3 rounded-full bg-slate-200"/><span className="w-3 h-3 rounded-full bg-slate-200"/><span className="w-3 h-3 rounded-full bg-slate-200"/>
        <div className="ml-4 flex-1 bg-slate-100 rounded-full h-5 flex items-center px-3 max-w-[200px]">
          <span className="text-[10px] text-slate-400">app.doclink.lk/erp/dashboard</span>
        </div>
      </div>
      <div className="bg-[#F5F8FF] p-5">
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[['Total Revenue','LKR 8.7M','↑ 22%'],['Active Orders','3,421','↑ 9%'],['Payroll Due','LKR 1.2M','in 4 days'],['Low Stock','14 items','⚠ review']].map(([l,v,d])=>(
            <div key={l} className="bg-white rounded-xl p-3 border border-slate-100">
              <div className="text-[9px] text-slate-400 mb-1 font-medium">{l}</div>
              <div className="text-[14px] font-bold text-slate-800">{v}</div>
              <div className="text-[9px] font-semibold text-emerald-500 mt-0.5">{d}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 bg-white rounded-xl border border-slate-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold text-slate-500">Revenue vs Expenses</span>
              <span className="text-[9px] px-2 py-0.5 bg-blue-50 text-[#1D4ED8] rounded-full font-semibold">This Year</span>
            </div>
            <div className="flex items-end gap-1 h-16">
              {[55,70,48,85,60,95,72,88,65,90,78,100].map((h,i)=>(
                <div key={i} className="flex-1 flex flex-col gap-0.5">
                  <div className="w-full rounded-t-sm" style={{height:`${h*0.7}%`,background:'linear-gradient(180deg,#1D4ED8,#38bdf8)'}}/>
                  <div className="w-full rounded-t-sm bg-slate-200" style={{height:`${h*0.25}%`}}/>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-[#1D4ED8]"/><span className="text-[8px] text-slate-400">Revenue</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-slate-200"/><span className="text-[8px] text-slate-400">Expenses</span></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <div className="text-[10px] font-semibold text-slate-500 mb-3">Top Customers</div>
            {[['Emaar PVT','LKR 640k'],['GRID Co','LKR 410k'],['A-Design','LKR 290k']].map(([n,v])=>(
              <div key={n} className="flex justify-between py-1.5 border-b border-slate-50 last:border-0">
                <span className="text-[9px] text-slate-600">{n}</span>
                <span className="text-[9px] font-bold text-[#1D4ED8]">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Module detail section ────────────────────────────────────────────────────
function ModuleDetail({ id, title, sub, blocks }: { id: string; title: string; sub: string; blocks: { caption: string; side: 'left'|'right'; screen: React.ReactNode }[] }) {
  return (
    <div id={id} className="py-16 border-t border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="font-display font-black text-[26px] text-slate-900 mb-1">{title}</h3>
        <p className="text-[14px] text-slate-500 mb-10">{sub}</p>
        <div className="space-y-12">
          {blocks.map((b, i) => (
            <div key={i} className={`grid md:grid-cols-2 gap-8 items-center ${b.side === 'right' ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div className="rounded-[16px] bg-[#F5F8FF] border border-[#E5E7EB] p-6 min-h-[160px] flex items-center justify-center">
                {b.screen}
              </div>
              <div>
                <p className="text-[15px] text-slate-600 leading-relaxed">{b.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Reusable mini screens ────────────────────────────────────────────────────
function MiniScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 border-b border-slate-100">
        <span className="w-2 h-2 rounded-full bg-slate-200"/><span className="w-2 h-2 rounded-full bg-slate-200"/><span className="w-2 h-2 rounded-full bg-slate-200"/>
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}

// ─── Module groups data ───────────────────────────────────────────────────────
const salesModules = [
  { icon: '🤝', name: 'CRM', benefit: 'Never lose a lead' },
  { icon: '📄', name: 'Estimate Generation', benefit: 'Quote in minutes' },
  { icon: '🧾', name: 'Invoice Generation', benefit: 'Get paid faster' },
  { icon: '📒', name: 'Accounting', benefit: 'Books close themselves' },
]
const opsModules = [
  { icon: '📦', name: 'Inventory Management', benefit: 'Always know what you have' },
  { icon: '🏭', name: 'Stock Management', benefit: 'Zero-variance counts' },
  { icon: '🚗', name: 'Rental Management', benefit: 'Track assets in real time' },
]
const peopleModules = [
  { icon: '👥', name: 'HR Management', benefit: 'One file per employee' },
  { icon: '💸', name: 'Payroll Management', benefit: 'Pay day in one click' },
]

function ModuleCard({ icon, name, benefit, href }: { icon: string; name: string; benefit: string; href: string }) {
  return (
    <a
      href={href}
      className="group flex flex-col p-5 rounded-[16px] bg-white border border-[#E5E7EB] shadow-sm hover:border-blue-200 hover:-translate-y-1 hover:shadow-lg transition-all"
    >
      <span className="text-2xl mb-3">{icon}</span>
      <div className="font-display font-bold text-[15px] text-slate-900 mb-1">{name}</div>
      <div className="text-[12.5px] text-slate-500 flex-1">{benefit}</div>
      <div className="mt-4 text-[12px] font-semibold text-[#1D4ED8] group-hover:gap-2 flex items-center gap-1 transition-all">
        Details <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </div>
    </a>
  )
}

function ModuleGroup({ label, title, intro, modules, gridCols }: { label: string; title: string; intro: string; modules: typeof salesModules; gridCols: string }) {
  return (
    <div className="py-16 border-b border-[#E5E7EB] last:border-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-2 reveal">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8]">{label}</span>
        </div>
        <div className="mb-8 reveal">
          <h3 className="font-display font-black text-[30px] text-slate-900 mb-2">{title}</h3>
          <p className="text-[14.5px] text-slate-500 max-w-lg">{intro}</p>
        </div>
        <div className={`grid ${gridCols} gap-4`}>
          {modules.map((m, i) => (
            <div key={m.name} className={`reveal reveal-delay-${i+1}`}>
              <ModuleCard {...m} href={`#module-${m.name.toLowerCase().replace(/\s+/g,'-')}`}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Module detail blocks ─────────────────────────────────────────────────────
function CRMDetail() {
  return (
    <ModuleDetail
      id="module-crm"
      title="CRM"
      sub="Every lead, contact, and deal in one place."
      blocks={[
        {
          caption: "See every client interaction at a glance — calls, emails, and follow-up tasks all linked to the same record. No more digging through inboxes.",
          side: 'left',
          screen: (
            <MiniScreen>
              <div className="text-[9px] font-semibold text-slate-500 mb-2">Pipeline</div>
              {[['Emaar Holdings','Proposal Sent','LKR 240k'],['A-Design Studio','Follow-up Due','LKR 85k'],['GRID Corp','Contract Review','LKR 320k']].map(([n,s,v])=>(
                <div key={n} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                  <div><div className="text-[9px] font-semibold text-slate-700">{n}</div><div className="text-[8px] text-slate-400">{s}</div></div>
                  <span className="text-[9px] font-bold text-[#1D4ED8]">{v}</span>
                </div>
              ))}
            </MiniScreen>
          ),
        },
        {
          caption: "Automated follow-up reminders so your sales team closes deals instead of trying to remember who they called last Tuesday.",
          side: 'right',
          screen: (
            <MiniScreen>
              <div className="text-[9px] font-semibold text-slate-500 mb-2">Today's Follow-ups</div>
              {[['10:00 AM','Call Mr. Perera re: Proposal'],['2:30 PM','Send demo to A-Design'],['4:00 PM','Review GRID contract']].map(([t,a])=>(
                <div key={t} className="flex items-start gap-2 py-1.5 border-b border-slate-50 last:border-0">
                  <span className="text-[8px] text-slate-400 pt-0.5 shrink-0">{t}</span>
                  <span className="text-[9px] text-slate-700">{a}</span>
                </div>
              ))}
            </MiniScreen>
          ),
        },
      ]}
    />
  )
}

function InvoiceDetail() {
  return (
    <ModuleDetail
      id="module-invoice-generation"
      title="Invoice Generation"
      sub="From estimate to tax invoice in two clicks."
      blocks={[
        {
          caption: "Convert an approved estimate to a tax-compliant invoice with one click. The system fills in client details, line items, tax, and bank info automatically.",
          side: 'left',
          screen: (
            <MiniScreen>
              <div className="flex justify-between items-start mb-2">
                <div><div className="text-[9px] font-bold text-slate-800">INV-2024-1182</div><div className="text-[8px] text-slate-400">Emaar Holdings</div></div>
                <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[8px] font-bold rounded-full">Paid</span>
              </div>
              {[['ERP License (Annual)','1','LKR 120,000'],['Setup & Training','1','LKR 45,000'],['Support Retainer','12 mo','LKR 36,000']].map(([d,q,a])=>(
                <div key={d} className="flex justify-between text-[8px] py-1 border-b border-slate-50 last:border-0">
                  <span className="text-slate-600">{d} <span className="text-slate-400">×{q}</span></span>
                  <span className="font-semibold text-slate-700">{a}</span>
                </div>
              ))}
              <div className="flex justify-between text-[9px] font-bold text-slate-800 mt-2 pt-1 border-t border-slate-100">
                <span>Total</span><span>LKR 201,000</span>
              </div>
            </MiniScreen>
          ),
        },
      ]}
    />
  )
}

function AccountingDetail() {
  return (
    <ModuleDetail
      id="module-accounting"
      title="Accounting"
      sub="Real-time books — no month-end panic."
      blocks={[
        {
          caption: "Every sale, purchase, and payroll run posts to the ledger automatically. Your accountant gets a live trial balance — not a month-end surprise.",
          side: 'left',
          screen: (
            <MiniScreen>
              <div className="text-[9px] font-semibold text-slate-500 mb-2">Trial Balance — Oct 2024</div>
              {[['Sales Revenue','—','LKR 4,210,000'],['COGS','LKR 1,840,000','—'],['Payroll Expense','LKR 920,000','—'],['Net Profit','—','LKR 1,450,000']].map(([a,d,c])=>(
                <div key={a} className="grid grid-cols-3 text-[8px] py-1 border-b border-slate-50 last:border-0">
                  <span className="text-slate-700 font-medium">{a}</span>
                  <span className="text-slate-500 text-right">{d}</span>
                  <span className="text-slate-500 text-right">{c}</span>
                </div>
              ))}
            </MiniScreen>
          ),
        },
      ]}
    />
  )
}

function InventoryDetail() {
  return (
    <ModuleDetail
      id="module-inventory-management"
      title="Inventory Management"
      sub="Know exactly what you have, where it is, and when it runs out."
      blocks={[
        {
          caption: "Real-time stock levels across every location. Reorder alerts fire automatically when items fall below your set threshold — before your team notices they're out.",
          side: 'left',
          screen: (
            <MiniScreen>
              <div className="text-[9px] font-semibold text-slate-500 mb-2">Stock Levels</div>
              {[['SKU-4821','Office Chair','142 units','In Stock'],['SKU-3301','Printer Paper','18 reams','⚠ Low'],['SKU-5590','Desk Lamp','0 units','⛔ Out']].map(([sku,n,q,s])=>(
                <div key={sku} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                  <div><div className="text-[9px] font-semibold text-slate-700">{n}</div><div className="text-[8px] text-slate-400">{sku}</div></div>
                  <div className="text-right"><div className="text-[9px] font-bold text-slate-700">{q}</div><div className={`text-[8px] font-semibold ${s==='In Stock'?'text-emerald-500':s.includes('Low')?'text-amber-500':'text-rose-500'}`}>{s}</div></div>
                </div>
              ))}
            </MiniScreen>
          ),
        },
      ]}
    />
  )
}

function PayrollDetail() {
  return (
    <ModuleDetail
      id="module-payroll-management"
      title="Payroll Management"
      sub="Run payroll for your entire team in under five minutes."
      blocks={[
        {
          caption: "Set up employee pay structures once. Every month, the system calculates EPF, ETF, and tax deductions automatically and generates a payslip for each employee.",
          side: 'left',
          screen: (
            <MiniScreen>
              <div className="text-[9px] font-semibold text-slate-500 mb-2">November Payroll</div>
              {[['K. Jayasuriya','Manager','LKR 85,000'],['P. Silva','Developer','LKR 72,000'],['R. Fernando','Accountant','LKR 65,000']].map(([n,r,s])=>(
                <div key={n} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                  <div><div className="text-[9px] font-semibold text-slate-700">{n}</div><div className="text-[8px] text-slate-400">{r}</div></div>
                  <span className="text-[9px] font-bold text-[#1D4ED8]">{s}</span>
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-[9px] font-bold">
                <span className="text-slate-500">Total Payroll</span>
                <span className="text-slate-800">LKR 222,000</span>
              </div>
            </MiniScreen>
          ),
        },
      ]}
    />
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductERP() {
  useScrollReveal()
  const [expanded, setExpanded] = useState<string[]>([])
  const toggle = (id: string) => setExpanded(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id])

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob absolute -top-28 right-0 w-[500px] h-[500px] opacity-[0.10]"
            style={{background:'radial-gradient(circle,#1D4ED8 0%,transparent 70%)'}}/>
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="erpgrid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#1D4ED8"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#erpgrid)"/>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-[640px] mb-12">
            <div className="fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
              <span className="text-[11.5px] font-semibold text-[#1D4ED8] tracking-wide">ERP System</span>
            </div>
            <h1 className="fade-up-2 font-display font-black text-[44px] xl:text-[58px] leading-[1.05] tracking-[-0.02em] text-slate-900 mb-5">
              Stop Running Accounting, Inventory and Payroll on Separate Spreadsheets
            </h1>
            <p className="fade-up-3 text-[16px] text-slate-500 mb-8">
              One system. Every department. Always in sync.
            </p>
            <div className="fade-up-4">
              <a href="mailto:hello@doclink.lk" className="inline-flex items-center gap-2 px-7 py-3.5 gradient-brand text-white font-semibold rounded-full text-[15px] transition-all hover:shadow-xl hover:shadow-blue-300/25 hover:-translate-y-0.5">
                Book a Demo
              </a>
            </div>
          </div>
          {/* Browser frame screenshot */}
          <div className="fade-up-5 max-w-5xl">
            <ERPScreenshot />
          </div>
        </div>
      </section>

      {/* Grouped Modules */}
      <section className="bg-[#FAFBFC]">
        <ModuleGroup
          label="Section A — Sales & Money"
          title="The full quote-to-cash and books flow."
          intro="From the first conversation with a customer to a closed invoice and a balanced ledger — all in one place."
          modules={salesModules}
          gridCols="grid-cols-2 lg:grid-cols-4"
        />
        <ModuleGroup
          label="Section B — Operations"
          title="The physical side of your business."
          intro="Know what you have, where it is, and what needs reordering — without counting by hand."
          modules={opsModules}
          gridCols="grid-cols-1 sm:grid-cols-3"
        />
        <ModuleGroup
          label="Section C — People"
          title="Managing your team."
          intro="Employee records, leave tracking, and payroll calculated automatically every month."
          modules={peopleModules}
          gridCols="grid-cols-1 sm:grid-cols-2"
        />
      </section>

      {/* Module detail blocks */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          {[
            { id: 'crm', label: 'CRM', comp: <CRMDetail /> },
            { id: 'invoice', label: 'Invoice Generation', comp: <InvoiceDetail /> },
            { id: 'accounting', label: 'Accounting', comp: <AccountingDetail /> },
            { id: 'inventory', label: 'Inventory Management', comp: <InventoryDetail /> },
            { id: 'payroll', label: 'Payroll Management', comp: <PayrollDetail /> },
          ].map(({ id, label, comp }) => (
            <div key={id}>
              <button
                onClick={() => toggle(id)}
                className="w-full flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB] hover:bg-slate-50 transition-colors text-left"
              >
                <span className="font-display font-bold text-[16px] text-slate-800">{label} — detail</span>
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${expanded.includes(id) ? 'rotate-45':''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
              </button>
              {expanded.includes(id) && comp}
            </div>
          ))}
        </div>
      </section>

      <TrustStrip />
      <CaseStudyCard id="emaar" />
      <ProductCTA headline="See DocLink ERP in your browser." sub="Book a 20-minute demo — we'll show you your exact workflow." />
    </>
  )
}
