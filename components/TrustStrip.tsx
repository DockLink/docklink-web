import { DocLinkIcon, type DocLinkIconName } from "@/components/icons/DocLinkIcons";

const points: { icon: DocLinkIconName; label: string }[] = [
  { icon: "hosting", label: "Local Hosting & Support" },
  { icon: "pricing", label: "LKR Pricing" },
  { icon: "local", label: "Built for Sri Lankan Businesses" },
  { icon: "lock", label: "Role-based Access" },
];

export default function TrustStrip({ securityFocus = false }: { securityFocus?: boolean }) {
  const items: { icon: DocLinkIconName; label: string }[] = securityFocus
    ? [
        { icon: "hosting", label: "Local Hosting & Support" },
        { icon: "encrypt", label: "Encrypted Patient Data" },
        { icon: "local", label: "Local Compliance Standards" },
        { icon: "lock", label: "Role-based Access Control" },
      ]
    : points;

  return (
    <section className="py-16 bg-white border-y border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {items.map((p) => (
            <div key={p.label} className="flex items-center gap-3 text-slate-500">
              <span className="w-9 h-9 rounded-lg bg-[#F5F8FF] border border-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0">
                <DocLinkIcon name={p.icon} size={18} />
              </span>
              <span className="text-[13.5px] font-semibold text-slate-600">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
