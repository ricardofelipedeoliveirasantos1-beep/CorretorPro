import { type Owner } from '../../types/owner'
import { Edit, Eye, MessageCircle } from 'lucide-react'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'

interface OwnerTableProps {
  owners: Owner[]
}

export function OwnerTable({ owners }: OwnerTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-base-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-base-50 text-base-500">
          <tr>
            <th className="px-4 py-3 font-medium">Nome</th>
            <th className="px-4 py-3 font-medium">Contato</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium text-center">Imóveis</th>
            <th className="px-4 py-3 font-medium text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-base-200">
          {owners.map((owner) => (
            <tr key={owner.id} className="transition-colors hover:bg-base-50/50">
              <td className="px-4 py-3">
                <div className="font-medium text-base-900">{owner.firstName} {owner.lastName}</div>
                <div className="text-xs text-base-500">Cadastrado em {new Date(owner.createdAt).toLocaleDateString('pt-BR')}</div>
              </td>
              <td className="px-4 py-3 text-base-900">
                {owner.whatsapp || owner.phone || '-'}
              </td>
              <td className="px-4 py-3 text-base-900">
                {owner.email || '-'}
              </td>
              <td className="px-4 py-3 text-center text-base-900">
                <span className="inline-flex items-center justify-center rounded-full bg-primary-50 h-6 w-6 text-xs font-bold text-primary-700">
                  {owner.propertyCount}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Visualizar" asChild>
                    <Link to={`/proprietarios/${owner.id}`}><Eye className="h-4 w-4" /></Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="WhatsApp" onClick={() => alert('Mock WhatsApp')}>
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Editar" asChild>
                    <Link to={`/proprietarios/${owner.id}/editar`}><Edit className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {owners.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-base-500">
                Nenhum proprietário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
