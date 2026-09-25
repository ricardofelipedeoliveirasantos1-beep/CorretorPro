import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockProperties } from '../../../mocks/mockProperties'
import { PropertyCard } from '../../../components/properties/PropertyCard'
import { PropertyTable } from '../../../components/properties/PropertyTable'
import { PropertyFilters } from '../../../components/properties/PropertyFilters'
import { Button } from '../../../components/ui/Button'
import { Plus } from 'lucide-react'

export function PropertiesList() {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Resumo
  const total = mockProperties.length
  const available = mockProperties.filter(p => p.status === 'Disponível').length
  const negotiating = mockProperties.filter(p => p.status === 'Em negociação').length
  const published = mockProperties.filter(p => p.isPublished).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-base-900">Imóveis</h1>
          <p className="text-base-500">Gerencie os imóveis da sua carteira.</p>
        </div>
        <Button asChild>
          <Link to="/imoveis/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Imóvel
          </Link>
        </Button>
      </div>

      {/* Resumo Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-base-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-base-500">Total</p>
          <p className="mt-1 text-2xl font-bold text-base-900">{total}</p>
        </div>
        <div className="rounded-xl border border-base-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-base-500">Disponíveis</p>
          <p className="mt-1 text-2xl font-bold text-success-600">{available}</p>
        </div>
        <div className="rounded-xl border border-base-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-base-500">Em Negociação</p>
          <p className="mt-1 text-2xl font-bold text-warning-600">{negotiating}</p>
        </div>
        <div className="rounded-xl border border-base-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-base-500">Publicados</p>
          <p className="mt-1 text-2xl font-bold text-primary-600">{published}</p>
        </div>
      </div>

      {/* Filtros */}
      <PropertyFilters onMobileFilterClick={() => setShowMobileFilters(true)} />

      {/* Listagem Desktop (Table) e Mobile (Cards) */}
      <div className="hidden lg:block">
        <PropertyTable properties={mockProperties} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:hidden">
        {mockProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
        {mockProperties.length === 0 && (
          <div className="col-span-full py-8 text-center text-base-500">
            Nenhum imóvel encontrado.
          </div>
        )}
      </div>

      {/* Mobile Filters Drawer (Simulado com div condicional fixo) */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
          <div className="flex items-center justify-between border-b border-base-200 p-4">
            <h2 className="text-lg font-bold">Filtros</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
              Fechar
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-base-700">Finalidade</label>
              <select className="w-full rounded-md border border-base-300 bg-white px-3 py-2 text-base focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option>Todos</option>
                <option>Venda</option>
                <option>Aluguel</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-base-700">Tipo</label>
              <select className="w-full rounded-md border border-base-300 bg-white px-3 py-2 text-base focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option>Todos</option>
                <option>Apartamento</option>
                <option>Casa</option>
                <option>Terreno</option>
                <option>Sala Comercial</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-base-700">Status</label>
              <select className="w-full rounded-md border border-base-300 bg-white px-3 py-2 text-base focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option>Todos</option>
                <option>Disponível</option>
                <option>Reservado</option>
                <option>Em negociação</option>
                <option>Vendido</option>
                <option>Alugado</option>
              </select>
            </div>
          </div>
          <div className="border-t border-base-200 p-4 flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowMobileFilters(false)}>
              Limpar
            </Button>
            <Button className="flex-1" onClick={() => setShowMobileFilters(false)}>
              Aplicar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
