import type { ReactNode } from 'react'
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
    border: 'border-[#1685FF] dark:shadow-[0_0_18px_rgba(22,133,255,0.15)]',
    iconBgLight: 'bg-[#EAF3FF]',
    iconBgDark: 'dark:bg-[rgba(22,133,255,0.18)]',
    iconText: 'text-[#1685FF]',
  },
  purple: {
    border: 'border-[#A855F7] dark:shadow-[0_0_18px_rgba(168,85,247,0.15)]',
    iconBgLight: 'bg-[#F3E8FF]',
    iconBgDark: 'dark:bg-[rgba(168,85,247,0.18)]',
    iconText: 'text-[#A855F7]',
  },
  green: {
    border: 'border-[#10B981] dark:shadow-[0_0_18px_rgba(16,185,129,0.15)]',
    iconBgLight: 'bg-[#D1FAE5]',
    iconBgDark: 'dark:bg-[rgba(16,185,129,0.18)]',
    iconText: 'text-[#10B981]',
  },
  orange: {
    border: 'border-[#F59E0B] dark:shadow-[0_0_18px_rgba(245,158,11,0.15)]',
    iconBgLight: 'bg-[#FEF3C7]',
    iconBgDark: 'dark:bg-[rgba(245,158,11,0.18)]',
    iconText: 'text-[#F59E0B]',
  }
}

export function MetricCard({
  title,
  value,
  indicator,
  indicatorColor,
  icon,
  colorClass
}: MetricCardProps) {
  const styles = colorStyles[colorClass]

  return (
    <div className={cn(
      'flex flex-col justify-between rounded-[14px] md:rounded-[16px] bg-white p-[18px] md:p-[28px] border-[1.5px] transition-colors duration-300',
      'shadow-[0_6px_18px_rgba(15,23,42,0.05)] dark:shadow-none',
      'dark:bg-[#111C2E] dark:bg-gradient-to-br dark:from-[#111C2E] dark:to-[#0D1727]',
      styles.border
    )}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-[14px] md:text-sm font-medium text-[#475569] dark:text-[#B7C2D6]">
            {title}
          </span>
          <span className="text-[30px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-2 md:mt-4">
            {value}
          </span>
          <span
            className="text-[12px] md:text-sm font-medium mt-1 md:mt-2"
            style={{ color: indicatorColor }}
          >
            {indicator}
          </span>
        </div>
        <div className={cn(
          'flex h-[44px] w-[44px] md:h-[56px] md:w-[56px] items-center justify-center rounded-[12px] md:rounded-[14px] shrink-0',
          styles.iconBgLight,
          styles.iconBgDark,
          styles.iconText
        )}>
          {icon}
        </div>
      </div>
    </div>
  )
}
