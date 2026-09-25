import { type Property } from '../../types/property'
import { PropertyStatusBadge } from './PropertyStatusBadge'
import { MapPin, Globe } from 'lucide-react'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const coverPhoto = property.photos.find((p: any) => p.isCover)?.url || property.photos[0]?.url || 'https://via.placeholder.com/400x300?text=Sem+Foto'

  const price = property.purpose === 'Venda'
    ? property.salePrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : property.rentPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const shortDesc = property.features?.bedrooms ? `${property.features.bedrooms} quartos, ${property.features.totalArea}m²` : 'Excelente imóvel'

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-base-200 dark:border-[#24344D] bg-white dark:bg-[#111C2E] shadow-sm transition-colors duration-300 w-full mb-4">
      {/* Top Header - Mobile new structure */}
      <div className="flex flex-col gap-1 p-4 pb-3 border-b border-base-100 dark:border-[#24344D]">
        <div className="flex items-center gap-2">
          <span className="inline-flex rounded-md bg-primary-50 dark:bg-[rgba(22,133,255,0.15)] px-2 py-0.5 text-xs font-bold text-primary-700 dark:text-[#1685FF] border border-primary-200 dark:border-[rgba(22,133,255,0.3)] shrink-0">
            {property.code}
          </span>
          <span className="text-sm font-medium text-base-500 dark:text-[#B7C2D6] truncate">
            {shortDesc}
          </span>
        </div>
      </div>

      {/* Image container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-base-100 dark:bg-slate-800">
        <img
          src={coverPhoto}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {property.isPublished && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-black/60 px-2 py-1 text-[10px] font-bold text-primary-600 dark:text-[#1685FF] shadow-sm backdrop-blur-sm">
              <Globe className="mr-1 h-3 w-3" />
              Publicado
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-tight text-base-900 dark:text-[#F8FAFC] mb-2">
          {property.title}
        </h3>

        <div className="mb-3 flex items-center text-sm text-base-500 dark:text-[#B7C2D6]">
          <MapPin className="mr-1.5 h-4 w-4 shrink-0 text-base-400" />
          <span className="truncate">{property.address.neighborhood} • {property.address.city}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <p className="text-[11px] text-base-500 dark:text-[#B7C2D6] font-medium mb-0.5">Finalidade</p>
            <span className="inline-flex rounded-full bg-base-100 dark:bg-[#0B1320] border border-base-200 dark:border-[#24344D] px-2.5 py-0.5 text-xs font-medium text-base-700 dark:text-[#B7C2D6]">
              {property.purpose}
            </span>
          </div>
          <div>
            <p className="text-[11px] text-base-500 dark:text-[#B7C2D6] font-medium mb-0.5">Status</p>
            <PropertyStatusBadge status={property.status} />
          </div>
        </div>

        <div className="mb-4 text-xl font-bold text-base-900 dark:text-[#F8FAFC] border-t border-base-100 dark:border-[#24344D] pt-3">
          {price} <span className="text-xs font-normal text-base-500 dark:text-[#B7C2D6]">{property.purpose === 'Aluguel' ? '/mês' : ''}</span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <Button variant="outline" className="flex-1 dark:border-[#24344D] dark:text-[#B7C2D6] dark:hover:bg-white/5 dark:hover:text-[#F8FAFC]" asChild>
            <Link to={`/imoveis/${property.id}`}>Ver Detalhes</Link>
          </Button>
          <Button variant="outline" className="flex-1 dark:border-[#24344D] dark:text-[#B7C2D6] dark:hover:bg-white/5 dark:hover:text-[#F8FAFC]" asChild>
            <Link to={`/imoveis/${property.id}/editar`}>Editar</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
