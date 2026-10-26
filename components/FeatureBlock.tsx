export default function FeatureBlock({
  label,
  title,
  body,
  side,
  screen,
}: {
  label: string;
  title: string;
  body: string;
  side: "left" | "right";
  screen: React.ReactNode;
}) {
  return (
    <div className="py-20 border-b border-[#E5E7EB] last:border-0">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`grid lg:grid-cols-2 gap-12 xl:gap-20 items-center ${
            side === "right" ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="reveal">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#1D4ED8] mb-3 block">
              {label}
            </span>
            <h3 className="font-display font-black text-[28px] xl:text-[34px] leading-[1.1] tracking-[-0.02em] text-slate-900 mb-3">
              {title}
            </h3>
            <p className="text-[15px] text-slate-500 leading-relaxed">{body}</p>
          </div>
          <div className="rounded-[18px] bg-[#F5F8FF] border border-[#E5E7EB] p-6 reveal reveal-delay-2 flex items-center justify-center min-h-[220px]">
            {screen}
          </div>
        </div>
      </div>
    </div>
  );
}
