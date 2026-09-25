import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-base-800 dark:text-[#B7C2D6]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-11 w-full rounded-xl border border-base-300 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-base-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
            'dark:bg-[#0B1320] dark:border-[#334155] dark:text-[#F8FAFC] dark:placeholder-[#7F8EA3] dark:focus-visible:border-[#1685FF] dark:focus-visible:ring-[rgba(22,133,255,0.15)] dark:focus-visible:ring-offset-0',
            error && 'border-red-500 focus-visible:ring-red-500 dark:border-red-500 dark:focus-visible:border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-sm text-red-500">{error}</span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
