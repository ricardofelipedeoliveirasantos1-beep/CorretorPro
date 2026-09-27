import { cn } from '../../utils/cn'

interface ClientStatusBadgeProps {
  status: string
  className?: string
}

export function ClientStatusBadge({ status, className = '' }: ClientStatusBadgeProps) {
  let label = status
  let bgColorClass = 'bg-gray-500'

  switch (status) {
    case 'Ativo':
      bgColorClass = 'bg-[#10B981]' // verde
      break
    case 'Em negociação':
      bgColorClass = 'bg-[#F97316]' // laranja
      break
    case 'Com negócio fechado':
      label = 'Negócio Fechado'
      bgColorClass = 'bg-[#10B981]' // verde
      break
    case 'Inativo':
      bgColorClass = 'bg-[#EF4444]' // vermelho
      break
    default:
      bgColorClass = 'bg-gray-500'
  }

  return (
    <div className={cn(
      "inline-flex items-center justify-center min-w-[140px] h-[32px] px-3 rounded-full text-[11px] font-bold uppercase tracking-wider text-white",
      bgColorClass,
      className
    )}>
      {label}
    </div>
  )
}
