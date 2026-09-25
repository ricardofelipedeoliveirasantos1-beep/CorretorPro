import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline'
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-base-400 focus:ring-offset-2',
          {
            'bg-base-100 text-base-900': variant === 'default',
            'bg-primary-100 text-primary-700': variant === 'primary',
            'bg-emerald-100 text-emerald-700': variant === 'success',
            'bg-amber-100 text-amber-700': variant === 'warning',
            'bg-red-100 text-red-700': variant === 'danger',
            'border border-base-200 text-base-900': variant === 'outline',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'
