import { type Owner } from '../../types/owner'
import { Phone, Mail } from 'lucide-react'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'

interface OwnerCardProps {
  owner: Owner
}

export function OwnerCard({ owner }: OwnerCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-base-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-base-900">{owner.firstName} {owner.lastName}</h3>
          <p className="text-sm text-base-500">{owner.propertyCount} imóveis</p>
        </div>
      </div>

      <div className="mb-4 space-y-2 text-sm text-base-600">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 shrink-0 text-base-400" />
          <span>{owner.whatsapp || owner.phone || 'Não informado'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 shrink-0 text-base-400" />
          <span className="truncate">{owner.email || 'Não informado'}</span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-4 border-t border-base-100">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link to={`/proprietarios/${owner.id}`}>Ver</Link>
        </Button>
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link to={`/proprietarios/${owner.id}/editar`}>Editar</Link>
        </Button>
        <Button variant="primary" size="sm" className="flex-1" onClick={() => alert('Mock: WhatsApp')}>
          WhatsApp
        </Button>
      </div>
    </div>
  )
}
