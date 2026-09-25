import { useScrollReveal } from './Home'
import TrustStrip from '../components/TrustStrip'
import ProductCTA from '../components/ProductCTA'
import CaseStudyCard from '../components/CaseStudyCard'

// ─── POS hero screenshot ──────────────────────────────────────────────────────
function POSHeroScreen() {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden">
      <div className="flex items-center gap-1.5 px-5 py-3 bg-[#FAFBFC] border-b border-slate-100">
        <span className="w-3 h-3 rounded-full bg-slate-200"/><span className="w-3 h-3 rounded-full bg-slate-200"/><span className="w-3 h-3 rounded-full bg-slate-200"/>
        <div className="ml-4 flex-1 bg-slate-100 rounded-full h-5 flex items-center px-3 max-w-[200px]">
          <span className="text-[10px] text-slate-400">app.doclink.lk/pos/sales</span>
        </div>
      </div>
      <div className="grid grid-cols-5 bg-[#F5F8FF]">
        {/* Product grid */}
        <div className="col-span-3 p-5 border-r border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-semibold text-slate-500">Products</span>
            <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-lg px-3 py-1.5">
              <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <span className="text-[10px] text-slate-400">Search products…</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {[
              {e:'👕',n:'Plain Tee',p:'LKR 1,200'},
              {e:'👖',n:'Slim Jeans',p:'LKR 3,500'},
              {e:'👟',n:'Sneakers',p:'LKR 6,900'},
              {e:'🧢',n:'Cap',p:'LKR 800'},
              {e:'👗',n:'Dress',p:'LKR 4,200'},
              {e:'🧣',n:'Scarf',p:'LKR 650'},
              {e:'🕶️',n:'Sunglasses',p:'LKR 2,100'},
              {e:'👜',n:'Handbag',p:'LKR 8,400'},
            ].map(({e,n,p})=>(
              <div key={n} className="bg-white border border-slate-100 rounded-xl p-2.5 text-center cursor-pointer hover:border-blue-200 hover:shadow-sm transition-all">
                <div className="text-2xl mb-1.5">{e}</div>
                <div className="text-[9px] font-semibold text-slate-700 leading-tight mb-0.5">{n}</div>
                <div className="text-[9px] text-[#1D4ED8] font-bold">{p}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Cart */}
        <div className="col-span-2 p-5 flex flex-col bg-white">
          <div className="text-[11px] font-semibold text-slate-500 mb-3">Current Sale</div>
          <div className="space-y-2 flex-1">
            {[
              {n:'Plain Tee',q:2,p:'LKR 2,400'},
              {n:'Slim Jeans',q:1,p:'LKR 3,500'},
              {n:'Cap',q:1,p:'LKR 800'},
            ].map(({n,q,p})=>(
              <div key={n} className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <div>
                  <div className="text-[10px] font-semibold text-slate-700">{n}</div>
                  <div className="text-[9px] text-slate-400">×{q}</div>
                </div>
                <span className="text-[10px] font-bold text-slate-700">{p}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-3 mt-2 space-y-2">
            <div className="flex justify-between text-[10px] text-slate-500"><span>Subtotal</span><span>LKR 6,700</span></div>
            <div className="flex justify-between text-[10px] text-slate-500"><span>Tax (10%)</span><span>LKR 670</span></div>
            <div className="flex justify-between text-[12px] font-black text-slate-800"><span>Total</span><span>LKR 7,370</span></div>
            <button className="w-full py-2.5 gradient-brand text-white text-[11px] font-bold rounded-xl">Charge Customer →</button>
            <div className="grid grid-cols-2 gap-2">
              <button className="py-1.5 border border-slate-200 text-[10px] font-semibold text-slate-600 rounded-lg">Cash</button>
              <button className="py-1.5 border border-slate-200 text-[10px] font-semibold text-slate-600 rounded-lg">Card</button>
            </div>
          </div>
        </div>
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
          <div className="rounded-[18px] bg-[#F5F8FF] border border-[#E5E7EB] p-6 reveal reveal-delay-2">
            {screen}
          </div>
        </div>
      </div>
    </div>
  )
}

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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductPOS() {
  useScrollReveal()
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob absolute -top-28 right-0 w-[480px] h-[480px] opacity-[0.09]"
            style={{background:'radial-gradient(circle,#1D4ED8 0%,transparent 70%)'}}/>
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="posgrid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#1D4ED8"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#posgrid)"/>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-[600px] mb-12">
            <div className="fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
              <span className="text-[11.5px] font-semibold text-[#1D4ED8] tracking-wide">POS System</span>
            </div>
            <h1 className="fade-up-2 font-display font-black text-[44px] xl:text-[58px] leading-[1.05] tracking-[-0.02em] text-slate-900 mb-5">
              Stop Reconciling Cash Drawers by Hand
            </h1>
            <p className="fade-up-3 text-[16px] text-slate-500 mb-8">
              Faster billing, live inventory, and end-of-day reports that close themselves.
            </p>
            <div className="fade-up-4">
              <a href="mailto:hello@doclink.lk" className="inline-flex items-center gap-2 px-7 py-3.5 gradient-brand text-white font-semibold rounded-full text-[15px] transition-all hover:shadow-xl hover:shadow-blue-300/25 hover:-translate-y-0.5">
                Book a Demo
              </a>
            </div>
          </div>
          <div className="fade-up-5 max-w-5xl">
            <POSHeroScreen />
          </div>
        </div>
      </section>

      {/* Feature blocks */}
      <section className="bg-white">
        <FeatureBlock
          label="Sales & Order Management"
          title="Bill in under 10 seconds, every time."
          body="Search products by name or barcode, add them to the cart, and charge the customer — card, cash, or QR. The receipt prints automatically. No delays, no errors."
          side="left"
          screen={
            <MiniScreen>
              <div className="text-[9px] font-semibold text-slate-500 mb-2">Barcode Scan → Auto-fill</div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 mb-2">
                <div className="text-[8.5px] text-slate-400 mb-1">Scanned: 8901234567890</div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-semibold text-slate-800">Slim Jeans (32)</span>
                  <span className="text-[10px] font-bold text-[#1D4ED8]">LKR 3,500</span>
                </div>
              </div>
              {[['Checkout time avg','8.2 sec'],['Items / transaction','3.4'],['Payment success','99.8%']].map(([l,v])=>(
                <div key={l} className="flex justify-between py-1 border-b border-slate-50 last:border-0">
                  <span className="text-[8.5px] text-slate-500">{l}</span>
                  <span className="text-[8.5px] font-bold text-slate-700">{v}</span>
                </div>
              ))}
            </MiniScreen>
          }
        />

        <FeatureBlock
          label="Real-time Inventory Sync"
          title="Stock updates the moment you sell."
          body="Every sale deducts from stock in real time across every branch. No separate stock-count step, no end-of-day reconciliation. Out-of-stock items go grey automatically."
          side="right"
          screen={
            <MiniScreen>
              <div className="text-[9px] font-semibold text-slate-500 mb-2">Live Stock — Colombo Branch</div>
              {[['Slim Jeans (32)','8 units','In Stock'],['Plain Tee (L)','3 units','⚠ Low'],['Sneakers (Size 9)','0 units','⛔ Out']].map(([n,q,s])=>(
                <div key={n} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                  <span className="text-[9px] text-slate-700">{n}</span>
                  <div className="text-right">
                    <div className="text-[9px] font-bold text-slate-700">{q}</div>
                    <div className={`text-[8px] font-semibold ${s==='In Stock'?'text-emerald-500':s.includes('Low')?'text-amber-500':'text-rose-500'}`}>{s}</div>
                  </div>
                </div>
              ))}
            </MiniScreen>
          }
        />

        <FeatureBlock
          label="Multi-branch Support"
          title="Run three branches like they're one."
          body="Every cashier in every branch shares the same product catalog and pricing. Transfers between branches are logged and visible to the head office in real time."
          side="left"
          screen={
            <MiniScreen>
              <div className="text-[9px] font-semibold text-slate-500 mb-2">Branch Overview — Today</div>
              {[['Colombo 07','LKR 184,200','42 sales'],['Kandy Branch','LKR 92,400','28 sales'],['Galle Outlet','LKR 67,800','19 sales']].map(([b,r,s])=>(
                <div key={b} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                  <span className="text-[9px] font-semibold text-slate-700">{b}</span>
                  <div className="text-right">
                    <div className="text-[9px] font-bold text-[#1D4ED8]">{r}</div>
                    <div className="text-[8px] text-slate-400">{s}</div>
                  </div>
                </div>
              ))}
            </MiniScreen>
          }
        />

        <FeatureBlock
          label="End-of-Day Reporting"
          title="Close the day in two minutes, not two hours."
          body="The system generates your Z-report, cash variance, and sales-by-category breakdown at shift end. Export to PDF for your accountant or push directly to the ERP ledger."
          side="right"
          screen={
            <MiniScreen>
              <div className="text-[9px] font-semibold text-slate-500 mb-2">Z-Report — 31 Oct 2024</div>
              {[['Gross Sales','LKR 344,400'],['Returns','LKR 4,200'],['Net Sales','LKR 340,200'],['Cash','LKR 148,000'],['Card','LKR 192,200']].map(([l,v])=>(
                <div key={l} className={`flex justify-between py-1 ${l==='Net Sales'?'border-b-2 border-slate-200 font-bold':'border-b border-slate-50'}`}>
                  <span className={`text-[9px] ${l==='Net Sales'?'text-slate-800':'text-slate-500'}`}>{l}</span>
                  <span className={`text-[9px] font-bold ${l==='Net Sales'?'text-[#1D4ED8]':'text-slate-700'}`}>{v}</span>
                </div>
              ))}
            </MiniScreen>
          }
        />
      </section>

      <TrustStrip />
      <CaseStudyCard id="street82" />
      <ProductCTA headline="See DocLink POS live at your counter." sub="Book a demo — we'll show you your actual products in the system." />
    </>
  )
}
