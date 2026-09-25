import { useScrollReveal } from './Home'
import FeatureBlock from '../components/FeatureBlock'
import MiniScreen from '../components/MiniScreen'
import ProductCTA from '../components/ProductCTA'
import CaseStudyCard from '../components/CaseStudyCard'

// ─── Process timeline ─────────────────────────────────────────────────────────
const processSteps = [
  { n: '01', title: 'Discovery', sub: 'We map your workflow, pain points, and must-haves in one focused session.' },
  { n: '02', title: 'Scope & Proposal', sub: 'Fixed-price quote, feature list, and a delivery timeline — in writing.' },
  { n: '03', title: 'Build', sub: 'Agile sprints, weekly demos, and a shared Slack channel.' },
  { n: '04', title: 'Test', sub: 'UAT with your team on real data before anything goes live.' },
  { n: '05', title: 'Launch', sub: 'Deployment, staff training, and a go-live checklist.' },
  { n: '06', title: 'Support', sub: 'Ongoing retainer for updates, features, and incidents.' },
]

function ProcessTimeline() {
  return (
    <section className="py-24 bg-[#FAFBFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 reveal">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8] mb-3 block">Our Process</span>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <h2 className="font-display font-black text-[38px] xl:text-[46px] leading-[1.08] tracking-[-0.02em] text-slate-900">
              MVP in 2 to 6 Weeks
            </h2>
            <p className="text-[15px] text-slate-500 pb-1.5 max-w-[360px]">
              From first call to working software — a structured process that removes guesswork on both sides.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {processSteps.map((s, i) => (
            <div key={s.n} className={`reveal reveal-delay-${(i % 3) + 1} bg-white border border-[#E5E7EB] rounded-[16px] p-6`}>
              <div className="font-display font-black text-[36px] gradient-text leading-none mb-3">{s.n}</div>
              <h4 className="font-display font-bold text-[17px] text-slate-900 mb-1.5">{s.title}</h4>
              <p className="text-[13px] text-slate-500 leading-relaxed">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Mockup screens ───────────────────────────────────────────────────────────
function WorkflowScreen() {
  return (
    <MiniScreen url="app.doclink.lk/workflow-designer">
      <div className="text-[9px] font-semibold text-slate-500 mb-3">Custom Approval Workflow — Purchase Orders</div>
      <div className="space-y-2">
        {[
          {step:'1. Staff submits PO request',role:'Any staff',status:'Auto',dot:'bg-slate-300'},
          {step:'2. Dept head approves < LKR 50k',role:'Manager',status:'Required',dot:'bg-amber-400'},
          {step:'3. Finance review > LKR 50k',role:'CFO',status:'Required',dot:'bg-amber-400'},
          {step:'4. Payment released',role:'Accounts',status:'Auto',dot:'bg-[#1D4ED8]'},
        ].map(({step,role,status,dot})=>(
          <div key={step} className="flex items-center gap-2.5 bg-[#F5F8FF] border border-slate-100 rounded-lg p-2.5">
            <div className={`w-2 h-2 rounded-full ${dot} shrink-0`}/>
            <div className="flex-1">
              <div className="text-[8.5px] font-semibold text-slate-800">{step}</div>
              <div className="text-[8px] text-slate-400">{role}</div>
            </div>
            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${status==='Auto'?'bg-blue-50 text-[#1D4ED8]':'bg-amber-50 text-amber-600'}`}>{status}</span>
          </div>
        ))}
      </div>
    </MiniScreen>
  )
}

function RBACScreen() {
  return (
    <MiniScreen url="app.doclink.lk/settings/permissions">
      <div className="text-[9px] font-semibold text-slate-500 mb-3">Role Permissions Matrix</div>
      <div className="overflow-x-auto">
        <table className="w-full text-[8px]">
          <thead>
            <tr className="border-b border-slate-100">
              <td className="pb-1.5 text-slate-400 font-semibold">Module</td>
              {['Admin','Manager','Staff','View'].map(r=><td key={r} className="pb-1.5 text-center text-slate-400 font-semibold">{r}</td>)}
            </tr>
          </thead>
          <tbody>
            {[
              ['Invoicing','✅','✅','Create','👁'],
              ['Payroll','✅','View','❌','❌'],
              ['Inventory','✅','✅','✅','👁'],
              ['Reports','✅','✅','Own','👁'],
              ['Settings','✅','❌','❌','❌'],
            ].map(([mod,...perms])=>(
              <tr key={mod} className="border-b border-slate-50 last:border-0">
                <td className="py-1.5 font-semibold text-slate-700">{mod}</td>
                {perms.map((p,i)=>(
                  <td key={i} className="py-1.5 text-center text-slate-500">{p}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MiniScreen>
  )
}

function IntegrationScreen() {
  return (
    <MiniScreen url="app.doclink.lk/settings/integrations">
      <div className="text-[9px] font-semibold text-slate-500 mb-3">Connected Integrations</div>
      <div className="space-y-2">
        {[
          {name:'QuickBooks',type:'Accounting',status:'Connected',icon:'📒'},
          {name:'Dialog LKR Gateway',type:'Payments',status:'Connected',icon:'💳'},
          {name:'Notion',type:'Project data',status:'Connected',icon:'📝'},
          {name:'WhatsApp Business API',type:'Notifications',status:'Pending',icon:'💬'},
        ].map(({name,type,status,icon})=>(
          <div key={name} className="flex items-center justify-between bg-[#F5F8FF] border border-slate-100 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-base">{icon}</span>
              <div>
                <div className="text-[9px] font-bold text-slate-800">{name}</div>
                <div className="text-[8px] text-slate-400">{type}</div>
              </div>
            </div>
            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${status==='Connected'?'bg-emerald-50 text-emerald-600':'bg-amber-50 text-amber-600'}`}>{status}</span>
          </div>
        ))}
      </div>
    </MiniScreen>
  )
}

function SupportScreen() {
  return (
    <MiniScreen url="support.doclink.lk">
      <div className="text-[9px] font-semibold text-slate-500 mb-3">Support & Changelog</div>
      <div className="space-y-2 mb-3">
        {[
          {tag:'v2.4.1 — 12 Nov','note':'Added bulk invoice export to PDF'},
          {tag:'v2.4.0 — 28 Oct','note':'New HR leave calendar view'},
          {tag:'v2.3.8 — 15 Oct','note':'Performance: dashboard loads 40% faster'},
        ].map(({tag,note})=>(
          <div key={tag} className="border-b border-slate-50 pb-2 last:border-0 last:pb-0">
            <div className="text-[8px] font-bold text-[#1D4ED8] mb-0.5">{tag}</div>
            <div className="text-[8.5px] text-slate-600">{note}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#F5F8FF] rounded-lg p-2">
        <div className="text-[8.5px] font-semibold text-slate-600">Active tickets: <span className="text-[#1D4ED8]">2 open</span></div>
        <div className="text-[8px] text-slate-400">Avg response: 2h 14m</div>
      </div>
    </MiniScreen>
  )
}

function SecurityScreen() {
  return (
    <MiniScreen url="app.doclink.lk/security-audit">
      <div className="text-[9px] font-semibold text-slate-500 mb-3">Security Overview</div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          {icon:'🔐',label:'Data at rest','val':'AES-256'},
          {icon:'🌐',label:'In transit','val':'TLS 1.3'},
          {icon:'🗄️',label:'Backups','val':'Daily'},
          {icon:'📋',label:'Audit log','val':'Always on'},
        ].map(({icon,label,val})=>(
          <div key={label} className="bg-[#F5F8FF] border border-slate-100 rounded-lg p-2">
            <div className="text-base mb-0.5">{icon}</div>
            <div className="text-[8px] text-slate-400">{label}</div>
            <div className="text-[9px] font-bold text-slate-700">{val}</div>
          </div>
        ))}
      </div>
      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2 flex items-center gap-2">
        <span className="text-sm">✅</span>
        <div className="text-[8.5px] font-semibold text-emerald-700">Last penetration test: Oct 2024 — No critical findings</div>
      </div>
    </MiniScreen>
  )
}

// ─── Case studies ─────────────────────────────────────────────────────────────
function SoftwareCaseStudies() {
  const cases = [
    {
      client:'GRID',
      industry:'Technology',
      headline:'How GRID replaced 6 internal tools with one custom platform',
      gradient:'from-[#1e3a8a] to-[#1D4ED8]',
      stats:[{number:'6',label:'legacy tools replaced'},{number:'4 mo',label:'full delivery timeline'}],
    },
    {
      client:'A-Design',
      industry:'Interior Design',
      headline:'How A-Design tracks every project, invoice and client in one place',
      gradient:'from-[#1D4ED8] to-[#0284c7]',
      stats:[{number:'100%',label:'projects tracked digitally'},{number:'LKR 0',label:'invoices lost since launch'}],
    },
  ]
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 reveal">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8] mb-3 block">Case Studies</span>
          <h2 className="font-display font-black text-[34px] text-slate-900 leading-tight">What We've Built for Clients Like You</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((cs,i)=>(
            <a key={cs.client} href="#" className={`group block rounded-[18px] border border-[#E5E7EB] bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 reveal reveal-delay-${i+1}`}>
              <div className={`h-[100px] bg-gradient-to-r ${cs.gradient} p-5 flex items-end`}>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 border border-white/25 rounded-full text-[11px] font-semibold text-white">
                  {cs.industry}
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-display font-bold text-[17px] text-slate-900 leading-snug mb-5">{cs.headline}</h3>
                <div className="h-px bg-slate-100 mb-5"/>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  {cs.stats.map(s=>(
                    <div key={s.label}>
                      <div className="font-display font-black text-[28px] text-[#1D4ED8] leading-none mb-1">{s.number}</div>
                      <div className="text-[12px] text-slate-500 leading-snug">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1D4ED8] group-hover:gap-2.5 transition-all">
                  Read case study
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Hero software screenshot ─────────────────────────────────────────────────
function SoftwareHeroScreen() {
  return (
    <MiniScreen url="app.yourbusiness.lk/dashboard">
      <div className="grid grid-cols-4 gap-2 mb-3">
        {[['Revenue','LKR 4.2M','↑18%'],['Active Jobs','84','↑6%'],['Staff','32','–'],['Open Invoices','17','→']].map(([l,v,d])=>(
          <div key={l} className="bg-[#F5F8FF] border border-slate-100 rounded-xl p-2.5">
            <div className="text-[8.5px] text-slate-400 mb-1">{l}</div>
            <div className="text-[13px] font-black text-slate-800">{v}</div>
            <div className="text-[8.5px] font-semibold text-emerald-500">{d}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 bg-[#F5F8FF] border border-slate-100 rounded-xl p-3">
          <div className="text-[8.5px] font-semibold text-slate-400 mb-2">Revenue trend</div>
          <div className="flex items-end gap-1 h-10">
            {[40,55,44,72,55,84,65,90,60,80,72,100].map((h,i)=>(
              <div key={i} className="flex-1 rounded-t-sm"
                style={{height:`${h}%`,background:i>=10?'linear-gradient(180deg,#1D4ED8,#38bdf8)':'#E0E7FF'}}/>
            ))}
          </div>
        </div>
        <div className="bg-[#F5F8FF] border border-slate-100 rounded-xl p-3">
          <div className="text-[8.5px] font-semibold text-slate-400 mb-2">By dept</div>
          {[['Sales','64%'],['Ops','22%'],['HR','14%']].map(([d,p])=>(
            <div key={d} className="mb-1.5">
              <div className="flex justify-between text-[7.5px] text-slate-500 mb-0.5"><span>{d}</span><span>{p}</span></div>
              <div className="h-1 bg-slate-200 rounded-full"><div className="h-1 rounded-full bg-[#1D4ED8]" style={{width:p}}/></div>
            </div>
          ))}
        </div>
      </div>
    </MiniScreen>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServiceSoftware() {
  useScrollReveal()
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob absolute -top-28 right-0 w-[520px] h-[520px] opacity-[0.10]"
            style={{background:'radial-gradient(circle,#1D4ED8 0%,transparent 70%)'}}/>
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="swgrid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#1D4ED8"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#swgrid)"/>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_500px] gap-16 items-start">
            <div className="max-w-[600px]">
              <div className="fade-up-1 flex items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                  <span className="text-[11.5px] font-semibold text-[#1D4ED8]">Software Development</span>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold bg-[#1D4ED8] text-white rounded-full">FLAGSHIP</span>
              </div>
              <h1 className="fade-up-2 font-display font-black text-[44px] xl:text-[56px] leading-[1.05] tracking-[-0.02em] text-slate-900 mb-5">
                Business Software Built Around How You Actually Work
              </h1>
              <p className="fade-up-3 text-[16px] text-slate-500 mb-8">
                Not a generic template with your logo on it. A system scoped to your workflow, built from scratch.
              </p>
              <div className="fade-up-4">
                <a href="mailto:hello@doclink.lk" className="inline-flex items-center gap-2 px-7 py-3.5 gradient-brand text-white font-semibold rounded-full text-[15px] transition-all hover:shadow-xl hover:shadow-blue-300/25 hover:-translate-y-0.5">
                  Get a Quote
                </a>
              </div>
            </div>
            <div className="hidden lg:block fade-up-5 pt-4">
              <SoftwareHeroScreen />
            </div>
          </div>
        </div>
      </section>

      {/* Feature blocks */}
      <section className="bg-white">
        <FeatureBlock
          label="Custom Workflow Design"
          title="Your process. Not someone else's default."
          body="We map your actual workflow in the discovery session, then build the software around it. No forcing your team to adapt to a system designed for a different kind of business."
          side="left"
          screen={<WorkflowScreen />}
        />
        <FeatureBlock
          label="Role-based Access & Permissions"
          title="Staff see exactly what they need — nothing more."
          body="A granular permissions matrix means your finance team sees financial data, your warehouse team sees stock, and nobody accidentally deletes something critical."
          side="right"
          screen={<RBACScreen />}
        />
        <FeatureBlock
          label="Integrations with Existing Tools"
          title="Connects to the software you already run."
          body="We integrate with accounting tools, payment gateways, WhatsApp Business API, Google Workspace, and most REST APIs. We've rarely encountered a system we couldn't connect."
          side="left"
          screen={<IntegrationScreen />}
        />
        <FeatureBlock
          label="Ongoing Support & Iteration"
          title="The relationship doesn't end at launch."
          body="Most clients stay on a monthly support retainer. We handle bug fixes, performance improvements, and new feature requests — so the software grows as your business does."
          side="right"
          screen={<SupportScreen />}
        />
        <FeatureBlock
          label="Security-first Architecture"
          title="Enterprise-grade protection at SME pricing."
          body="Every system we build ships with encrypted data at rest and in transit, daily automated backups, a full audit log, and role-based access controls. Security isn't an add-on — it's the default."
          side="left"
          screen={<SecurityScreen />}
        />
      </section>

      <ProcessTimeline />
      <SoftwareCaseStudies />
      <ProductCTA
        headline="Let's build something that actually fits."
        sub="Tell us your workflow — we'll design the system around it."
        buttonLabel="Get a Quote"
      />
    </>
  )
}
