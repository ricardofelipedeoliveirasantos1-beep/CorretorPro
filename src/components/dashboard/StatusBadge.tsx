import { cn } from '../../utils/cn'

interface StatusBadgeProps {
  status: 'Novo' | 'Em contato'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
      status === 'Novo'
        ? 'bg-[#D1FAE5] text-[#047857] dark:bg-[rgba(16,185,129,0.25)] dark:text-[#34D399]'
        : 'bg-[#FEF3C7] text-[#B45309] dark:bg-[rgba(245,158,11,0.25)] dark:text-[#FBBF24]'
    )}>
      {status}
    </span>
  )
}

export function AppointmentBadge({ type }: { type: string }) {
  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-transparent',
      type === 'Visita'
        ? 'border-[#1685FF] text-[#1685FF]'
        : 'border-[#A855F7] text-[#A855F7]'
    )}>
      {type}
    </span>
  )
}
