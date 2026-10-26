export default function ProgressBar({
  step,
  total = 3,
}: {
  step: number
  total?: number
}) {
  const pct = Math.max(0, Math.min(100, (step / total) * 100))

  return (
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#E5E7EB] overflow-hidden rounded-t-[24px]">
      <div
        className="h-full bg-[#1D4ED8] transition-all duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
