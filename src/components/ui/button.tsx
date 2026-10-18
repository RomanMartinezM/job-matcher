import type { ButtonHTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300 disabled:pointer-events-none disabled:opacity-45 enabled:active:scale-[0.96]",
  {
    variants: {
      variant: {
        default: "border border-lime-300 bg-lime-300 text-[#0B1002] hover:bg-lime-200",
        secondary: "border border-[#292F3A] bg-[#151922] text-[#F5F7FA] hover:bg-[#1C222D]",
        outline: "border border-teal-300/40 bg-transparent text-teal-200 hover:bg-teal-300/10",
        ghost: "border border-transparent bg-transparent text-[#A1A9B8] hover:bg-[#1C222D] hover:text-[#F5F7FA]",
      },
      size: {
        default: "min-h-11 px-[18px]",
        sm: "min-h-9 px-3 text-[13px]",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: { variant: "secondary", size: "default" },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} type={type} {...props} />
}
