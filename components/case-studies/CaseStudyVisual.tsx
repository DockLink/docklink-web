import type { ReactNode } from 'react'

// ─── Shared mini-screen shell ─────────────────────────────────────────────────
function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden">
      <div className="flex items-center gap-1.5 px-5 py-3 bg-[#FAFBFC] border-b border-slate-100">
        <span className="w-3 h-3 rounded-full bg-slate-200"/>
        <span className="w-3 h-3 rounded-full bg-slate-200"/>
        <span className="w-3 h-3 rounded-full bg-slate-200"/>
        <div className="ml-4 flex-1 bg-slate-100 rounded-full h-5 flex items-center px-3 max-w-[240px]">
          <span className="text-[10px] text-slate-400 truncate">{url}</span>
        </div>
      </div>
      <div className="bg-[#F5F8FF] p-5">{children}</div>
    </div>
  )
}

// ─── Emaar screenshot — Payroll dashboard ─────────────────────────────────────
export function EmaarScreen() {
  return (
    <BrowserFrame url="app.doclink.lk/emaar/payroll">
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[['Employees','300','active'],['Payroll Run','Nov 2024','completed'],['Total Payout','LKR 14.2M','this cycle'],['Errors','0','since launch']].map(([l,v,s])=>(
          <div key={l} className="bg-white rounded-xl p-3 border border-slate-100">
            <div className="text-[9px] text-slate-400 mb-1 font-medium">{l}</div>
            <div className="text-[14px] font-black text-slate-800">{v}</div>
            <div className="text-[9px] font-semibold text-emerald-500 mt-0.5">{s}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 p-4">
          <div className="text-[10px] font-semibold text-slate-500 mb-3">Payroll by Department — Nov 2024</div>
          <div className="space-y-2.5">
            {[['Management','LKR 2.8M',28],['Operations','LKR 4.6M',46],['Sales','LKR 3.2M',32],['Admin','LKR 1.4M',14],['Security','LKR 0.8M',8]].map(([d,v,w])=>(
              <div key={d}>
                <div className="flex justify-between text-[9px] mb-1">
                  <span className="text-slate-600">{d}</span>
                  <span className="font-bold text-slate-700">{v}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#38bdf8]" style={{width:`${w}%`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <div className="text-[10px] font-semibold text-slate-500 mb-3">Recent Payslips</div>
          {[['K. Jayasuriya','Manager','✅'],['P. Silva','Ops Lead','✅'],['R. Fernando','Admin','✅'],['M. Perera','Security','✅']].map(([n,r,s])=>(
            <div key={n} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
              <div><div className="text-[9px] font-semibold text-slate-700">{n}</div><div className="text-[8px] text-slate-400">{r}</div></div>
              <span className="text-[10px]">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}

// ─── Street82 screenshot — POS + Inventory ────────────────────────────────────
export function Street82Screen() {
  return (
    <BrowserFrame url="app.doclink.lk/street82/inventory">
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[['Total SKUs','1,248','tracked'],['Low Stock Alerts','3','items'],['Last Count Variance','0.2%','across 3 branches']].map(([l,v,s])=>(
          <div key={l} className="bg-white rounded-xl p-3 border border-slate-100">
            <div className="text-[9px] text-slate-400 mb-1">{l}</div>
            <div className="text-[14px] font-black text-slate-800">{v}</div>
            <div className="text-[9px] font-semibold text-emerald-500">{s}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-4 mb-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-semibold text-slate-500">Live Stock — All Branches</span>
          <div className="flex gap-2">
            {['Colombo 07','Kandy','Galle'].map(b=><span key={b} className="text-[9px] px-2 py-0.5 bg-blue-50 text-[#1D4ED8] rounded-full font-semibold">{b}</span>)}
          </div>
        </div>
        {[
          ['SKU-4821','Slim Jeans (32)','142','28','55','59'],
          ['SKU-3301','Plain Tee (L)','88','20','38','30'],
          ['SKU-5590','Sneakers (9)','34','8','14','12'],
          ['SKU-2201','Cap (Red)','210','72','80','58'],
        ].map(([sku,n,total,c,k,g])=>(
          <div key={sku} className="grid grid-cols-6 text-[8.5px] py-1.5 border-b border-slate-50 last:border-0 items-center">
            <span className="text-slate-400 col-span-1">{sku}</span>
            <span className="font-semibold text-slate-700 col-span-2">{n}</span>
            <span className="font-bold text-[#1D4ED8] text-center">{total}</span>
            <span className="text-slate-500 text-center">{c}</span>
            <span className="text-slate-500 text-center">{k}</span>
          </div>
        ))}
      </div>
    </BrowserFrame>
  )
}

// ─── GRID screenshot — CRM + Project dashboard ────────────────────────────────
export function GRIDScreen() {
  return (
    <BrowserFrame url="app.doclink.lk/grid/dashboard">
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[['Active Projects','24','across 3 teams'],['Pipeline Value','LKR 8.4M','open CRM deals'],['Invoiced YTD','LKR 12.1M','↑ 34% vs last year']].map(([l,v,s])=>(
          <div key={l} className="bg-white rounded-xl p-3 border border-slate-100">
            <div className="text-[9px] text-slate-400 mb-1">{l}</div>
            <div className="text-[14px] font-black text-slate-800">{v}</div>
            <div className="text-[9px] font-semibold text-emerald-500">{s}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-3 bg-white rounded-xl border border-slate-100 p-4">
          <div className="text-[10px] font-semibold text-slate-500 mb-2.5">Active Modules</div>
          {[
            {name:'CRM',icon:'🤝',status:'Active',users:8},
            {name:'Project Management',icon:'📋',status:'Active',users:14},
            {name:'Invoicing',icon:'🧾',status:'Active',users:5},
            {name:'HR',icon:'👥',status:'Active',users:3},
            {name:'Inventory',icon:'📦',status:'Active',users:4},
            {name:'Reporting',icon:'📊',status:'Active',users:12},
          ].map(m=>(
            <div key={m.name} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{m.icon}</span>
                <span className="text-[9px] font-semibold text-slate-700">{m.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 font-bold rounded-full">{m.status}</span>
                <span className="text-[8px] text-slate-400">{m.users} users</span>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 p-4">
          <div className="text-[10px] font-semibold text-slate-500 mb-2">CRM Pipeline</div>
          {[['Prospecting','LKR 2.1M'],['Proposal','LKR 3.4M'],['Negotiation','LKR 1.8M'],['Won','LKR 8.4M']].map(([s,v])=>(
            <div key={s} className="py-1.5 border-b border-slate-50 last:border-0">
              <div className="text-[8px] text-slate-400">{s}</div>
              <div className="text-[10px] font-bold text-[#1D4ED8]">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}

// ─── A-Design screenshot — Project + Invoice management ───────────────────────
export function ADesignScreen() {
  return (
    <BrowserFrame url="app.doclink.lk/a-design/projects">
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[['Active Projects','12','in progress'],['Invoiced','LKR 4.8M','this year'],['Outstanding','LKR 280k','2 invoices'],['Clients','38','active']].map(([l,v,s])=>(
          <div key={l} className="bg-white rounded-xl p-3 border border-slate-100">
            <div className="text-[9px] text-slate-400 mb-1">{l}</div>
            <div className="text-[13px] font-black text-slate-800">{v}</div>
            <div className="text-[9px] font-semibold text-emerald-500">{s}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-4">
        <div className="text-[10px] font-semibold text-slate-500 mb-3">Active Projects</div>
        {[
          {name:'Emaar Penthouse Interior',stage:'In Progress',invoiced:'LKR 480k',due:'Dec 2024'},
          {name:'Colombo 7 Office Fit-out',stage:'Design Review',invoiced:'LKR 220k',due:'Jan 2025'},
          {name:'Mount Lavinia Villa',stage:'Site Handover',invoiced:'LKR 850k',due:'Nov 2024'},
          {name:'Cinnamon Gardens Reno',stage:'In Progress',invoiced:'LKR 340k',due:'Feb 2025'},
        ].map(p=>(
          <div key={p.name} className="grid grid-cols-4 text-[8.5px] py-2 border-b border-slate-50 last:border-0 items-center gap-2">
            <span className="font-semibold text-slate-800 col-span-2 leading-tight">{p.name}</span>
            <span className={`text-center px-1.5 py-0.5 rounded-full font-bold ${p.stage==='Site Handover'?'bg-emerald-50 text-emerald-600':p.stage==='Design Review'?'bg-amber-50 text-amber-600':'bg-blue-50 text-[#1D4ED8]'}`}>{p.stage}</span>
            <span className="text-slate-600 text-right font-semibold">{p.invoiced}</span>
          </div>
        ))}
      </div>
    </BrowserFrame>
  )
}

function Placeholder() {
  return <div className="h-48 rounded-2xl border border-dashed border-slate-200 bg-white/60" />
}

const visuals: Record<string, ReactNode> = {
  emaar: <EmaarScreen />,
  street82: <Street82Screen />,
  grid: <GRIDScreen />,
  "a-design": <ADesignScreen />,
}

export default function CaseStudyVisual({ visualKey }: { visualKey: string }) {
  return visuals[visualKey] ?? <Placeholder />
}
