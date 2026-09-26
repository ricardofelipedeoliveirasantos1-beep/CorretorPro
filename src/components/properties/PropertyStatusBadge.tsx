import { type PropertyStatus } from '../../types/property'

interface PropertyStatusBadgeProps {
  status: PropertyStatus
}

export function PropertyStatusBadge({ status }: PropertyStatusBadgeProps) {
  switch (status) {
    case 'Disponível':
      return (
        <span className="inline-flex rounded-full bg-[#10B981]/10 px-3 py-1 text-[12.5px] font-bold text-[#10B981] border border-[#10B981]/20">
          DISPONÍVEL
        </span>
      )
    case 'Negociando':
      return (
        <span className="inline-flex rounded-full bg-[#F59E0B]/10 px-3 py-1 text-[12.5px] font-bold text-[#F59E0B] border border-[#F59E0B]/20">
          NEGOCIANDO
        </span>
      )
    case 'Vendido':
      return (
        <span className="inline-flex rounded-full bg-[#64748B]/10 px-3 py-1 text-[12.5px] font-bold text-[#64748B] border border-[#64748B]/20">
          VENDIDO
        </span>
      )
    case 'Indisponível':
      return (
        <span className="inline-flex rounded-full bg-[#EF4444]/10 px-3 py-1 text-[12.5px] font-bold text-[#EF4444] border border-[#EF4444]/20">
          INDISPONÍVEL
        </span>
      )
    default:
      return (
        <span className="inline-flex rounded-full bg-base-100 px-3 py-1 text-[12.5px] font-bold text-base-500 border border-base-200">
          {status}
        </span>
      )
  }
}
