import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[44px] w-full rounded-2xl bg-cg-white px-4 py-2.5 text-xm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-blue-75 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-purple-100 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
