import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../utils/cn'

interface DashboardCardProps {
  title: string
  icon: ReactNode
  borderColor: 'blue' | 'purple' | 'teal'
  linkTo: string
  children: ReactNode
}

const borderStyles = {
  blue: 'border-[#1992FF] dark:border-[rgba(25,146,255,0.6)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.25),0_0_16px_rgba(25,146,255,0.15)]',
  purple: 'border-[#B05CFF] dark:border-[rgba(176,92,255,0.6)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.25),0_0_16px_rgba(176,92,255,0.15)]',
  teal: 'border-[#00D1B2] dark:border-[rgba(0,209,178,0.6)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.25),0_0_16px_rgba(0,209,178,0.15)]'
}

const iconBgStyles = {
  blue: 'bg-[#EFF6FF] dark:bg-[rgba(25,146,255,0.15)] text-[#1992FF]',
  purple: 'bg-[#FAF5FF] dark:bg-[rgba(176,92,255,0.15)] text-[#B05CFF]',
  teal: 'bg-[#F0FDFA] dark:bg-[rgba(0,209,178,0.15)] text-[#00D1B2]'
}

export function DashboardCard({ title, icon, borderColor, linkTo, children }: DashboardCardProps) {
  return (
    <div className={cn(
      'flex flex-col rounded-[20px] bg-white p-[16px] lg:p-[20px] border-[1.5px] transition-colors duration-300 w-full overflow-hidden',
      'shadow-[0_6px_18px_rgba(15,23,42,0.05)] dark:bg-[#0A1E39]',
      borderStyles[borderColor]
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn('flex h-[40px] w-[40px] md:h-[44px] md:w-[44px] items-center justify-center rounded-[12px]', iconBgStyles[borderColor])}>
            <div className="[&>svg]:w-[20px] [&>svg]:h-[20px]">{icon}</div>
          </div>
          <h2 className="text-[16.5px] md:text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">
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
