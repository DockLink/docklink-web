function MiniScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center gap-1 border-b border-slate-100 bg-slate-50 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-slate-200" />
        <span className="h-2 w-2 rounded-full bg-slate-200" />
        <span className="h-2 w-2 rounded-full bg-slate-200" />
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function Placeholder() {
  return <div className="h-32 rounded-xl border border-dashed border-slate-200 bg-white/60" />;
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[240px]">
      <div className="relative rounded-[40px] bg-slate-800 p-[10px] shadow-2xl shadow-slate-400/30">
        <div className="relative min-h-[480px] overflow-hidden rounded-[32px] bg-[#F5F8FF]">
          <div className="flex items-center justify-between bg-slate-800 px-5 py-2.5">
            <span className="text-[9px] font-semibold text-white">9:41</span>
            <div className="h-[18px] w-[60px] rounded-full bg-slate-700" />
            <div className="flex items-center gap-1">
              <span className="text-[8px] text-white">LTE</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

const visuals: Record<string, React.ReactNode> = {
  "erp-crm-pipeline": (
    <MiniScreen>
      <div className="mb-2 text-[9px] font-semibold text-slate-500">Pipeline</div>
      {[
        ["Emaar Holdings", "Proposal Sent", "LKR 240k"],
        ["A-Design Studio", "Follow-up Due", "LKR 85k"],
        ["GRID Corp", "Contract Review", "LKR 320k"],
      ].map(([name, status, value]) => (
        <div key={name} className="flex items-center justify-between border-b border-slate-50 py-1.5 last:border-0">
          <div>
            <div className="text-[9px] font-semibold text-slate-700">{name}</div>
            <div className="text-[8px] text-slate-400">{status}</div>
          </div>
          <span className="text-[9px] font-bold text-[#1D4ED8]">{value}</span>
        </div>
      ))}
    </MiniScreen>
  ),
  "erp-crm-followups": (
    <MiniScreen>
      <div className="mb-2 text-[9px] font-semibold text-slate-500">Today&apos;s Follow-ups</div>
      {[
        ["10:00 AM", "Call Mr. Perera re: Proposal"],
        ["2:30 PM", "Send demo to A-Design"],
        ["4:00 PM", "Review GRID contract"],
      ].map(([time, action]) => (
        <div key={time} className="flex items-start gap-2 border-b border-slate-50 py-1.5 last:border-0">
          <span className="shrink-0 pt-0.5 text-[8px] text-slate-400">{time}</span>
          <span className="text-[9px] text-slate-700">{action}</span>
        </div>
      ))}
    </MiniScreen>
  ),
  "erp-invoice": (
    <MiniScreen>
      <div className="mb-2 flex items-start justify-between">
        <div>
          <div className="text-[9px] font-bold text-slate-800">INV-2024-1182</div>
          <div className="text-[8px] text-slate-400">Emaar Holdings</div>
        </div>
        <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold text-emerald-700">Paid</span>
      </div>
      {[
        ["ERP License (Annual)", "1", "LKR 120,000"],
        ["Setup & Training", "1", "LKR 45,000"],
        ["Support Retainer", "12 mo", "LKR 36,000"],
      ].map(([desc, qty, amount]) => (
        <div key={desc} className="flex justify-between border-b border-slate-50 py-1 text-[8px] last:border-0">
          <span className="text-slate-600">
            {desc} <span className="text-slate-400">×{qty}</span>
          </span>
          <span className="font-semibold text-slate-700">{amount}</span>
        </div>
      ))}
      <div className="mt-2 flex justify-between border-t border-slate-100 pt-1 text-[9px] font-bold text-slate-800">
        <span>Total</span>
        <span>LKR 201,000</span>
      </div>
    </MiniScreen>
  ),
  "erp-accounting": (
    <MiniScreen>
      <div className="mb-2 text-[9px] font-semibold text-slate-500">Trial Balance — Oct 2024</div>
      {[
        ["Sales Revenue", "—", "LKR 4,210,000"],
        ["COGS", "LKR 1,840,000", "—"],
        ["Payroll Expense", "LKR 920,000", "—"],
        ["Net Profit", "—", "LKR 1,450,000"],
      ].map(([account, debit, credit]) => (
        <div key={account} className="grid grid-cols-3 border-b border-slate-50 py-1 text-[8px] last:border-0">
          <span className="font-medium text-slate-700">{account}</span>
          <span className="text-right text-slate-500">{debit}</span>
          <span className="text-right text-slate-500">{credit}</span>
        </div>
      ))}
    </MiniScreen>
  ),
  "erp-inventory": (
    <MiniScreen>
      <div className="mb-2 text-[9px] font-semibold text-slate-500">Stock Levels</div>
      {[
        ["SKU-4821", "Office Chair", "142 units", "In Stock"],
        ["SKU-3301", "Printer Paper", "18 reams", "⚠ Low"],
        ["SKU-5590", "Desk Lamp", "0 units", "⛔ Out"],
      ].map(([sku, name, qty, status]) => (
        <div key={sku} className="flex items-center justify-between border-b border-slate-50 py-1.5 last:border-0">
          <div>
            <div className="text-[9px] font-semibold text-slate-700">{name}</div>
            <div className="text-[8px] text-slate-400">{sku}</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-bold text-slate-700">{qty}</div>
            <div
              className={`text-[8px] font-semibold ${
                status === "In Stock" ? "text-emerald-500" : status.includes("Low") ? "text-amber-500" : "text-rose-500"
              }`}
            >
              {status}
            </div>
          </div>
        </div>
      ))}
    </MiniScreen>
  ),
  "erp-payroll": (
    <MiniScreen>
      <div className="mb-2 text-[9px] font-semibold text-slate-500">November Payroll</div>
      {[
        ["K. Jayasuriya", "Manager", "LKR 85,000"],
        ["P. Silva", "Developer", "LKR 72,000"],
        ["R. Fernando", "Accountant", "LKR 65,000"],
      ].map(([name, role, salary]) => (
        <div key={name} className="flex items-center justify-between border-b border-slate-50 py-1.5 last:border-0">
          <div>
            <div className="text-[9px] font-semibold text-slate-700">{name}</div>
            <div className="text-[8px] text-slate-400">{role}</div>
          </div>
          <span className="text-[9px] font-bold text-[#1D4ED8]">{salary}</span>
        </div>
      ))}
      <div className="mt-2 flex justify-between border-t border-slate-100 pt-2 text-[9px] font-bold">
        <span className="text-slate-500">Total Payroll</span>
        <span className="text-slate-800">LKR 222,000</span>
      </div>
    </MiniScreen>
  ),
  "pos-sales": (
    <MiniScreen>
      <div className="mb-2 text-[9px] font-semibold text-slate-500">Barcode Scan → Auto-fill</div>
      <div className="mb-2 rounded-lg border border-slate-100 bg-slate-50 p-2">
        <div className="mb-1 text-[8.5px] text-slate-400">Scanned: 8901234567890</div>
        <div className="flex justify-between">
          <span className="text-[10px] font-semibold text-slate-800">Slim Jeans (32)</span>
          <span className="text-[10px] font-bold text-[#1D4ED8]">LKR 3,500</span>
        </div>
      </div>
      {[
        ["Checkout time avg", "8.2 sec"],
        ["Items / transaction", "3.4"],
        ["Payment success", "99.8%"],
      ].map(([label, value]) => (
        <div key={label} className="flex justify-between border-b border-slate-50 py-1 last:border-0">
          <span className="text-[8.5px] text-slate-500">{label}</span>
          <span className="text-[8.5px] font-bold text-slate-700">{value}</span>
        </div>
      ))}
    </MiniScreen>
  ),
  "pos-inventory": (
    <MiniScreen>
      <div className="mb-2 text-[9px] font-semibold text-slate-500">Live Stock — Colombo Branch</div>
      {[
        ["Slim Jeans (32)", "8 units", "In Stock"],
        ["Plain Tee (L)", "3 units", "⚠ Low"],
        ["Sneakers (Size 9)", "0 units", "⛔ Out"],
      ].map(([name, qty, status]) => (
        <div key={name} className="flex items-center justify-between border-b border-slate-50 py-1.5 last:border-0">
          <span className="text-[9px] text-slate-700">{name}</span>
          <div className="text-right">
            <div className="text-[9px] font-bold text-slate-700">{qty}</div>
            <div
              className={`text-[8px] font-semibold ${
                status === "In Stock" ? "text-emerald-500" : status.includes("Low") ? "text-amber-500" : "text-rose-500"
              }`}
            >
              {status}
            </div>
          </div>
        </div>
      ))}
    </MiniScreen>
  ),
  "pos-branches": (
    <MiniScreen>
      <div className="mb-2 text-[9px] font-semibold text-slate-500">Branch Overview — Today</div>
      {[
        ["Colombo 07", "LKR 184,200", "42 sales"],
        ["Kandy Branch", "LKR 92,400", "28 sales"],
        ["Galle Outlet", "LKR 67,800", "19 sales"],
      ].map(([branch, revenue, sales]) => (
        <div key={branch} className="flex items-center justify-between border-b border-slate-50 py-1.5 last:border-0">
          <span className="text-[9px] font-semibold text-slate-700">{branch}</span>
          <div className="text-right">
            <div className="text-[9px] font-bold text-[#1D4ED8]">{revenue}</div>
            <div className="text-[8px] text-slate-400">{sales}</div>
          </div>
        </div>
      ))}
    </MiniScreen>
  ),
  "doctor-records": (
    <PhoneFrame>
      <div className="p-4">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-base">KS</div>
          <div>
            <div className="text-[11px] font-black text-slate-900">Kaveesha Silva</div>
            <div className="text-[8px] text-slate-400">F · 34 yrs · B+</div>
          </div>
        </div>
        <div className="mb-3 rounded-xl border border-slate-100 bg-white p-3">
          <div className="mb-2 text-[9px] font-semibold text-slate-400">Medical History</div>
          {["Hypertension (2020)", "Type 2 Diabetes (2022)", "Allergic: Penicillin"].map((item) => (
            <div key={item} className="border-b border-slate-50 py-0.5 text-[8.5px] text-slate-700 last:border-0">
              {item}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-3">
          <div className="mb-2 text-[9px] font-semibold text-slate-400">Last Visit — 14 Oct</div>
          <div className="mb-2 text-[8.5px] text-slate-600">BP: 138/88 · Weight: 62kg · Pulse: 76bpm</div>
          <div className="text-[8.5px] font-semibold text-[#1D4ED8]">View full record →</div>
        </div>
      </div>
    </PhoneFrame>
  ),
  "doctor-appointments": (
    <PhoneFrame>
      <div className="p-4">
        <div className="mb-3 text-[10px] font-bold text-slate-800">Book Appointment</div>
        <div className="mb-3 rounded-xl border border-slate-100 bg-white p-3">
          <div className="mb-2 text-[8.5px] font-semibold text-slate-400">November 2024</div>
          <div className="mb-2 grid grid-cols-7 gap-1 text-center">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <div key={`${day}-${index}`} className="text-[7px] font-medium text-slate-400">
                {day}
              </div>
            ))}
            {[...Array(4)].map((_, index) => (
              <div key={index} />
            ))}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((day) => (
              <div
                key={day}
                className={`mx-auto flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-medium ${
                  day === 14 ? "gradient-brand text-white" : day === 7 || day === 12 ? "bg-blue-50 text-[#1D4ED8]" : "text-slate-600"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-3">
          <div className="mb-2 text-[8.5px] font-semibold text-slate-400">Available — 14 Nov</div>
          {["9:00 AM", "10:00 AM", "2:30 PM"].map((time) => (
            <div key={time} className="flex items-center justify-between border-b border-slate-50 py-1.5 last:border-0">
              <span className="text-[9px] font-semibold text-slate-700">{time}</span>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[8px] font-bold text-[#1D4ED8]">Book</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  ),
  "doctor-prescriptions": (
    <PhoneFrame>
      <div className="p-4">
        <div className="mb-3 text-[10px] font-bold text-slate-800">New Prescription</div>
        <div className="mb-3 rounded-xl border border-slate-100 bg-white p-3">
          <div className="mb-1 text-[8.5px] font-semibold text-slate-400">Patient</div>
          <div className="mb-1 text-[10px] font-bold text-slate-800">Kaveesha Silva, 34F</div>
          <div className="text-[8px] text-slate-400">Dr. Perera · 14 Nov 2024</div>
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-3">
          <div className="mb-2 text-[8.5px] font-semibold text-slate-400">Medications</div>
          {[
            { m: "Metformin 500mg", d: "1-0-1 × 30 days" },
            { m: "Amlodipine 5mg", d: "1-0-0 × 30 days" },
            { m: "Vitamin D 1000IU", d: "0-0-1 × 60 days" },
          ].map(({ m, d }) => (
            <div key={m} className="border-b border-slate-50 py-1.5 last:border-0">
              <div className="text-[9px] font-semibold text-slate-800">{m}</div>
              <div className="text-[8px] text-slate-400">{d}</div>
            </div>
          ))}
          <div className="mt-2 w-full rounded-lg py-1.5 text-center text-[9px] font-bold text-white gradient-brand">
            Sign & Send to Pharmacy
          </div>
        </div>
      </div>
    </PhoneFrame>
  ),
  "doctor-ward": (
    <PhoneFrame>
      <div className="p-4">
        <div className="mb-3 text-[10px] font-bold text-slate-800">Ward Round — Ward C</div>
        <div className="mb-3 rounded-xl border border-slate-100 bg-white p-3">
          <div className="mb-2 text-[8.5px] font-semibold text-slate-400">Bed assignments</div>
          {[
            ["Bed 1", "K. Silva", "Stable"],
            ["Bed 2", "R. Fernando", "Monitoring"],
            ["Bed 3", "M. Perera", "Discharge today"],
          ].map(([bed, name, status]) => (
            <div key={bed} className="flex items-center justify-between border-b border-slate-50 py-1.5 last:border-0">
              <div>
                <div className="text-[9px] font-semibold text-slate-800">{name}</div>
                <div className="text-[8px] text-slate-400">{bed}</div>
              </div>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[8px] font-semibold ${
                  status === "Stable"
                    ? "bg-emerald-50 text-emerald-600"
                    : status.includes("Discharge")
                      ? "bg-blue-50 text-[#1D4ED8]"
                      : "bg-amber-50 text-amber-600"
                }`}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["Offline Mode", "Quick Notes", "Vitals", "Drug Ref"].map((label) => (
            <div key={label} className="rounded-xl border border-slate-100 bg-white p-2.5 text-center text-[8.5px] font-semibold text-slate-600">
              {label}
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  ),
  "pos-eod": (
    <MiniScreen>
      <div className="mb-2 text-[9px] font-semibold text-slate-500">Z-Report — 31 Oct 2024</div>
      {[
        ["Gross Sales", "LKR 344,400"],
        ["Returns", "LKR 4,200"],
        ["Net Sales", "LKR 340,200"],
        ["Cash", "LKR 148,000"],
        ["Card", "LKR 192,200"],
      ].map(([label, value]) => (
        <div
          key={label}
          className={`flex justify-between py-1 ${label === "Net Sales" ? "border-b-2 border-slate-200 font-bold" : "border-b border-slate-50"}`}
        >
          <span className={`text-[9px] ${label === "Net Sales" ? "text-slate-800" : "text-slate-500"}`}>{label}</span>
          <span className={`text-[9px] font-bold ${label === "Net Sales" ? "text-[#1D4ED8]" : "text-slate-700"}`}>{value}</span>
        </div>
      ))}
    </MiniScreen>
  ),
};

export default function ProductVisual({ visualKey }: { visualKey: string }) {
  return visuals[visualKey] ?? <Placeholder />;
}
