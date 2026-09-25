import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Edit, Share2, Trash2, MapPin, Bed, Bath, Car, Maximize, Check } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { mockProperties } from '../../../mocks/mockProperties'
import { PropertyStatusBadge } from '../../../components/properties/PropertyStatusBadge'
import { PropertyMediaGallery } from '../../../components/properties/PropertyMediaGallery'

export function PropertyDetail() {
  const { id } = useParams()
  const property = mockProperties.find(p => p.id === id) || mockProperties[0]

  const price = property.purpose === 'Venda'
    ? property.salePrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : property.rentPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-32 lg:pb-16">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 dark:text-[#CBD5E1] dark:hover:bg-white/10 dark:hover:text-[#F8FAFC]" asChild>
            <Link to="/imoveis"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-base-900 dark:text-[#F8FAFC]">{property.code}</h1>
          <PropertyStatusBadge status={property.status} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Compartilhar</span>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/imoveis/${property.id}/editar`}>
              <Edit className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Editar</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Gallery */}
      <PropertyMediaGallery photos={property.photos} videos={property.videos} />

      {/* Main Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8 rounded-xl border border-base-200 dark:border-[#24344D] bg-white dark:bg-[#111C2E] p-6 shadow-sm transition-colors duration-300">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex rounded-full bg-base-100 dark:bg-[#0B1320] border border-base-200 dark:border-[#24344D] px-2.5 py-0.5 text-xs font-medium text-base-700 dark:text-[#B7C2D6]">
                {property.type}
              </span>
              <span className="inline-flex rounded-full bg-primary-50 dark:bg-[rgba(22,133,255,0.15)] border border-primary-200 dark:border-[rgba(22,133,255,0.3)] px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:text-[#1685FF]">
                {property.purpose}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-base-900 dark:text-[#F8FAFC] mb-2">{property.title}</h2>
            <div className="flex items-center text-base-500 dark:text-[#B7C2D6]">
              <MapPin className="mr-1 h-4 w-4 dark:text-[#94A3B8]" />
              {property.address.street}, {property.address.number} - {property.address.neighborhood}, {property.address.city}
            </div>
          </div>

          <div className="flex flex-wrap gap-6 py-6 border-y border-base-200 dark:border-[#24344D]">
            <div className="flex items-center gap-2">
              <Maximize className="h-5 w-5 text-base-400 dark:text-[#94A3B8]" />
              <div>
                <p className="text-sm text-base-500 dark:text-[#94A3B8]">Área Útil</p>
                <p className="font-semibold text-base-900 dark:text-[#F8FAFC]">{property.features.builtArea}m²</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-base-400 dark:text-[#94A3B8]" />
              <div>
                <p className="text-sm text-base-500 dark:text-[#94A3B8]">Quartos</p>
                <p className="font-semibold text-base-900 dark:text-[#F8FAFC]">{property.features.bedrooms} ({property.features.suites} suítes)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-base-400 dark:text-[#94A3B8]" />
              <div>
                <p className="text-sm text-base-500 dark:text-[#94A3B8]">Banheiros</p>
                <p className="font-semibold text-base-900 dark:text-[#F8FAFC]">{property.features.bathrooms}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-base-400 dark:text-[#94A3B8]" />
              <div>
                <p className="text-sm text-base-500 dark:text-[#94A3B8]">Vagas</p>
                <p className="font-semibold text-base-900 dark:text-[#F8FAFC]">{property.features.parkingSpaces}</p>
              </div>
            </div>
            {property.features.customFeatures?.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-base-400 dark:text-[#94A3B8]" />
                <div>
                  <p className="text-sm text-base-500 dark:text-[#94A3B8]">{feat.name}</p>
                  <p className="font-semibold text-base-900 dark:text-[#F8FAFC]">{feat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-bold text-base-900 dark:text-[#F8FAFC] mb-4">Descrição</h3>
            <p className="text-base-600 dark:text-[#CBD5E1] leading-relaxed whitespace-pre-wrap">
              {property.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-base-900 dark:text-[#F8FAFC] mb-4">Diferenciais</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3">
              {property.amenities.hasPool && <div className="flex items-center gap-2 text-base-700 dark:text-[#CBD5E1]"><Check className="h-4 w-4 text-primary-500 dark:text-[#3B82F6]" /> Piscina</div>}
              {property.amenities.hasBalcony && <div className="flex items-center gap-2 text-base-700 dark:text-[#CBD5E1]"><Check className="h-4 w-4 text-primary-500 dark:text-[#3B82F6]" /> Varanda</div>}
              {property.amenities.hasElevator && <div className="flex items-center gap-2 text-base-700 dark:text-[#CBD5E1]"><Check className="h-4 w-4 text-primary-500 dark:text-[#3B82F6]" /> Elevador</div>}
              {property.amenities.hasGym && <div className="flex items-center gap-2 text-base-700 dark:text-[#CBD5E1]"><Check className="h-4 w-4 text-primary-500 dark:text-[#3B82F6]" /> Academia</div>}
              {property.amenities.hasGourmetArea && <div className="flex items-center gap-2 text-base-700 dark:text-[#CBD5E1]"><Check className="h-4 w-4 text-primary-500 dark:text-[#3B82F6]" /> Área Gourmet</div>}
              {property.amenities.allowsPets && <div className="flex items-center gap-2 text-base-700 dark:text-[#CBD5E1]"><Check className="h-4 w-4 text-primary-500 dark:text-[#3B82F6]" /> Aceita Pets</div>}
              {property.amenities.others?.map(amenity => (
                <div key={amenity} className="flex items-center gap-2 text-base-700 dark:text-[#CBD5E1]"><Check className="h-4 w-4 text-primary-500 dark:text-[#3B82F6]" /> {amenity}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="rounded-xl border border-base-200 dark:border-[#24344D] bg-white dark:bg-[#111C2E] p-6 shadow-sm transition-colors duration-300">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-base-500 dark:text-[#94A3B8] mb-4">Valores</h3>
            <div className="text-3xl font-bold text-primary-700 dark:text-[#60A5FA] mb-4">{price}</div>

            <div className="space-y-2 text-sm">
              {property.condoFee ? (
                <div className="flex justify-between border-b border-base-100 dark:border-[#24344D] pb-2">
                  <span className="text-base-500 dark:text-[#94A3B8]">Condomínio</span>
                  <span className="font-medium text-base-900 dark:text-[#F8FAFC]">R$ {property.condoFee}</span>
                </div>
              ) : null}
              {property.iptu ? (
                <div className="flex justify-between pt-2">
                  <span className="text-base-500 dark:text-[#94A3B8]">IPTU (Anual)</span>
                  <span className="font-medium text-base-900 dark:text-[#F8FAFC]">R$ {property.iptu}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-xl border border-base-200 dark:border-[#24344D] bg-white dark:bg-[#111C2E] p-6 shadow-sm transition-colors duration-300">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-base-500 dark:text-[#94A3B8] mb-4">Proprietário</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold uppercase">
                {(property.ownerName?.[0] || 'C')}
              </div>
              <div>
                <p className="font-medium text-base-900 dark:text-[#F8FAFC]">{property.ownerName || 'Carlos Ferreira'}</p>
                <p className="text-xs text-base-500 dark:text-[#94A3B8]">Cod: {property.ownerId || 'owner-temp'}</p>
              </div>
            </div>
            {property.showOwnerName && (
               <div className="mb-4 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800">
                  O nome do proprietário está visível no anúncio público.
               </div>
            )}
            <Button className="w-full border-base-200 dark:border-[#334155] dark:bg-[#0B1320] dark:text-[#CBD5E1] dark:hover:bg-[#1E293B] dark:hover:text-[#F8FAFC] transition-colors" variant="outline">Ver Proprietário</Button>
          </div>

          <Button variant="danger" className="w-full bg-[#EF0000] hover:bg-[#B91C1C] text-white border-none transition-colors dark:bg-[#DC2626] dark:hover:bg-[#B91C1C]" onClick={() => alert('Mock: Modal de Exclusão')}><Trash2 className="mr-2 h-4 w-4"/> Excluir Imóvel</Button>
        </div>
      </div>
    </div>
  )
}
