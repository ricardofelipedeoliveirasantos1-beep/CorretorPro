import { cn } from '../../utils/cn'

interface ClientStatusBadgeProps {
  status: string
  className?: string
}

export function ClientStatusBadge({ status, className = '' }: ClientStatusBadgeProps) {
  let label = status
  let colorClasses = 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700'

  switch (status) {
    case 'Ativo':
      colorClasses = 'bg-[#10B981]/10 text-[#059669] border-[#10B981]/30 dark:bg-[#10B981]/20 dark:text-[#34D399] dark:border-[#10B981]/40' // verde suave
      break
    case 'Em negociação':
      colorClasses = 'bg-[#A855F7]/10 text-[#9333EA] border-[#A855F7]/30 dark:bg-[#A855F7]/20 dark:text-[#C084FC] dark:border-[#A855F7]/40' // roxo suave
      break
    case 'Com negócio fechado':
      label = 'Negócio Fechado'
      colorClasses = 'bg-[#F59E0B]/10 text-[#D97706] border-[#F59E0B]/30 dark:bg-[#F59E0B]/20 dark:text-[#FBBF24] dark:border-[#F59E0B]/40' // laranja suave
      break
    case 'Inativo':
      colorClasses = 'bg-[#EF4444]/10 text-[#DC2626] border-[#EF4444]/30 dark:bg-[#EF4444]/20 dark:text-[#F87171] dark:border-[#EF4444]/40' // vermelho suave
      break
    default:
      colorClasses = 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700'
  }

  return (
    <div className={cn(
      "inline-flex items-center justify-center min-w-[140px] h-[32px] px-3 rounded-[8px] border text-[11px] font-bold uppercase tracking-wider",
      colorClasses,
      className
    )}>
      {label}
    </div>
  )
}
