import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Phone, FileText } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { InlineFeedback } from '../../../components/ui/InlineFeedback'
import { useState } from 'react'

export function OwnerCreate() {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      navigate('/proprietarios')
    }, 1000)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
            <Link to="/proprietarios"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-base-900">Novo Proprietário</h1>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline" asChild>
            <Link to="/proprietarios">Cancelar</Link>
          </Button>
          <Button onClick={handleSubmit}>Salvar Proprietário</Button>
        </div>
      </div>

      <InlineFeedback
        type="success"
        message="Proprietário cadastrado com sucesso!"
        visible={showSuccess}
      />

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* 1. Informações principais */}
        <section className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 border-b border-base-100 pb-2 text-lg font-bold text-base-900">
            <User className="h-5 w-5 text-primary-600" />
            Dados Pessoais
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Nome *</label>
              <Input required placeholder="Ex: Carlos" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Sobrenome *</label>
              <Input required placeholder="Ex: Ferreira" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm font-medium text-base-700">CPF</label>
              <Input placeholder="000.000.000-00" />
            </div>
          </div>
        </section>

        {/* 2. Contato */}
        <section className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 border-b border-base-100 pb-2 text-lg font-bold text-base-900">
            <Phone className="h-5 w-5 text-primary-600" />
            Contato
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">WhatsApp *</label>
              <Input required placeholder="(00) 00000-0000" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Telefone Fixo</label>
              <Input placeholder="(00) 0000-0000" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm font-medium text-base-700">E-mail</label>
              <Input type="email" placeholder="email@exemplo.com" />
            </div>
          </div>
        </section>

        {/* 3. Observações */}
        <section className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 border-b border-base-100 pb-2 text-lg font-bold text-base-900">
            <FileText className="h-5 w-5 text-primary-600" />
            Observações
          </div>
          <div className="space-y-1.5">
            <textarea
              rows={4}
              className="w-full rounded-md border border-base-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="Anotações sobre o cliente, preferências, restrições de horário, etc."
            />
          </div>
        </section>

        {/* Mobile Sticky Footer */}
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
