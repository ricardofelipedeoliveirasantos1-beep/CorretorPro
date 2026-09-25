import { type Property } from '../../types/property'
import { PropertyStatusBadge } from './PropertyStatusBadge'
import { MapPin, Bed, Bath, Car, Maximize } from 'lucide-react'
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

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-base-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-100">
        <img 
          src={coverPhoto} 
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <PropertyStatusBadge status={property.status} />
          {property.isPublished && (
            <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
              Publicado
            </span>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <div className="rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-base-900 shadow-sm backdrop-blur-sm">
            {property.code}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-base font-semibold leading-tight text-base-900">
            {property.title}
          </h3>
        </div>

        <div className="mb-4 flex items-center text-sm text-base-500">
          <MapPin className="mr-1 h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{property.address.neighborhood} • {property.address.city}</span>
        </div>

        <div className="mb-4 text-lg font-bold text-primary-700">
          {price} <span className="text-xs font-normal text-base-500">{property.purpose === 'Aluguel' ? '/mês' : ''}</span>
        </div>

        {/* Features row */}
        <div className="mb-4 flex items-center gap-3 border-y border-base-100 py-3 text-sm text-base-600">
          <div className="flex items-center gap-1" title="Quartos">
            <Bed className="h-4 w-4" />
            <span>{property.features.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1" title="Banheiros">
            <Bath className="h-4 w-4" />
            <span>{property.features.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1" title="Vagas">
            <Car className="h-4 w-4" />
            <span>{property.features.parkingSpaces}</span>
          </div>
          <div className="flex items-center gap-1" title="Área">
            <Maximize className="h-4 w-4" />
            <span>{property.features.totalArea}m²</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={`/imoveis/${property.id}`}>Ver</Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={`/imoveis/${property.id}/editar`}>Editar</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
