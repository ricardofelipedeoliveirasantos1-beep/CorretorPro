import { Search, Filter } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

interface PropertyFiltersProps {
  onMobileFilterClick: () => void
}

export function PropertyFilters({ onMobileFilterClick }: PropertyFiltersProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Top Search Bar & Mobile Filter Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-400" />
          <Input 
            type="text" 
            placeholder="Buscar por código, título, cidade..." 
            className="pl-10 w-full"
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
      <div className="hidden lg:grid grid-cols-5 gap-4 rounded-xl border border-base-200 bg-white p-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-base-700">Finalidade</label>
          <select className="w-full rounded-md border border-base-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option>Todos</option>
            <option>Venda</option>
            <option>Aluguel</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-base-700">Tipo</label>
          <select className="w-full rounded-md border border-base-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option>Todos</option>
            <option>Apartamento</option>
            <option>Casa</option>
            <option>Terreno</option>
            <option>Sala Comercial</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-base-700">Status</label>
          <select className="w-full rounded-md border border-base-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option>Todos</option>
            <option>Disponível</option>
            <option>Reservado</option>
            <option>Em negociação</option>
            <option>Vendido</option>
            <option>Alugado</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-base-700">Publicação</label>
          <select className="w-full rounded-md border border-base-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option>Todos</option>
            <option>Publicados</option>
            <option>Não publicados</option>
          </select>
        </div>
        <div className="flex items-end gap-2">
          <Button variant="outline" className="w-full text-base-500">
            Limpar
          </Button>
        </div>
      </div>
    </div>
  )
}
