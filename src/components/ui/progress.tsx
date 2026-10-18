import { cn } from "@/lib/utils"

type ProgressProps = {
  value: number
  className?: string
  label: string
}

export function Progress({ value, className, label }: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={clampedValue}
      className={cn("h-1.5 overflow-hidden rounded-full bg-[#232936]", className)}
      role="progressbar"
    >
      <div
        className="h-full rounded-full bg-[linear-gradient(90deg,#2DD4BF,#A3E635)] transition-[width] duration-500"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  )
}
