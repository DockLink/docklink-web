import type { ReactNode } from 'react'

export default function OptionCard({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: ReactNode
  title: string
  subtitle: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl border border-[#E5E7EB] bg-white text-left hover:border-[#1D4ED8] hover:bg-blue-50/50 active:border-[#1D4ED8] active:bg-blue-50/50 transition-all group"
    >
      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#1D4ED8] shrink-0 group-hover:bg-[#1D4ED8] group-hover:text-white group-active:bg-[#1D4ED8] group-active:text-white transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display font-bold text-[15px] text-slate-900">{title}</div>
        <div className="text-[13px] text-slate-500 mt-0.5">{subtitle}</div>
      </div>
      <svg
        className="w-4 h-4 text-slate-300 group-hover:text-[#1D4ED8] group-active:text-[#1D4ED8] shrink-0 transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}
