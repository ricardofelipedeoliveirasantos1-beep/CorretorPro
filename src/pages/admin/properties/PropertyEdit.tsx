import { useParams, Link } from 'react-router-dom'
import { PropertyForm } from '../../../components/properties/PropertyForm'
import { mockProperties } from '../../../mocks/mockProperties'

export function PropertyEdit() {
  const { id } = useParams()
  
  const property = mockProperties.find(p => p.id === id)

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-xl font-bold text-base-900 mb-2">Imóvel não encontrado</h2>
        <p className="text-base-500 mb-6">O imóvel que você está tentando editar não existe ou foi removido.</p>
        <Link to="/imoveis" className="text-primary-600 hover:underline">Voltar para a lista de imóveis</Link>
      </div>
    )
  }

  return <PropertyForm initialData={property} isEditMode={true} />
}
