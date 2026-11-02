import MiniScreen from "@/components/MiniScreen";

function Placeholder() {
  return <div className="h-32 rounded-xl border border-dashed border-slate-200 bg-white/60" />;
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[200px]">
      <div className="relative rounded-[38px] bg-slate-800 p-[9px] shadow-2xl shadow-slate-300/40">
        <div className="relative min-h-[400px] overflow-hidden rounded-[30px] bg-[#F5F8FF]">
          <div className="flex items-center justify-between bg-slate-800 px-5 py-2">
            <span className="text-[8px] font-semibold text-white">9:41</span>
            <div className="h-[16px] w-[52px] rounded-full bg-slate-700" />
            <span className="text-[8px] text-white">LTE</span>
          </div>
          {children}
        </div>
      </div>
      <div className="absolute top-20 right-[-5px] h-7 w-[4px] rounded-r-full bg-slate-600" />
      <div className="absolute top-16 left-[-5px] h-5 w-[4px] rounded-l-full bg-slate-600" />
      <div className="absolute top-24 left-[-5px] h-7 w-[4px] rounded-l-full bg-slate-600" />
    </div>
  );
}

function WorkflowScreen() {
  return (
    <MiniScreen url="app.doclink.lk/workflow-designer">
      <div className="mb-3 text-[9px] font-semibold text-slate-500">Custom Approval Workflow — Purchase Orders</div>
      <div className="space-y-2">
        {[
          { step: "1. Staff submits PO request", role: "Any staff", status: "Auto", dot: "bg-slate-300" },
          { step: "2. Dept head approves < LKR 50k", role: "Manager", status: "Required", dot: "bg-amber-400" },
          { step: "3. Finance review > LKR 50k", role: "CFO", status: "Required", dot: "bg-amber-400" },
          { step: "4. Payment released", role: "Accounts", status: "Auto", dot: "bg-[#1D4ED8]" },
        ].map(({ step, role, status, dot }) => (
          <div key={step} className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-[#F5F8FF] p-2.5">
            <div className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
            <div className="flex-1">
              <div className="text-[8.5px] font-semibold text-slate-800">{step}</div>
              <div className="text-[8px] text-slate-400">{role}</div>
            </div>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold ${status === "Auto" ? "bg-blue-50 text-[#1D4ED8]" : "bg-amber-50 text-amber-600"}`}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </MiniScreen>
  );
}

function RBACScreen() {
  return (
    <MiniScreen url="app.doclink.lk/settings/permissions">
      <div className="mb-3 text-[9px] font-semibold text-slate-500">Role Permissions Matrix</div>
      <div className="overflow-x-auto">
        <table className="w-full text-[8px]">
          <thead>
            <tr className="border-b border-slate-100">
              <td className="pb-1.5 font-semibold text-slate-400">Module</td>
              {["Admin", "Manager", "Staff", "View"].map((role) => (
                <td key={role} className="pb-1.5 text-center font-semibold text-slate-400">
                  {role}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Invoicing", "✅", "✅", "Create", "👁"],
              ["Payroll", "✅", "View", "❌", "❌"],
              ["Inventory", "✅", "✅", "✅", "👁"],
              ["Reports", "✅", "✅", "Own", "👁"],
              ["Settings", "✅", "❌", "❌", "❌"],
            ].map(([mod, ...perms]) => (
              <tr key={mod} className="border-b border-slate-50 last:border-0">
                <td className="py-1.5 font-semibold text-slate-700">{mod}</td>
                {perms.map((perm, index) => (
                  <td key={index} className="py-1.5 text-center text-slate-500">
                    {perm}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MiniScreen>
  );
}

function IntegrationScreen() {
  return (
    <MiniScreen url="app.doclink.lk/settings/integrations">
      <div className="mb-3 text-[9px] font-semibold text-slate-500">Connected Integrations</div>
      <div className="space-y-2">
        {[
          { name: "QuickBooks", type: "Accounting", status: "Connected", icon: "📒" },
          { name: "Dialog LKR Gateway", type: "Payments", status: "Connected", icon: "💳" },
          { name: "Notion", type: "Project data", status: "Connected", icon: "📝" },
          { name: "WhatsApp Business API", type: "Notifications", status: "Pending", icon: "💬" },
        ].map(({ name, type, status, icon }) => (
          <div key={name} className="flex items-center justify-between rounded-lg border border-slate-100 bg-[#F5F8FF] px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-base">{icon}</span>
              <div>
                <div className="text-[9px] font-bold text-slate-800">{name}</div>
                <div className="text-[8px] text-slate-400">{type}</div>
              </div>
            </div>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold ${status === "Connected" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </MiniScreen>
  );
}

function SupportScreen() {
  return (
    <MiniScreen url="support.doclink.lk">
      <div className="mb-3 text-[9px] font-semibold text-slate-500">Support & Changelog</div>
      <div className="mb-3 space-y-2">
        {[
          { tag: "v2.4.1 — 12 Nov", note: "Added bulk invoice export to PDF" },
          { tag: "v2.4.0 — 28 Oct", note: "New HR leave calendar view" },
          { tag: "v2.3.8 — 15 Oct", note: "Performance: dashboard loads 40% faster" },
        ].map(({ tag, note }) => (
          <div key={tag} className="border-b border-slate-50 pb-2 last:border-0 last:pb-0">
            <div className="mb-0.5 text-[8px] font-bold text-[#1D4ED8]">{tag}</div>
            <div className="text-[8.5px] text-slate-600">{note}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-[#F5F8FF] p-2">
        <div className="text-[8.5px] font-semibold text-slate-600">
          Active tickets: <span className="text-[#1D4ED8]">2 open</span>
        </div>
        <div className="text-[8px] text-slate-400">Avg response: 2h 14m</div>
      </div>
    </MiniScreen>
  );
}

function SecurityScreen() {
  return (
    <MiniScreen url="app.doclink.lk/security-audit">
      <div className="mb-3 text-[9px] font-semibold text-slate-500">Security Overview</div>
      <div className="mb-3 grid grid-cols-2 gap-2">
        {[
          { icon: "🔐", label: "Data at rest", val: "AES-256" },
          { icon: "🌐", label: "In transit", val: "TLS 1.3" },
          { icon: "🗄️", label: "Backups", val: "Daily" },
          { icon: "📋", label: "Audit log", val: "Always on" },
        ].map(({ icon, label, val }) => (
          <div key={label} className="rounded-lg border border-slate-100 bg-[#F5F8FF] p-2">
            <div className="mb-0.5 text-base">{icon}</div>
            <div className="text-[8px] text-slate-400">{label}</div>
            <div className="text-[9px] font-bold text-slate-700">{val}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 p-2">
        <span className="text-sm">✅</span>
        <div className="text-[8.5px] font-semibold text-emerald-700">Last penetration test: Oct 2024 — No critical findings</div>
      </div>
    </MiniScreen>
  );
}

function SEOScreen() {
  return (
    <MiniScreen url="search.google.com/search-console">
      <div className="mb-3">
        <div className="mb-1.5 text-[9px] font-semibold text-slate-400">Search Performance — Last 28 Days</div>
        <div className="flex h-12 items-end gap-1">
          {[20, 32, 28, 45, 38, 55, 42, 60, 50, 72, 65, 80, 70, 88].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-sm"
              style={{ height: `${height}%`, background: index >= 12 ? "linear-gradient(180deg,#1D4ED8,#38bdf8)" : "#E0E7FF" }}
            />
          ))}
        </div>
      </div>
      {[
        ["Impressions", "24,810", "↑ 34%"],
        ["Clicks", "1,204", "↑ 28%"],
        ["Avg Position", "4.2", "↑ 1.8"],
      ].map(([label, value, delta]) => (
        <div key={label} className="flex justify-between border-b border-slate-50 py-1.5 last:border-0">
          <span className="text-[9px] text-slate-500">{label}</span>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-slate-700">{value}</span>
            <span className="text-[8.5px] font-semibold text-emerald-500">{delta}</span>
          </div>
        </div>
      ))}
    </MiniScreen>
  );
}

function CWVScreen() {
  return (
    <MiniScreen url="pagespeed.web.dev">
      <div className="mb-3 text-[9px] font-semibold text-slate-500">Core Web Vitals — Mobile</div>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {[
          ["LCP", "1.8s", "Good"],
          ["FID", "< 10ms", "Good"],
          ["CLS", "0.02", "Good"],
        ].map(([metric, value, status]) => (
          <div key={metric} className="rounded-xl border border-emerald-100 bg-emerald-50 p-2 text-center">
            <div className="mb-0.5 text-[8px] font-semibold text-emerald-600">{metric}</div>
            <div className="text-[10px] font-black text-emerald-700">{value}</div>
            <div className="text-[7.5px] text-emerald-500">{status}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-[#F5F8FF] p-2.5">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[9px] font-semibold text-slate-600">Performance Score</span>
          <span className="text-[10px] font-black text-emerald-600">96</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-emerald-400" style={{ width: "96%" }} />
        </div>
      </div>
    </MiniScreen>
  );
}

function ConversionScreen() {
  return (
    <MiniScreen url="app.doclink.lk/web-demo">
      <div className="mb-3 text-[9px] font-semibold text-slate-500">Conversion Funnel</div>
      {[
        { stage: "Visited landing page", n: 4820, pct: 100, w: "100%" },
        { stage: "Scrolled past hero", n: 3614, pct: 75, w: "75%" },
        { stage: "Clicked CTA button", n: 1446, pct: 30, w: "30%" },
        { stage: "Submitted enquiry", n: 482, pct: 10, w: "10%" },
      ].map(({ stage, n, pct, w }) => (
        <div key={stage} className="mb-2">
          <div className="mb-0.5 flex justify-between text-[8.5px]">
            <span className="text-slate-500">{stage}</span>
            <span className="font-bold text-slate-700">
              {n.toLocaleString()} <span className="text-slate-400">({pct}%)</span>
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#38bdf8]" style={{ width: w }} />
          </div>
        </div>
      ))}
    </MiniScreen>
  );
}

function ResponsiveScreen() {
  return (
    <div className="flex items-end justify-center gap-4">
      <div className="w-[140px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-1 border-b border-slate-100 bg-[#F5F8FF] px-2 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
        </div>
        <div className="p-2">
          <div className="mb-1.5 h-4 w-3/4 rounded bg-[#1D4ED8]/10" />
          <div className="mb-1 h-2 w-full rounded bg-slate-100" />
          <div className="mb-2 h-2 w-4/5 rounded bg-slate-100" />
          <div className="mb-2 h-5 w-1/2 rounded-full gradient-brand" />
          <div className="grid grid-cols-3 gap-1">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-8 rounded border border-slate-100 bg-[#F5F8FF]" />
            ))}
          </div>
        </div>
      </div>
      <div className="w-[56px] overflow-hidden rounded-[14px] border-2 border-slate-300 bg-white shadow-md">
        <div className="flex h-3 items-center justify-center bg-slate-800">
          <div className="h-1.5 w-8 rounded-full bg-slate-600" />
        </div>
        <div className="p-1.5">
          <div className="mb-1 h-2.5 w-full rounded bg-[#1D4ED8]/10" />
          <div className="mb-0.5 h-1.5 w-full rounded bg-slate-100" />
          <div className="mb-1.5 h-1.5 w-4/5 rounded bg-slate-100" />
          <div className="mb-1.5 h-3.5 w-full rounded-full gradient-brand" />
          <div className="space-y-1">
            {[0, 1].map((item) => (
              <div key={item} className="h-6 rounded border border-slate-100 bg-[#F5F8FF]" />
            ))}
          </div>
        </div>
      </div>
      <div className="ml-2 text-center">
        <div className="text-[9px] leading-tight font-semibold text-slate-500">
          Every device.
          <br />
          Same experience.
        </div>
      </div>
    </div>
  );
}

function CrossPlatformScreen() {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="text-center">
        <PhoneFrame>
          <div className="p-3">
            <div className="mb-3 text-center text-[9px] font-bold text-slate-800">iOS</div>
            <div className="mb-2 rounded-xl border border-slate-100 bg-white p-2.5">
              <div className="mb-1.5 h-2 w-3/4 rounded bg-[#1D4ED8]/20" />
              <div className="mb-1 h-1.5 w-full rounded bg-slate-100" />
              <div className="mb-2.5 h-1.5 w-4/5 rounded bg-slate-100" />
              <div className="h-6 rounded-full gradient-brand" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="h-12 rounded-xl border border-slate-100 bg-white" />
              ))}
            </div>
          </div>
        </PhoneFrame>
        <div className="mt-3 text-[9px] font-semibold text-slate-400">iPhone 15</div>
      </div>
      <div className="text-[10px] font-bold text-slate-300">
        Same
        <br />
        codebase
      </div>
      <div className="text-center">
        <PhoneFrame>
          <div className="p-3">
            <div className="mb-3 text-center text-[9px] font-bold text-slate-800">Android</div>
            <div className="mb-2 rounded-xl border border-slate-100 bg-white p-2.5">
              <div className="mb-1.5 h-2 w-3/4 rounded bg-[#1D4ED8]/20" />
              <div className="mb-1 h-1.5 w-full rounded bg-slate-100" />
              <div className="mb-2.5 h-1.5 w-4/5 rounded bg-slate-100" />
              <div className="h-6 rounded-full gradient-brand" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="h-12 rounded-xl border border-slate-100 bg-white" />
              ))}
            </div>
          </div>
        </PhoneFrame>
        <div className="mt-3 text-[9px] font-semibold text-slate-400">Samsung S24</div>
      </div>
    </div>
  );
}

function UIScreen() {
  return (
    <PhoneFrame>
      <div className="p-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-[8px] text-slate-400">Good morning,</div>
            <div className="text-[11px] font-black text-slate-900">Nalaka</div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-brand text-xs font-bold text-white">N</div>
        </div>
        <div className="mb-3 rounded-2xl p-4 text-white gradient-brand">
          <div className="mb-1 text-[8.5px] font-semibold opacity-70">Today&apos;s Revenue</div>
          <div className="mb-1 text-[20px] leading-none font-black">LKR 84,200</div>
          <div className="text-[8px] opacity-70">↑ 14% vs yesterday</div>
        </div>
        <div className="mb-3 grid grid-cols-2 gap-2">
          {[
            ["📦", "42 Orders"],
            ["⭐", "4.9 Rating"],
            ["📊", "12 Reports"],
            ["💬", "3 Messages"],
          ].map(([icon, label]) => (
            <div key={label} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-2.5">
              <span className="text-base">{icon}</span>
              <span className="text-[9px] font-semibold text-slate-700">{label}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-2.5">
          <div className="mb-1.5 text-[8px] font-semibold text-slate-400">Recent Activity</div>
          {["Order #1184 placed", "Stock alert: Item #88", "Invoice sent to Emaar"].map((activity) => (
            <div key={activity} className="border-b border-slate-50 py-1 text-[8px] text-slate-600 last:border-0">
              {activity}
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function OfflineScreen() {
  return (
    <PhoneFrame>
      <div className="p-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[10px] font-bold text-slate-800">Field Rep View</div>
          <div className="flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-[8px] font-semibold text-amber-600">Offline</span>
          </div>
        </div>
        <div className="mb-3 rounded-xl border border-amber-100 bg-amber-50 p-2.5 text-[8px] font-semibold text-amber-700">
          No internet — working from local cache. Changes will sync when you&apos;re back online.
        </div>
        <div className="space-y-2">
          {[
            { client: "Emaar Holdings", task: "Site visit — complete form", done: true },
            { client: "Street82 Kandy", task: "Stock count — 14 SKUs", done: false },
            { client: "GRID Corp", task: "Demo sign-off", done: false },
          ].map(({ client, task, done }) => (
            <div key={client} className="rounded-xl border border-slate-100 bg-white p-3">
              <div className="mb-0.5 flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-800">{client}</span>
                {done ? (
                  <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold text-emerald-600">Done</span>
                ) : null}
              </div>
              <span className="text-[8px] text-slate-400">{task}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 border-t border-slate-100 pt-2 text-center text-[8px] text-slate-400">3 changes queued to sync</div>
      </div>
    </PhoneFrame>
  );
}

function AppStoreScreen() {
  return (
    <div className="w-full max-w-[340px] space-y-3">
      {[
        { store: "App Store", icon: "🍎", color: "bg-slate-900 text-white", rating: "4.8", reviews: "1.2k" },
        { store: "Google Play", icon: "🤖", color: "bg-emerald-600 text-white", rating: "4.7", reviews: "2.4k" },
      ].map(({ store, icon, color, rating, reviews }) => (
        <div key={store} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${color}`}>{icon}</div>
            <div>
              <div className="text-[11px] font-bold text-slate-800">{store}</div>
              <div className="text-[10px] text-slate-400">Published by DocLink</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <div className="font-display text-[24px] leading-none font-black text-[#1D4ED8]">{rating}</div>
              <div className="mt-0.5 flex gap-0.5">
                {[0, 1, 2, 3, 4].map((star) => (
                  <span key={star} className="text-[9px] text-amber-400">
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="text-[11px] text-slate-500">{reviews} ratings</div>
          </div>
        </div>
      ))}
      <div className="text-center text-[11px] text-slate-400">We handle submission, review, and version management.</div>
    </div>
  );
}

const visuals: Record<string, React.ReactNode> = {
  "software-workflow": <WorkflowScreen />,
  "software-rbac": <RBACScreen />,
  "software-integrations": <IntegrationScreen />,
  "software-support": <SupportScreen />,
  "software-security": <SecurityScreen />,
  "web-seo": <SEOScreen />,
  "web-cwv": <CWVScreen />,
  "web-conversion": <ConversionScreen />,
  "web-responsive": <ResponsiveScreen />,
  "mobile-cross-platform": <CrossPlatformScreen />,
  "mobile-ui": (
    <div className="flex justify-center">
      <UIScreen />
    </div>
  ),
  "mobile-offline": (
    <div className="flex justify-center">
      <OfflineScreen />
    </div>
  ),
  "mobile-app-stores": (
    <div className="flex items-center justify-center py-2">
      <AppStoreScreen />
    </div>
  ),
};

export function MobileHeroVisual() {
  return <UIScreen />;
}

export default function ServiceVisual({ visualKey }: { visualKey: string }) {
  return visuals[visualKey] ?? <Placeholder />;
}
