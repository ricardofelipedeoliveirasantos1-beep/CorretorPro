import { type Property } from '../../types/property'
import { PropertyStatusBadge } from './PropertyStatusBadge'
import { Edit, Eye, MapPin } from 'lucide-react'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'

interface PropertyTableProps {
  properties: Property[]
}

export function PropertyTable({ properties }: PropertyTableProps) {
  return (
    <div className="w-full rounded-xl border border-base-200 dark:border-[#24344D] bg-white dark:bg-[#111C2E] shadow-sm transition-colors duration-300">
      <table className="w-full text-left text-sm table-fixed">
        <thead className="bg-base-50 dark:bg-[#0B1320] text-base-500 dark:text-[#B7C2D6] border-b border-base-200 dark:border-[#24344D] transition-colors duration-300">
          <tr>
            <th className="w-[32%] px-4 py-4 font-medium truncate">Imóvel</th>
            <th className="w-[15%] px-4 py-4 font-medium truncate">Localização</th>
            <th className="w-[10%] px-4 py-4 font-medium truncate text-center">Finalidade</th>
            <th className="w-[15%] px-4 py-4 font-medium truncate">Preço</th>
            <th className="w-[12%] px-4 py-4 font-medium text-center truncate">Status</th>
            <th className="w-[8%] px-4 py-4 font-medium text-center truncate" title="Localização no Maps">Maps</th>
            <th className="w-[8%] px-4 py-4 font-medium text-center truncate">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-base-200 dark:divide-[#24344D]">
          {properties.map((property) => {
            const coverPhoto = property.photos.find((p: any) => p.isCover)?.url || property.photos[0]?.url || 'https://via.placeholder.com/400x300?text=Sem+Foto'
            const price = property.purpose === 'Venda'
              ? property.salePrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              : property.rentPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

            return (
              <tr key={property.id} className="transition-colors hover:bg-base-50/50 dark:hover:bg-white/5">
                <td className="px-4 py-4 align-top">
                  <div className="flex gap-4">
                    <div className="h-16 w-24 shrink-0 overflow-hidden rounded-md bg-base-100 dark:bg-slate-800">
                      <img src={coverPhoto} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-start min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex rounded-md bg-primary-50 dark:bg-[rgba(22,133,255,0.15)] px-2 py-0.5 text-xs font-bold text-primary-700 dark:text-[#1685FF] border border-primary-200 dark:border-[rgba(22,133,255,0.3)] shrink-0">
                          {property.code}
                        </span>
                        <p className="truncate text-xs text-base-500 dark:text-[#B7C2D6] font-medium" title={property.features?.bedrooms ? `${property.features.bedrooms} quartos, ${property.features.totalArea}m²` : 'Excelente imóvel'}>
                          {property.features?.bedrooms ? `${property.features.bedrooms} quartos, ${property.features.totalArea}m²` : 'Excelente imóvel'}
                        </p>
                      </div>
                      <p className="truncate font-bold text-[15px] text-base-900 dark:text-[#F8FAFC]" title={property.title}>
                        {property.title}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 align-middle">
                  <p className="text-[14px] font-medium text-base-900 dark:text-[#F8FAFC] truncate">{property.address.neighborhood}</p>
                  <p className="text-xs text-base-500 dark:text-[#B7C2D6] truncate">{property.address.city}</p>
                </td>
                <td className="px-4 py-4 align-middle text-center">
                  <span className="inline-flex rounded-full bg-base-100 dark:bg-[#0B1320] border border-base-200 dark:border-[#24344D] px-2.5 py-1 text-xs font-medium text-base-700 dark:text-[#B7C2D6]">
                    {property.purpose}
                  </span>
                </td>
                <td className="px-4 py-4 align-middle font-bold text-[15px] text-base-900 dark:text-[#F8FAFC]">
                  {price}
                </td>
                <td className="px-4 py-4 align-middle text-center">
                  <PropertyStatusBadge status={property.status} />
                </td>
                <td className="px-4 py-4 align-middle text-center">
                  {property.mapsUrl ? (
                    <a href={property.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-full text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors" title="Abrir no Maps">
                      <MapPin className="h-[18px] w-[18px]" />
                    </a>
                  ) : (
                    <Link to={`/imoveis/${property.id}/editar`} className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base-400 dark:text-slate-600 hover:text-base-600 dark:hover:text-slate-400 hover:bg-base-100 dark:hover:bg-slate-800 transition-colors" title="Cadastrar Localização">
                      <MapPin className="h-[18px] w-[18px]" />
                    </Link>
                  )}
                </td>
                <td className="px-4 py-4 align-middle">
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-base-600 dark:text-[#B7C2D6] dark:hover:text-[#F8FAFC] dark:hover:bg-white/10" title="Visualizar" asChild>
                      <Link to={`/imoveis/${property.id}`}><Eye className="h-[18px] w-[18px]" /></Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-base-600 dark:text-[#B7C2D6] dark:hover:text-[#F8FAFC] dark:hover:bg-white/10" title="Editar" asChild>
                      <Link to={`/imoveis/${property.id}/editar`}><Edit className="h-[18px] w-[18px]" /></Link>
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
