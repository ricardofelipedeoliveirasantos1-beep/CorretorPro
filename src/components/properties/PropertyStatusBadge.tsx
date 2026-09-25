import { Badge } from '../ui/Badge'
import { type PropertyStatus } from '../../types/property'

interface PropertyStatusBadgeProps {
  status: PropertyStatus
}

export function PropertyStatusBadge({ status }: PropertyStatusBadgeProps) {
  switch (status) {
    case 'Disponível':
      return <Badge variant="success">Disponível</Badge>
    case 'Reservado':
      return <Badge variant="warning">Reservado</Badge>
    case 'Em negociação':
      return <Badge variant="warning">Em negociação</Badge>
    case 'Vendido':
    case 'Alugado':
      return <Badge variant="default">Vendido</Badge> // Usar primary/default
    case 'Inativo':
      return <Badge variant="default">Inativo</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
