import type { ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '../../utils/cn'

interface MetricCardProps {
  title: string
  value: string | number
  indicator: string
  indicatorColor: string
  icon: ReactNode
  colorClass: 'blue' | 'purple' | 'green' | 'orange'
}

const colorStyles = {
  blue: {
    border: 'border-[#1992FF] dark:border-[rgba(25,146,255,0.6)]',
    iconBgLight: 'bg-[#EFF6FF]',
    iconBgDark: 'dark:bg-[rgba(25,146,255,0.15)]',
    iconText: 'text-[#1992FF]',
    shadowDark: 'dark:shadow-[0_6px_20px_rgba(0,0,0,0.28),0_0_16px_rgba(25,146,255,0.12)]',
  },
  purple: {
    border: 'border-[#B05CFF] dark:border-[rgba(176,92,255,0.6)]',
    iconBgLight: 'bg-[#FAF5FF]',
    iconBgDark: 'dark:bg-[rgba(176,92,255,0.15)]',
    iconText: 'text-[#B05CFF]',
    shadowDark: 'dark:shadow-[0_6px_20px_rgba(0,0,0,0.28),0_0_16px_rgba(176,92,255,0.12)]',
  },
  green: {
    border: 'border-[#00D1B2] dark:border-[rgba(0,209,178,0.6)]',
    iconBgLight: 'bg-[#F0FDFA]',
    iconBgDark: 'dark:bg-[rgba(0,209,178,0.15)]',
    iconText: 'text-[#00D1B2]',
    shadowDark: 'dark:shadow-[0_6px_20px_rgba(0,0,0,0.28),0_0_16px_rgba(0,209,178,0.12)]',
  },
  orange: {
    border: 'border-[#FFB020] dark:border-[rgba(255,176,32,0.6)]',
    iconBgLight: 'bg-[#FFFBEB]',
    iconBgDark: 'dark:bg-[rgba(255,176,32,0.15)]',
    iconText: 'text-[#FFB020]',
    shadowDark: 'dark:shadow-[0_6px_20px_rgba(0,0,0,0.28),0_0_16px_rgba(255,176,32,0.12)]',
  }
}

export function MetricCard({
  title,
  value,
  indicator,
  icon,
  colorClass
}: MetricCardProps) {
  const styles = colorStyles[colorClass]

  const isPositive = indicator.includes('+')
  const isNegative = indicator.includes('-')
  const cleanText = indicator.replace(/[↑↓]/g, '').trim()

  let TrendIcon = Minus
  let trendColor = 'text-[#475569] dark:text-[#CBD5E1]'

  if (isPositive) {
    TrendIcon = TrendingUp
    trendColor = 'text-[#10B981]'
  } else if (isNegative) {
    TrendIcon = TrendingDown
    trendColor = 'text-[#EF4444]'
  }

  return (
    <div className={cn(
      'relative flex flex-col',
      'rounded-[16px] lg:rounded-[20px] p-[14px] lg:p-[18px]',
      'h-[105px] sm:h-[114px] lg:h-[120px]',
      'bg-[#FFFFFF] dark:bg-[#0B1B30]',
      'border border-solid transition-all duration-200 ease-in-out',
      'shadow-[0_4px_14px_rgba(15,23,42,0.08)] hover:-translate-y-[2px]',
      styles.border,
      styles.shadowDark
    )}>
      {/* Title */}
      <span className="text-[14.5px] sm:text-[15px] lg:text-[15.5px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] z-10">
        {title}
      </span>

      {/* Icon */}
      <div className={cn(
        'absolute top-[14px] right-[14px] lg:top-[16px] lg:right-[16px]',
        'flex items-center justify-center rounded-[10px] lg:rounded-[12px] shrink-0',
        'h-[34px] w-[34px] sm:h-[38px] sm:w-[38px] lg:h-[40px] lg:w-[40px]',
        styles.iconBgLight,
        styles.iconBgDark,
        styles.iconText,
        'z-10'
      )}>
        <div className="[&>svg]:w-[18px] [&>svg]:h-[18px] lg:[&>svg]:w-[20px] lg:[&>svg]:h-[20px]">
           {icon}
        </div>
      </div>

      {/* Value */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-1 lg:-mt-2">
        <span className="text-[34px] sm:text-[40px] lg:text-[46px] font-[800] leading-none text-[#0F172A] dark:text-[#F8FAFC]">
          {value}
        </span>
      </div>

      {/* Indicator */}
      <div className="absolute bottom-[12px] lg:bottom-[14px] left-0 w-full flex items-center justify-center gap-[5px] lg:gap-[6px]">
        <TrendIcon className={cn('h-[14px] w-[14px] lg:h-[16px] lg:w-[16px]', trendColor)} strokeWidth={2.5} />
        <span className={cn('text-[12.5px] lg:text-[13.5px] font-semibold tracking-wide', trendColor)}>
          {cleanText}
        </span>
      </div>
    </div>
  )
}
