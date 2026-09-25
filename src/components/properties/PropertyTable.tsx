import { type Property } from '../../types/property'
import { PropertyStatusBadge } from './PropertyStatusBadge'
import { Edit, Eye, Globe } from 'lucide-react'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'

interface PropertyTableProps {
  properties: Property[]
}

export function PropertyTable({ properties }: PropertyTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-base-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-base-50 text-base-500">
          <tr>
            <th className="px-4 py-3 font-medium">Imóvel</th>
            <th className="px-4 py-3 font-medium">Localização</th>
            <th className="px-4 py-3 font-medium">Finalidade</th>
            <th className="px-4 py-3 font-medium">Preço</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-center">Portal</th>
            <th className="px-4 py-3 font-medium text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-base-200">
          {properties.map((property) => {
            const coverPhoto = property.photos.find((p: any) => p.isCover)?.url || property.photos[0]?.url || 'https://via.placeholder.com/400x300?text=Sem+Foto'
            const price = property.purpose === 'Venda' 
              ? property.salePrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              : property.rentPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

            return (
              <tr key={property.id} className="transition-colors hover:bg-base-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-base-100">
                      <img src={coverPhoto} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="max-w-[200px] lg:max-w-[300px]">
                      <p className="truncate font-medium text-base-900" title={property.title}>{property.title}</p>
                      <p className="text-xs text-base-500">{property.code}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-base-900">{property.address.neighborhood}</p>
                  <p className="text-xs text-base-500">{property.address.city}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-base-100 px-2 py-1 text-xs font-medium text-base-700">
                    {property.purpose}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-base-900">
                  {price}
                </td>
                <td className="px-4 py-3">
                  <PropertyStatusBadge status={property.status} />
                </td>
                <td className="px-4 py-3 text-center" title="Publicado no Portal">
                  {property.isPublished ? (
                    <Globe className="mx-auto h-4 w-4 text-primary-500" />
                  ) : (
                    <span className="text-xs text-base-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Visualizar" asChild>
                      <Link to={`/imoveis/${property.id}`}><Eye className="h-4 w-4" /></Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Editar" asChild>
                      <Link to={`/imoveis/${property.id}/editar`}><Edit className="h-4 w-4" /></Link>
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
          {properties.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-base-500">
                Nenhum imóvel encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
