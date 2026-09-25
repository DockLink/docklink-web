const points = [
  { icon: '🏠', label: 'Local Hosting & Support' },
  { icon: '₨', label: 'LKR Pricing' },
  { icon: '🇱🇰', label: 'Built for Sri Lankan Businesses' },
  { icon: '🔒', label: 'Role-based Access' },
]

export default function TrustStrip({ securityFocus = false }: { securityFocus?: boolean }) {
  const items = securityFocus
    ? [
        { icon: '🏠', label: 'Local Hosting & Support' },
        { icon: '🔐', label: 'Encrypted Patient Data' },
        { icon: '🇱🇰', label: 'Local Compliance Standards' },
        { icon: '🔒', label: 'Role-based Access Control' },
      ]
    : points

  return (
    <section className="py-16 bg-white border-y border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {items.map((p, i) => (
            <div key={i} className="flex items-center gap-3 text-slate-500">
              <span className="text-xl">{p.icon}</span>
              <span className="text-[13.5px] font-semibold text-slate-600">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
