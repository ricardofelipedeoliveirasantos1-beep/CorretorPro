import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, User, Phone } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { mockOwners } from '../../../mocks/mockOwners'
import { InlineFeedback } from '../../../components/ui/InlineFeedback'
import { useState } from 'react'

export function OwnerEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)

  const owner = mockOwners.find(o => o.id === id) || mockOwners[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      navigate('/proprietarios')
    }, 1000)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
            <Link to="/proprietarios"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-base-900">Editar Proprietário</h1>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline" asChild>
            <Link to="/proprietarios">Cancelar</Link>
          </Button>
          <Button onClick={handleSubmit}>Salvar Alterações</Button>
        </div>
      </div>

      <InlineFeedback
        type="success"
        message="Proprietário atualizado com sucesso!"
        visible={showSuccess}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 border-b border-base-100 pb-2 text-lg font-bold text-base-900">
            <User className="h-5 w-5 text-primary-600" />
            Dados Pessoais
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Nome *</label>
              <Input required defaultValue={owner.firstName} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Sobrenome *</label>
              <Input required defaultValue={owner.lastName} />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 border-b border-base-100 pb-2 text-lg font-bold text-base-900">
            <Phone className="h-5 w-5 text-primary-600" />
            Contato
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">WhatsApp *</label>
              <Input required defaultValue={owner.whatsapp} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">E-mail</label>
              <Input type="email" defaultValue={owner.email} />
            </div>
          </div>
        </section>

        <div className="fixed bottom-0 left-0 right-0 border-t border-base-200 bg-white p-4 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:hidden z-40">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" asChild>
              <Link to="/proprietarios">Cancelar</Link>
            </Button>
            <Button type="submit" className="flex-1">Salvar</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
