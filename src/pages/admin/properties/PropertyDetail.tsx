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
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
            <Link to="/imoveis"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-base-900">{property.code}</h1>
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
        <div className="lg:col-span-2 space-y-8 rounded-xl border border-base-200 bg-white p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex rounded-full bg-base-100 px-2.5 py-0.5 text-xs font-medium text-base-700">
                {property.type}
              </span>
              <span className="inline-flex rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                {property.purpose}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-base-900 mb-2">{property.title}</h2>
            <div className="flex items-center text-base-500">
              <MapPin className="mr-1 h-4 w-4" />
              {property.address.street}, {property.address.number} - {property.address.neighborhood}, {property.address.city}
            </div>
          </div>

          <div className="flex flex-wrap gap-6 py-6 border-y border-base-200">
            <div className="flex items-center gap-2">
              <Maximize className="h-5 w-5 text-base-400" />
              <div>
                <p className="text-sm text-base-500">Área Útil</p>
                <p className="font-semibold text-base-900">{property.features.builtArea}m²</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-base-400" />
              <div>
                <p className="text-sm text-base-500">Quartos</p>
                <p className="font-semibold text-base-900">{property.features.bedrooms} ({property.features.suites} suítes)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-base-400" />
              <div>
                <p className="text-sm text-base-500">Banheiros</p>
                <p className="font-semibold text-base-900">{property.features.bathrooms}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-base-400" />
              <div>
                <p className="text-sm text-base-500">Vagas</p>
                <p className="font-semibold text-base-900">{property.features.parkingSpaces}</p>
              </div>
            </div>
            {property.features.customFeatures?.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-base-400" />
                <div>
                  <p className="text-sm text-base-500">{feat.name}</p>
                  <p className="font-semibold text-base-900">{feat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-bold text-base-900 mb-4">Descrição</h3>
            <p className="text-base-600 leading-relaxed whitespace-pre-wrap">
              {property.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-base-900 mb-4">Diferenciais</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3">
              {property.amenities.hasPool && <div className="flex items-center gap-2 text-base-700"><Check className="h-4 w-4 text-primary-500" /> Piscina</div>}
              {property.amenities.hasBalcony && <div className="flex items-center gap-2 text-base-700"><Check className="h-4 w-4 text-primary-500" /> Varanda</div>}
              {property.amenities.hasElevator && <div className="flex items-center gap-2 text-base-700"><Check className="h-4 w-4 text-primary-500" /> Elevador</div>}
              {property.amenities.hasGym && <div className="flex items-center gap-2 text-base-700"><Check className="h-4 w-4 text-primary-500" /> Academia</div>}
              {property.amenities.hasGourmetArea && <div className="flex items-center gap-2 text-base-700"><Check className="h-4 w-4 text-primary-500" /> Área Gourmet</div>}
              {property.amenities.allowsPets && <div className="flex items-center gap-2 text-base-700"><Check className="h-4 w-4 text-primary-500" /> Aceita Pets</div>}
              {property.amenities.others?.map(amenity => (
                <div key={amenity} className="flex items-center gap-2 text-base-700"><Check className="h-4 w-4 text-primary-500" /> {amenity}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-base-500 mb-4">Valores</h3>
            <div className="text-3xl font-bold text-primary-700 mb-4">{price}</div>
            
            <div className="space-y-2 text-sm">
              {property.condoFee ? (
                <div className="flex justify-between border-b border-base-100 pb-2">
                  <span className="text-base-500">Condomínio</span>
                  <span className="font-medium text-base-900">R$ {property.condoFee}</span>
                </div>
              ) : null}
              {property.iptu ? (
                <div className="flex justify-between pt-2">
                  <span className="text-base-500">IPTU (Anual)</span>
                  <span className="font-medium text-base-900">R$ {property.iptu}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-base-500 mb-4">Proprietário</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold uppercase">
                {(property.ownerName?.[0] || 'C')}
              </div>
              <div>
                <p className="font-medium text-base-900">{property.ownerName || 'Carlos Ferreira'}</p>
                <p className="text-xs text-base-500">Cod: {property.ownerId || 'owner-temp'}</p>
              </div>
            </div>
            {property.showOwnerName && (
               <div className="mb-4 text-xs font-medium text-green-700 bg-green-50 p-2 rounded border border-green-200">
                  O nome do proprietário está visível no anúncio público.
               </div>
            )}
            <Button className="w-full" variant="outline">Ver Proprietário</Button>
          </div>
          
          <Button variant="danger" className="w-full" onClick={() => alert('Mock: Modal de Exclusão')}><Trash2 className="mr-2 h-4 w-4"/> Excluir Imóvel</Button>
        </div>
      </div>
    </div>
  )
}
