import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2, Phone, Mail, FileText, HomeIcon } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { mockOwners } from '../../../mocks/mockOwners'
import { mockProperties } from '../../../mocks/mockProperties'

export function OwnerDetail() {
  const { id } = useParams()
  const owner = mockOwners.find(o => o.id === id) || mockOwners[0]
  const properties = mockProperties.filter(p => p.ownerId === owner.id)

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
            <Link to="/proprietarios"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-base-900">Perfil do Proprietário</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/proprietarios/${owner.id}/editar`}>
              <Edit className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Editar</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col - Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border border-base-200 bg-white p-6 shadow-sm text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-3xl text-primary-700 font-bold mb-4">
              {owner.firstName.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-base-900">{owner.firstName} {owner.lastName}</h2>
            <p className="text-sm text-base-500 mb-6">Cliente desde {new Date(owner.createdAt).toLocaleDateString('pt-BR')}</p>

            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-base-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-base-900">{owner.whatsapp}</p>
                  <p className="text-xs text-base-500">WhatsApp</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-base-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-base-900 break-all">{owner.email || '-'}</p>
                  <p className="text-xs text-base-500">E-mail</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-base-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-base-900">{owner.cpf || '-'}</p>
                  <p className="text-xs text-base-500">CPF</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-base-100 flex gap-2">
              <Button className="flex-1" onClick={() => alert('Mock WhatsApp')}>WhatsApp</Button>
              <Button variant="outline" className="flex-1" onClick={() => alert('Mock Ligar')}>Ligar</Button>
            </div>
          </div>

          <div className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-base-900 mb-2">Observações</h3>
            <p className="text-sm text-base-600 whitespace-pre-wrap">{owner.notes || 'Nenhuma observação registrada.'}</p>
          </div>

          <Button variant="danger" className="w-full" onClick={() => alert('Mock Excluir')}><Trash2 className="mr-2 h-4 w-4"/> Excluir Proprietário</Button>
        </div>

        {/* Right Col - Imóveis vinculados */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-base-900 flex items-center gap-2">
              <HomeIcon className="h-5 w-5 text-primary-600" />
              Imóveis Vinculados ({properties.length})
            </h3>
            <Button size="sm" variant="outline" asChild>
              <Link to="/imoveis/novo">+ Adicionar Imóvel</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {properties.map(property => {
              const coverPhoto = property.photos.find(p => p.isCover)?.url || property.photos[0]?.url || 'https://via.placeholder.com/150'
              const price = property.purpose === 'Venda' ? property.salePrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : property.rentPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              return (
                <div key={property.id} className="flex items-center gap-4 rounded-xl border border-base-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-base-100">
                    <img src={coverPhoto} alt={property.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-primary-600 mb-0.5">{property.code}</p>
                    <p className="truncate font-medium text-base-900">{property.title}</p>
                    <p className="text-sm font-bold text-base-900 mt-1">{price}</p>
                  </div>
                  <div className="hidden sm:block">
                    <span className="inline-flex rounded-full bg-base-100 px-2 py-1 text-xs font-medium text-base-700">
                      {property.status}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/imoveis/${property.id}`}>Ver</Link>
                  </Button>
                </div>
              )
            })}

            {properties.length === 0 && (
              <div className="rounded-xl border border-dashed border-base-300 bg-base-50 p-8 text-center">
                <p className="text-sm text-base-500">Este proprietário ainda não possui imóveis cadastrados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
