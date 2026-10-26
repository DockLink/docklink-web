import Link from "next/link";

export default function ProductCTA({
  headline = "Ready to see it in action?",
  sub = "A 20-minute demo is all it takes.",
  buttonLabel = "Book a Demo",
  href = "/contact",
}: {
  headline?: string;
  sub?: string;
  buttonLabel?: string;
  href?: string;
}) {
  return (
    <section className="py-24 gradient-brand relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="pcta" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="white"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#pcta)"/>
        </svg>
      </div>
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-display font-black text-[30px] sm:text-[38px] xl:text-[46px] leading-[1.08] tracking-[-0.02em] text-white mb-3">
          {headline}
        </h2>
        <p className="text-blue-100/75 text-[15px] mb-8">{sub}</p>
        {href.startsWith("/") ? (
          <Link
            href={href}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D4ED8] font-bold rounded-full text-[15px] transition-all hover:shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-1 active:translate-y-0"
          >
            {buttonLabel}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </Link>
        ) : (
          <a
            href={href}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D4ED8] font-bold rounded-full text-[15px] transition-all hover:shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-1 active:translate-y-0"
          >
            {buttonLabel}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        )}
      </div>
    </section>
  );
}
