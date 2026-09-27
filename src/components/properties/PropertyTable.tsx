import { type Property } from '../../types/property'
import { PropertyStatusBadge } from './PropertyStatusBadge'
import { Edit, Eye, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

interface PropertyTableProps {
  properties: Property[]
}

export function PropertyTable({ properties }: PropertyTableProps) {
  return (
    <div className="w-full">
      <table className="w-full text-left text-sm table-fixed border-separate border-spacing-y-3">
        <thead className="text-base-500 dark:text-[#B7C2D6]">
          <tr>
            <th className="w-[32%] px-4 py-2 font-medium truncate">Imóvel</th>
            <th className="w-[15%] px-4 py-2 font-medium truncate">Localização</th>
            <th className="w-[10%] px-4 py-2 font-medium truncate text-center">Finalidade</th>
            <th className="w-[15%] px-4 py-2 font-medium truncate">Preço</th>
            <th className="w-[12%] px-4 py-2 font-medium text-center truncate">Status</th>
            <th className="w-[16%] px-4 py-2 font-medium text-center truncate">Ações</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => {
            const coverPhoto = property.photos.find((p: any) => p.isCover)?.url || property.photos[0]?.url || 'https://via.placeholder.com/400x300?text=Sem+Foto'
            const price = property.purpose === 'Venda'
              ? property.salePrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              : property.rentPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

            return (
              <tr key={property.id} className="group bg-white dark:bg-[#111C2E] transition-all hover:shadow-[0_4px_12px_rgba(22,133,255,0.08)] dark:hover:shadow-none">
                <td className="px-4 py-4 align-top border-y border-l border-[#1685FF]/30 group-hover:border-[#1685FF]/60 dark:border-[#24344D] dark:group-hover:border-[#31435E] rounded-l-xl">
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
                <td className="px-4 py-4 align-middle border-y border-[#1685FF]/30 group-hover:border-[#1685FF]/60 dark:border-[#24344D] dark:group-hover:border-[#31435E]">
                  <p className="text-[14px] font-medium text-base-900 dark:text-[#F8FAFC] truncate">{property.address.neighborhood}</p>
                  <p className="text-xs text-base-500 dark:text-[#B7C2D6] truncate">{property.address.city}</p>
                </td>
                <td className="px-4 py-4 align-middle text-center border-y border-[#1685FF]/30 group-hover:border-[#1685FF]/60 dark:border-[#24344D] dark:group-hover:border-[#31435E]">
                  <div className={`inline-flex items-center justify-center min-w-[84px] px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${property.purpose === 'Venda' ? 'bg-[#10B981] text-white' : 'bg-[#F97316] text-white'}`}>
                    {property.purpose}
                  </div>
                </td>
                <td className="px-4 py-4 align-middle font-bold text-[15px] text-base-900 dark:text-[#F8FAFC] border-y border-[#1685FF]/30 group-hover:border-[#1685FF]/60 dark:border-[#24344D] dark:group-hover:border-[#31435E]">
                  {price}
                </td>
                <td className="px-4 py-4 align-middle text-center border-y border-[#1685FF]/30 group-hover:border-[#1685FF]/60 dark:border-[#24344D] dark:group-hover:border-[#31435E]">
                  <PropertyStatusBadge status={property.status} />
                </td>
                <td className="px-4 py-4 align-middle border-y border-r border-[#1685FF]/30 group-hover:border-[#1685FF]/60 dark:border-[#24344D] dark:group-hover:border-[#31435E] rounded-r-xl">
                  <div className="flex items-center justify-center gap-4">
                    {property.mapsUrl ? (
                      <a href={property.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full text-[#1685FF] hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all hover:scale-110" title="Abrir no Maps">
                        <MapPin className="h-5 w-5" />
                      </a>
                    ) : (
                      <Link to={`/imoveis/${property.id}/editar`} className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full text-[#1685FF] opacity-50 hover:opacity-100 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all hover:scale-110" title="Cadastrar Localização">
                        <MapPin className="h-5 w-5" />
                      </Link>
                    )}
                    
                    <Link to={`/imoveis/${property.id}`} className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full text-[#A855F7] hover:bg-purple-50 dark:text-[#C084FC] dark:hover:bg-purple-500/10 transition-all hover:scale-110" title="Visualizar">
                      <Eye className="h-5 w-5" />
                    </Link>
                    
                    <Link to={`/imoveis/${property.id}/editar`} className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full text-[#F59E0B] hover:bg-amber-50 dark:text-[#FCD34D] dark:hover:bg-amber-500/10 transition-all hover:scale-110" title="Editar">
                      <Edit className="h-5 w-5" />
                    </Link>
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
