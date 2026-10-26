export default function PillGroup({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const selected = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all ${
              selected
                ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white'
                : 'bg-white border-[#E5E7EB] text-slate-600 hover:border-slate-300 hover:text-slate-800'
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
