import Link from "next/link";

type CaseStudy = {
  client: string;
  industry: string;
  headline: string;
  gradient: string;
  stats: { number: string; label: string }[];
};

const studies: Record<string, CaseStudy> = {
  emaar: {
    client: "Emaar",
    industry: "Real Estate",
    headline: "How Emaar automated payroll for 300 employees",
    gradient: "from-[#1e3a8a] to-[#1D4ED8]",
    stats: [
      { number: "300", label: "employees on automated payroll" },
      { number: "200 hrs", label: "saved per month on payroll" },
    ],
  },
  street82: {
    client: "Street82",
    industry: "Retail",
    headline: "How Street82 cut stock discrepancies to near zero",
    gradient: "from-[#1D4ED8] to-[#0284c7]",
    stats: [
      { number: "94%", label: "reduction in inventory errors" },
      { number: "3 wks", label: "to full deployment" },
    ],
  },
};

export default function CaseStudyCard({ id }: { id: keyof typeof studies }) {
  const cs = studies[id];
  return (
    <section className="py-20 bg-[#FAFBFC]">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8] mb-4">Case Study</p>
        <Link href={`/case-studies/${id}`} className="group block max-w-xl rounded-[18px] border border-[#E5E7EB] bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
          <div className={`h-[100px] bg-gradient-to-r ${cs.gradient} p-5 flex items-end`}>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 border border-white/25 rounded-full text-[11px] font-semibold text-white">
              {cs.industry}
            </span>
          </div>
          <div className="p-7">
            <h3 className="font-display font-bold text-[17px] text-slate-900 leading-snug mb-5">{cs.headline}</h3>
            <div className="h-px bg-slate-100 mb-5" />
            <div className="grid grid-cols-2 gap-5">
              {cs.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display font-black text-[30px] text-[#1D4ED8] leading-none mb-1">{s.number}</div>
                  <div className="text-[12px] text-slate-500 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold text-[#1D4ED8] group-hover:gap-2.5 transition-all">
              Read case study
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
