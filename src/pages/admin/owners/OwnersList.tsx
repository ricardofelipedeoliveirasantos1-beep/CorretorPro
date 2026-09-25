import { Link } from 'react-router-dom'
import { mockOwners } from '../../../mocks/mockOwners'
import { OwnerCard } from '../../../components/owners/OwnerCard'
import { OwnerTable } from '../../../components/owners/OwnerTable'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Plus, Search } from 'lucide-react'

export function OwnersList() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-base-900">Proprietários</h1>
          <p className="text-base-500">Gerencie os proprietários e os imóveis vinculados a eles.</p>
        </div>
        <Button asChild>
          <Link to="/proprietarios/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Proprietário
          </Link>
        </Button>
      </div>

      {/* Busca */}
      <div className="flex max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-400" />
          <Input
            type="text"
            placeholder="Buscar por nome, email ou telefone..."
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Listagem Desktop (Table) e Mobile (Cards) */}
      <div className="hidden lg:block">
        <OwnerTable owners={mockOwners} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:hidden">
        {mockOwners.map(owner => (
          <OwnerCard key={owner.id} owner={owner} />
        ))}
        {mockOwners.length === 0 && (
          <div className="col-span-full py-8 text-center text-base-500">
            Nenhum proprietário encontrado.
          </div>
        )}
      </div>
    </div>
  )
}
