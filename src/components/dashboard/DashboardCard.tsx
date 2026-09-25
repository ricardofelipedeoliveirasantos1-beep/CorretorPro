import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../utils/cn'

interface DashboardCardProps {
  title: string
  icon: ReactNode
  borderColor: 'blue' | 'green'
  linkTo: string
  children: ReactNode
}

const borderStyles = {
  blue: 'border-[#1685FF]',
  green: 'border-[#10B981]'
}

const iconBgStyles = {
  blue: 'bg-[#EAF3FF] dark:bg-[rgba(22,133,255,0.16)] text-[#1685FF]',
  green: 'bg-[#D1FAE5] dark:bg-[rgba(16,185,129,0.16)] text-[#10B981]'
}

export function DashboardCard({ title, icon, borderColor, linkTo, children }: DashboardCardProps) {
  return (
    <div className={cn(
      'flex flex-col rounded-[14px] md:rounded-[16px] bg-white p-[18px] md:p-[28px] border-[1.5px] transition-colors duration-300 w-full overflow-hidden',
      'shadow-[0_6px_18px_rgba(15,23,42,0.05)] dark:shadow-none',
      'dark:bg-[#111C2E] dark:bg-gradient-to-br dark:from-[#111C2E] dark:to-[#0D1727]',
      borderStyles[borderColor]
    )}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={cn('flex h-[44px] w-[44px] md:h-[52px] md:w-[52px] items-center justify-center rounded-[12px] md:rounded-[14px]', iconBgStyles[borderColor])}>
            {icon}
          </div>
          <h2 className="text-[18px] md:text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            {title}
          </h2>
        </div>
        <Link
          to={linkTo}
          className="text-sm font-medium text-[#1685FF] hover:text-blue-700 dark:hover:text-blue-400 flex items-center shrink-0"
        >
          Ver todos <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 -mr-2 [scrollbar-width:thin]">
        {children}
      </div>
    </div>
  )
}
