import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockProperties } from '../../../mocks/mockProperties'
import { PropertyCard } from '../../../components/properties/PropertyCard'
import { PropertyTable } from '../../../components/properties/PropertyTable'
import { PropertyFilters } from '../../../components/properties/PropertyFilters'
import { Button } from '../../../components/ui/Button'
import { Plus, Home, CheckCircle2, Handshake, Globe } from 'lucide-react'

export function PropertiesList() {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const defaultFilters = {
    search: '',
    purpose: 'Todos',
    type: 'Todos',
    status: 'Todos',
    published: 'Todos'
  }

  const [draftFilters, setDraftFilters] = useState(defaultFilters)
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters)

  const handleSearch = () => {
    setAppliedFilters(draftFilters)
  }

  const handleClear = () => {
    setDraftFilters(defaultFilters)
    setAppliedFilters(defaultFilters)
  }

  const filteredProperties = mockProperties.filter(p => {
    if (appliedFilters.purpose !== 'Todos' && p.purpose !== appliedFilters.purpose) return false
    if (appliedFilters.type !== 'Todos' && p.type !== appliedFilters.type) return false
    if (appliedFilters.status !== 'Todos' && p.status !== appliedFilters.status) return false

    if (appliedFilters.published !== 'Todos') {
      const isPub = appliedFilters.published === 'Publicados'
      if (p.isPublished !== isPub) return false
    }

    if (appliedFilters.search.trim()) {
      const s = appliedFilters.search.toLowerCase()
      const matchCode = p.code.toLowerCase().includes(s)
      const matchTitle = p.title.toLowerCase().includes(s)
      const matchCity = p.address.city.toLowerCase().includes(s)
      const matchNeighborhood = p.address.neighborhood.toLowerCase().includes(s)

      if (!matchCode && !matchTitle && !matchCity && !matchNeighborhood) {
        return false
      }
    }
    return true
  })

  // Resumo
  const total = mockProperties.length
  const available = mockProperties.filter(p => p.status === 'Disponível').length
  const negotiating = mockProperties.filter(p => p.status === 'Negociando').length
  const published = mockProperties.filter(p => p.isPublished).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-base-900 dark:text-[#F8FAFC]">Imóveis</h1>
          <p className="text-base-500 dark:text-[#B7C2D6]">Gerencie os imóveis da sua carteira.</p>
        </div>
        <Button asChild>
          <Link to="/imoveis/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Imóvel
          </Link>
        </Button>
      </div>

      {/* Resumo Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total */}
        <div className="flex items-center gap-4 rounded-2xl border-[1.5px] border-base-200 dark:border-[#1685FF] bg-white dark:bg-gradient-to-br dark:from-[#0E1726] dark:to-[#0B1320] p-4 sm:p-5 shadow-sm dark:shadow-[0_0_14px_rgba(22,133,255,0.25)] transition-all duration-300 hover:dark:shadow-[0_0_20px_rgba(22,133,255,0.4)]">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-base-100 dark:bg-[rgba(22,133,255,0.18)]">
            <Home className="h-5 w-5 sm:h-6 sm:w-6 text-base-600 dark:text-[#EAF2FF]" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-base-500 dark:text-[#D6E1F0]">Total</p>
            <p className="mt-0.5 text-2xl sm:text-[32px] font-bold leading-none text-base-900 dark:text-[#F8FAFC]">{total}</p>
          </div>
        </div>

        {/* Disponíveis */}
        <div className="flex items-center gap-4 rounded-2xl border-[1.5px] border-base-200 dark:border-[#A855F7] bg-white dark:bg-gradient-to-br dark:from-[#0E1726] dark:to-[#0B1320] p-4 sm:p-5 shadow-sm dark:shadow-[0_0_14px_rgba(168,85,247,0.25)] transition-all duration-300 hover:dark:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-base-100 dark:bg-[rgba(168,85,247,0.18)]">
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-base-600 dark:text-[#EAF2FF]" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-base-500 dark:text-[#D6E1F0]">Disponíveis</p>
            <p className="mt-0.5 text-2xl sm:text-[32px] font-bold leading-none text-base-900 dark:text-[#F8FAFC]">{available}</p>
          </div>
        </div>

        {/* Em Negociação */}
        <div className="flex items-center gap-4 rounded-2xl border-[1.5px] border-base-200 dark:border-[#00D1A7] bg-white dark:bg-gradient-to-br dark:from-[#0E1726] dark:to-[#0B1320] p-4 sm:p-5 shadow-sm dark:shadow-[0_0_14px_rgba(0,209,167,0.22)] transition-all duration-300 hover:dark:shadow-[0_0_20px_rgba(0,209,167,0.35)]">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-base-100 dark:bg-[rgba(0,209,167,0.18)]">
            <Handshake className="h-5 w-5 sm:h-6 sm:w-6 text-base-600 dark:text-[#EAF2FF]" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-base-500 dark:text-[#D6E1F0]">Em Negociação</p>
            <p className="mt-0.5 text-2xl sm:text-[32px] font-bold leading-none text-base-900 dark:text-[#F8FAFC]">{negotiating}</p>
          </div>
        </div>

        {/* Publicados */}
        <div className="flex items-center gap-4 rounded-2xl border-[1.5px] border-base-200 dark:border-[#F59E0B] bg-white dark:bg-gradient-to-br dark:from-[#0E1726] dark:to-[#0B1320] p-4 sm:p-5 shadow-sm dark:shadow-[0_0_14px_rgba(245,158,11,0.22)] transition-all duration-300 hover:dark:shadow-[0_0_20px_rgba(245,158,11,0.35)]">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-base-100 dark:bg-[rgba(245,158,11,0.18)]">
            <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-base-600 dark:text-[#EAF2FF]" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-base-500 dark:text-[#D6E1F0]">Publicados</p>
            <p className="mt-0.5 text-2xl sm:text-[32px] font-bold leading-none text-base-900 dark:text-[#F8FAFC]">{published}</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <PropertyFilters
        onMobileFilterClick={() => setShowMobileFilters(true)}
        draftFilters={draftFilters}
        setDraftFilters={setDraftFilters}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      {/* Listagem Desktop (Table) e Mobile (Cards) */}
      <div className="hidden lg:block">
        <PropertyTable properties={filteredProperties} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:hidden">
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
        {filteredProperties.length === 0 && (
          <div className="col-span-full py-8 text-center text-base-500">
            Nenhum imóvel encontrado com os filtros selecionados.
          </div>
        )}
      </div>

      {/* Mobile Filters Drawer (Simulado com div condicional fixo) */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-[#08111F] lg:hidden">
          <div className="flex items-center justify-between border-b border-base-200 dark:border-[#24344D] p-4">
            <h2 className="text-lg font-bold dark:text-[#F8FAFC]">Filtros</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
              Fechar
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-base-700 dark:text-[#B7C2D6]">Finalidade</label>
              <select
                className="w-full rounded-md border border-base-300 dark:border-[#24344D] bg-white dark:bg-[#111C2E] dark:text-[#F8FAFC] px-3 py-2 text-base focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors duration-300"
                value={draftFilters.purpose}
                onChange={e => setDraftFilters(prev => ({ ...prev, purpose: e.target.value }))}
              >
                <option value="Todos">Todos</option>
                <option value="Venda">Venda</option>
                <option value="Aluguel">Aluguel</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-base-700 dark:text-[#B7C2D6]">Tipo</label>
              <select
                className="w-full rounded-md border border-base-300 dark:border-[#24344D] bg-white dark:bg-[#111C2E] dark:text-[#F8FAFC] px-3 py-2 text-base focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors duration-300"
                value={draftFilters.type}
                onChange={e => setDraftFilters(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="Todos">Todos</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Terreno">Terreno</option>
                <option value="Sala Comercial">Sala Comercial</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-base-700 dark:text-[#B7C2D6]">Status</label>
              <select
                className="w-full rounded-md border border-base-300 dark:border-[#24344D] bg-white dark:bg-[#111C2E] dark:text-[#F8FAFC] px-3 py-2 text-base focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors duration-300"
                value={draftFilters.status}
                onChange={e => setDraftFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="Todos">Todos</option>
                <option value="Disponível">Disponível</option>

                <option value="Negociando">Negociando</option>
                <option value="Vendido">Vendido</option>
                <option value="Indisponível">Indisponível</option>
              </select>
            </div>
          </div>
          <div className="border-t border-base-200 dark:border-[#24344D] p-4 flex gap-2">
            <Button
              className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white border border-[#10B981] dark:bg-[#00D26A] dark:hover:bg-[#00B85C] dark:border-[#00D26A] dark:text-[#F8FAFC] font-medium transition-all"
              onClick={() => {
                handleSearch()
                setShowMobileFilters(false)
              }}
            >
              Pesquisar
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-red-50 dark:border-[#DC2626] dark:text-[#F87171] dark:hover:bg-red-900/20 transition-all bg-transparent"
              onClick={() => {
                handleClear()
                setShowMobileFilters(false)
              }}
            >
              Limpar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
