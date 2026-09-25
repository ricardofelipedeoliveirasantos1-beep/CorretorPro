import { Search, Filter } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export interface FilterState {
  search: string
  purpose: string
  type: string
  status: string
  published: string
}

interface PropertyFiltersProps {
  onMobileFilterClick: () => void
  draftFilters: FilterState
  setDraftFilters: React.Dispatch<React.SetStateAction<FilterState>>
  onSearch: () => void
  onClear: () => void
}

export function PropertyFilters({ onMobileFilterClick, draftFilters, setDraftFilters, onSearch, onClear }: PropertyFiltersProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Top Search Bar & Mobile Filter Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-400" />
          <Input
            type="text"
            placeholder="Buscar por código, título, cidade..."
            className="pl-10 w-full dark:bg-[#111C2E] dark:border-[#24344D] dark:text-[#F8FAFC] dark:placeholder-[#64748B] transition-colors duration-300"
            value={draftFilters.search}
            onChange={(e) => setDraftFilters(prev => ({ ...prev, search: e.target.value }))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSearch()
            }}
          />
        </div>
        <Button
          variant="outline"
          className="lg:hidden shrink-0"
          onClick={onMobileFilterClick}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Desktop Filters Panel */}
      <div className="hidden lg:grid grid-cols-6 gap-4 rounded-xl border border-base-200 dark:border-[#24344D] bg-white dark:bg-[#111C2E] p-4 transition-colors duration-300">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-base-700 dark:text-[#B7C2D6]">Finalidade</label>
          <select
            className="w-full rounded-md border border-base-300 dark:border-[#24344D] bg-white dark:bg-[#0B1320] dark:text-[#F8FAFC] px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors duration-300"
            value={draftFilters.purpose}
            onChange={(e) => setDraftFilters(prev => ({ ...prev, purpose: e.target.value }))}
          >
            <option value="Todos">Todos</option>
            <option value="Venda">Venda</option>
            <option value="Aluguel">Aluguel</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-base-700 dark:text-[#B7C2D6]">Tipo</label>
          <select
            className="w-full rounded-md border border-base-300 dark:border-[#24344D] bg-white dark:bg-[#0B1320] dark:text-[#F8FAFC] px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors duration-300"
            value={draftFilters.type}
            onChange={(e) => setDraftFilters(prev => ({ ...prev, type: e.target.value }))}
          >
            <option value="Todos">Todos</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa">Casa</option>
            <option value="Terreno">Terreno</option>
            <option value="Sala Comercial">Sala Comercial</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-base-700 dark:text-[#B7C2D6]">Status</label>
          <select
            className="w-full rounded-md border border-base-300 dark:border-[#24344D] bg-white dark:bg-[#0B1320] dark:text-[#F8FAFC] px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors duration-300"
            value={draftFilters.status}
            onChange={(e) => setDraftFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="Todos">Todos</option>
            <option value="Disponível">Disponível</option>
            <option value="Reservado">Reservado</option>
            <option value="Em negociação">Em negociação</option>
            <option value="Vendido">Vendido</option>
            <option value="Alugado">Alugado</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-base-700 dark:text-[#B7C2D6]">Publicação</label>
          <select
            className="w-full rounded-md border border-base-300 dark:border-[#24344D] bg-white dark:bg-[#0B1320] dark:text-[#F8FAFC] px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors duration-300"
            value={draftFilters.published}
            onChange={(e) => setDraftFilters(prev => ({ ...prev, published: e.target.value }))}
          >
            <option value="Todos">Todos</option>
            <option value="Publicados">Publicados</option>
            <option value="Não publicados">Não publicados</option>
          </select>
        </div>
        <div className="col-span-2 flex items-end gap-2">
          <Button
            className="w-full bg-[#10B981] hover:bg-[#059669] text-white border border-[#10B981] dark:bg-[#00D26A] dark:hover:bg-[#00B85C] dark:border-[#00D26A] dark:text-[#F8FAFC] font-medium transition-all"
            onClick={onSearch}
          >
            Pesquisar
          </Button>
          <Button
            variant="outline"
            className="w-full border-[#EF4444] text-[#EF4444] hover:bg-red-50 dark:border-[#DC2626] dark:text-[#F87171] dark:hover:bg-red-900/20 transition-all bg-transparent"
            onClick={onClear}
          >
            Limpar
          </Button>
        </div>
      </div>
    </div>
  )
}
