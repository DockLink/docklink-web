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

// ─── Case study data ─────────────────────────────────────────────────────────
export type Stat = { number: string; label: string }
export type Section = { heading: string; body: string }

export type CaseStudyData = {
  id: string
  client: string
  industry: string
  location: string
  date: string
  gradient: string
  headline: string
  subhead: string
  stats: Stat[]
  sections: Section[]
  quote: { text: string; name: string; title: string }
  screen: React.ReactNode
  avatarInitials: string
  avatarColor: string
  photoCaption: string
}

export const caseStudyData: Record<string, CaseStudyData> = {
  emaar: {
    id: 'emaar',
    client: 'Emaar',
    industry: 'Real Estate',
    location: 'Colombo, Sri Lanka',
    date: 'March 2024',
    gradient: 'from-[#1e3a8a] to-[#1D4ED8]',
    headline: 'How Emaar automated payroll for 300 employees and cut processing time to minutes',
    subhead: 'A real estate company running payroll for 300 staff on spreadsheets. One ERP deployment later, a five-day job became a 20-minute task.',
    stats: [
      { number: '300', label: 'employees on automated payroll' },
      { number: '200 hrs', label: 'saved per month, across HR and finance' },
      { number: 'LKR 0', label: 'in payroll errors since deployment' },
      { number: '3 wks', label: 'from kickoff to go-live' },
    ],
    sections: [
      {
        heading: 'Moving 300 employees off spreadsheet payroll',
        body: "Before DocLink, Emaar's HR team maintained a master Excel workbook with 300 rows — one per employee. Every month, the payroll officer spent four to five days cross-referencing attendance logs, updating salaries, calculating EPF and ETF manually, and sending individual payslips by email. Errors were caught after the fact. Corrections were made by hand. The CFO had no real-time view of payroll cost by department.",
      },
      {
        heading: 'Building the system around Emaar\'s existing approval flow',
        body: "The discovery call revealed Emaar had a two-tier approval structure: department heads approved their team's timesheets by the 25th, the CFO approved the total before release. We built that exact flow into the ERP — no workaround, no approximation. Staff records, pay grades, and tax tables were migrated in week one. By week two, the first test payroll run processed all 300 employees in under 90 seconds.",
      },
      {
        heading: 'Go-live in three weeks, zero payroll interruptions',
        body: "We ran parallel payrolls for the first two months — the old spreadsheet and the new system side by side — until both figures matched consistently. When Emaar flipped to the new system in full, there was no disruption. Payslips now generate and distribute automatically on the 28th of every month. The payroll officer's role shifted from data entry to exception handling — exactly as it should be.",
      },
      {
        heading: 'Phase 2: expense management and leave tracking',
        body: "Six months after the payroll launch, Emaar commissioned Phase 2: an expense claims module with photo-based receipt upload, and a leave management calendar integrated with payroll. Both shipped in four weeks. Emaar is now exploring a self-service employee portal as Phase 3.",
      },
    ],
    quote: {
      text: "What used to take my team five days now takes twenty minutes. I can see the total payroll cost by department before I approve it — something I couldn't do before even if I spent a whole day on Excel.",
      name: 'Asanka Ratnayake',
      title: 'CFO, Emaar Holdings',
    },
    screen: <EmaarScreen />,
    avatarInitials: 'AR',
    avatarColor: 'from-[#1e3a8a] to-[#1D4ED8]',
    photoCaption: 'Asanka Ratnayake — CFO, Emaar Holdings, Colombo',
  },

  street82: {
    id: 'street82',
    client: 'Street82',
    industry: 'Retail',
    location: 'Colombo & Kandy, Sri Lanka',
    date: 'August 2023',
    gradient: 'from-[#1D4ED8] to-[#0284c7]',
    headline: 'How Street82 cut stock discrepancies to near zero across three retail branches',
    subhead: 'A multi-branch fashion retailer counting stock by hand and reconciling on spreadsheets. After a three-week POS deployment, inventory variance dropped to under 0.2%.',
    stats: [
      { number: '94%', label: 'reduction in inventory counting errors' },
      { number: '3 wks', label: 'from first call to fully live across all branches' },
      { number: '3', label: 'branches on real-time shared inventory' },
      { number: '1,248', label: 'SKUs now tracked without a single spreadsheet' },
    ],
    sections: [
      {
        heading: 'The problem with counting stock by hand across three locations',
        body: "Street82 runs three retail branches — Colombo 07, Kandy, and Galle. Before DocLink POS, each branch manager kept a physical stock ledger and a separate Excel sheet. End-of-month reconciliation required the owner to collect three files, merge them manually, and spend a weekend chasing discrepancies. Shrinkage was invisible until it was too late. Transfers between branches weren't tracked consistently.",
      },
      {
        heading: 'Deploying POS across three branches in under three weeks',
        body: "All 1,248 SKUs were imported from the existing spreadsheets in day one. Hardware — receipt printers and barcode scanners — was installed at each branch by our team. Cashiers were trained in under two hours per location. By the end of week three, all three branches were running live sales through DocLink POS, with inventory syncing across locations in real time.",
      },
      {
        heading: 'From 6% variance to 0.2% — in the first full month',
        body: "The previous month's stock count had shown a 6.1% variance — roughly LKR 220,000 in unaccounted stock. The first month on DocLink POS brought that down to 0.2%. The main driver was simple: every sale now deducts from stock automatically. No more end-of-day manual entry, no more missed transactions, no more transfers without a record.",
      },
      {
        heading: 'What the owner can see now that she couldn\'t before',
        body: "The CEO now opens the DocLink dashboard every morning on her phone and sees yesterday's sales by branch, current stock levels, and which items are approaching reorder. She makes buying decisions on data. She hasn't physically counted stock since the system launched.",
      },
    ],
    quote: {
      text: "I used to spend every first weekend of the month fixing inventory mistakes. Now I check the app on my phone before breakfast and I already know what sold yesterday and what to reorder. It changed how I run the business.",
      name: 'Dilini Jayawardena',
      title: 'CEO, Street82',
    },
    screen: <Street82Screen />,
    avatarInitials: 'DJ',
    avatarColor: 'from-[#1D4ED8] to-[#0284c7]',
    photoCaption: 'Dilini Jayawardena — CEO, Street82, Colombo',
  },

  grid: {
    id: 'grid',
    client: 'GRID',
    industry: 'Technology',
    location: 'Colombo, Sri Lanka',
    date: 'November 2023',
    gradient: 'from-[#1e3a8a] to-[#1D4ED8]',
    headline: 'How GRID replaced six internal tools with one custom platform — and got their whole team to actually use it',
    subhead: 'A technology consultancy juggling six different SaaS tools for project management, CRM, invoicing, HR, inventory, and reporting. One custom build. One login. One source of truth.',
    stats: [
      { number: '6', label: 'separate tools replaced by one platform' },
      { number: 'LKR 490k', label: 'total build cost for all six modules' },
      { number: '4 mo', label: 'full delivery including training and handover' },
      { number: '28', label: 'team members active on the system daily' },
    ],
    sections: [
      {
        heading: 'Building a six-module ERP/CRM system for LKR 490k',
        body: "GRID came to DocLink with a clear brief: replace Trello, HubSpot, QuickBooks, an HR spreadsheet, a stock sheet, and a Power BI dashboard with a single system that their 28-person team could use from one login. The total budget was LKR 490,000. We scoped six modules — CRM, Project Management, Invoicing, HR, Inventory, and Reporting — and delivered all six within that figure over four months.",
      },
      {
        heading: 'Why six tools become one problem',
        body: "The issue wasn't any one tool — it was the gaps between them. A deal won in HubSpot had to be manually entered into Trello as a project. An invoice in QuickBooks had no link to the project it came from. HR data lived in a Google Sheet that only the director could edit. By the time information moved from one tool to another, it was either outdated or wrong. GRID was paying six subscription fees and still losing data.",
      },
      {
        heading: 'Adoption was the real challenge — and the real win',
        body: "The most common failure mode for enterprise software isn't the build — it's adoption. We addressed this by involving three team leads in the design sprint before a line of code was written. They signed off on workflows, named their own modules, and trained their own teams. By go-live, 28 of 30 staff were active users within the first week. The remaining two were onboarded by their peers, not by us.",
      },
      {
        heading: 'Six months on: 34% year-on-year revenue growth, tracked',
        body: "GRID closed its books for the first time with complete revenue data across all projects. The Reporting module showed a 34% year-on-year increase in invoiced revenue — a number the leadership team had suspected but never been able to confirm. The CRM pipeline, project timelines, and invoicing are now fully linked. When a deal closes, a project is created automatically. When a project hits a milestone, an invoice drafts itself.",
      },
    ],
    quote: {
      text: "We were paying for six tools and still losing information between them. DocLink built us something that actually connects all the dots. The LKR 490k we spent paid for itself in the first quarter.",
      name: 'Chathura Wickramasinghe',
      title: 'Managing Director, GRID Corp',
    },
    screen: <GRIDScreen />,
    avatarInitials: 'CW',
    avatarColor: 'from-[#1e3a8a] to-[#1D4ED8]',
    photoCaption: 'Chathura Wickramasinghe — Managing Director, GRID Corp, Colombo',
  },

  'a-design': {
    id: 'a-design',
    client: 'A-Design',
    industry: 'Interior Design',
    location: 'Colombo, Sri Lanka',
    date: 'June 2023',
    gradient: 'from-[#1D4ED8] to-[#0284c7]',
    headline: 'How A-Design went from a single project management build to an ongoing Phase 2 retainer — and hasn\'t lost an invoice since',
    subhead: "A boutique interior design studio tracking 12 active projects, 38 clients, and LKR 4.8M in annual revenue — all without losing a single invoice or missing a deadline.",
    stats: [
      { number: '100%', label: 'of active projects tracked digitally — zero spreadsheets' },
      { number: 'LKR 0', label: 'in invoices lost or uncollected since launch' },
      { number: '12', label: 'concurrent projects managed from one dashboard' },
      { number: 'Phase 2', label: 'ongoing retainer for new modules' },
    ],
    sections: [
      {
        heading: 'Starting with project management for a 38-client studio',
        body: "A-Design runs a boutique interior design practice with a small core team and a rotating roster of contractors. Before DocLink, every project was a folder — physical and digital — with no central view of which stage each one was at, which invoices had been sent, or which contractors were still waiting to be paid. The principal designer was spending two hours a week just answering the question: what's the current status of project X?",
      },
      {
        heading: 'The first phase: project tracking and invoicing',
        body: "Phase 1 was scoped tightly: a project board showing every active engagement by stage, a client directory, and an invoicing module. Nothing more. We delivered in six weeks. In the first month of use, A-Design found three invoices that had been sent but never followed up — a combined LKR 280,000 that was recovered within 30 days of the system going live.",
      },
      {
        heading: 'From a single project to an ongoing partnership',
        body: "Three months after Phase 1 launched, A-Design came back. The studio had grown — three new hires, a second location, and a contractor management problem. Phase 2 added a contractor database with linked payment records, a materials procurement tracker, and a client portal where customers could log in and see the live status of their project. Phase 2 shipped over eight weeks, on a monthly retainer that covers ongoing support and feature additions.",
      },
      {
        heading: 'What ongoing retainer actually means',
        body: "A-Design is now on a monthly support retainer — not for bug fixes, but for active product development. Every month, the principal designer flags two or three new requirements. We prioritise them, build them, and deploy them. The software grows as the business grows. There's no big-bang upgrade, no migration, no renegotiation. Just a steady, trusted working relationship.",
      },
    ],
    quote: {
      text: "We found LKR 280,000 in unpaid invoices in the first month. That alone paid for the entire Phase 1 build. But what keeps us on retainer is that the system keeps getting better — it's not a one-time project, it's a tool that grows with us.",
      name: 'Amara Perera',
      title: 'Principal Designer & Founder, A-Design Studio',
    },
    screen: <ADesignScreen />,
    avatarInitials: 'AP',
    avatarColor: 'from-[#1D4ED8] to-[#0284c7]',
    photoCaption: 'Amara Perera — Founder, A-Design Studio, Colombo',
  },
}
