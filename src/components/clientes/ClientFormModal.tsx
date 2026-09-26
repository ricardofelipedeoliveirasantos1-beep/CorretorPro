import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'
import { InlineFeedback } from '../ui/InlineFeedback'

interface ClientFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (clientData: any) => void
}

export function ClientFormModal({ isOpen, onClose, onSave }: ClientFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    status: 'Ativo',
    city: '',
    neighborhood: '',
    interestType: 'Compra',
    propertyInterest: '',
    budget: '',
    origin: '',
    responsible: '',
    observation: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    let formattedValue = value;

    if (name === 'name' || name === 'responsible') {
      // Começa com Maiúscula e o resto minúscula, a cada separação (espaço)
      formattedValue = value
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
    } else if (name === 'phone') {
      // Remove tudo que não for número
      let digits = value.replace(/\D/g, '');

      // Checa se está apagando e se apagou um traço ou parêntese
      const isDeleting = value.length < formData.phone.length;
      if (isDeleting && formData.phone.endsWith('-') && value.length === formData.phone.length - 1) {
         digits = digits.slice(0, -1);
      }

      if (digits.length === 0) {
        formattedValue = '';
      } else if (digits.length <= 2) {
        formattedValue = `(${digits}`;
      } else if (digits.length <= 6) {
        formattedValue = `(${digits.slice(0, 2)})${digits.slice(2)}`;
      } else if (digits.length <= 10) {
        formattedValue = `(${digits.slice(0, 2)})${digits.slice(2, 6)}-${digits.slice(6)}`;
      } else {
        formattedValue = `(${digits.slice(0, 2)})${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
      }
    } else if (name === 'budget') {
      let digits = value.replace(/\D/g, '');
      if (digits === '') {
        formattedValue = '';
      } else {
        const amount = parseInt(digits, 10) / 100;
        formattedValue = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(amount);
      }
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSave = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório'
    if (!formData.status) newErrors.status = 'Status é obrigatório'
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const now = new Date();
    // Keep it as a full ISO string (which includes time) to preserve exact creation time
    const createdAt = now.toISOString();
    const today = now.toISOString().split('T')[0];

    let finalBudget = formData.budget;
    if (formData.interestType === 'Aluguel' && finalBudget && !finalBudget.includes('/ Mês')) {
      finalBudget = `${finalBudget} / Mês`;
    } else if (formData.interestType !== 'Aluguel' && finalBudget) {
      finalBudget = finalBudget.replace(/\s*\/\s*Mês/g, '');
    }

    setShowSuccess(true)
    setTimeout(() => {
      onSave({
        ...formData,
        budget: finalBudget,
        createdAt,
        lastContact: today,
      })

      setFormData({
        name: '', phone: '', email: '', status: 'Ativo', city: '', neighborhood: '',
        interestType: 'Compra', propertyInterest: '', budget: '', origin: '', responsible: '', observation: ''
      })
      setShowSuccess(false)
    }, 1000)
  }

  const inputClasses = "w-full bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] text-[#0F172A] dark:text-[#F8FAFC] px-4 py-2.5 rounded-[8px] focus:outline-none focus:border-[#1685FF] focus:ring-1 focus:ring-[#1685FF] transition-all text-sm"
  const labelClasses = "block text-sm font-semibold text-[#475569] dark:text-[#CBD5E1] mb-1.5"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#081C36] w-full max-w-3xl rounded-[16px] shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)]">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Novo Cliente</h2>
          <button onClick={onClose} className="p-2 text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-[#0A1E39]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <InlineFeedback
            type="success"
            message="Cliente cadastrado com sucesso."
            visible={showSuccess}
            duration={1000}
            className="mb-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 md:col-span-2">
              <label className={labelClasses}>Nome completo *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={cn(inputClasses, errors.name && "border-red-500")} placeholder="Ex: João da Silva" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className={labelClasses}>Telefone *</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={cn(inputClasses, errors.phone && "border-red-500")} placeholder="(00)00000-0000" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className={labelClasses}>E-mail</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={cn(inputClasses, errors.email && "border-red-500")} placeholder="joao@exemplo.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className={labelClasses}>Status *</label>
              <select name="status" value={formData.status} onChange={handleChange} className={inputClasses}>
                <option value="Ativo">Ativo</option>
                <option value="Em negociação">Em negociação</option>
                <option value="Com negócio fechado">Com negócio fechado</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Responsável / Corretor</label>
              <input type="text" name="responsible" value={formData.responsible} onChange={handleChange} className={inputClasses} placeholder="Nome do corretor" />
            </div>

            <div>
              <label className={labelClasses}>Cidade</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClasses} placeholder="Ex: São Paulo" />
            </div>

            <div>
              <label className={labelClasses}>Bairro</label>
              <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} className={inputClasses} placeholder="Ex: Pinheiros" />
            </div>

            <div>
              <label className={labelClasses}>Tipo de interesse</label>
              <select name="interestType" value={formData.interestType} onChange={handleChange} className={inputClasses}>
                <option value="Compra">Compra</option>
                <option value="Aluguel">Aluguel</option>
                <option value="Investimento">Investimento</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Imóvel de interesse</label>
              <input type="text" name="propertyInterest" value={formData.propertyInterest} onChange={handleChange} className={inputClasses} placeholder="Ex: Apartamento 3 quartos" />
            </div>

            <div>
              <label className={labelClasses}>Faixa de orçamento</label>
              <div className="relative">
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={cn(inputClasses, formData.interestType === 'Aluguel' ? 'pr-16' : '')}
                  placeholder="Ex: R$ 500.000,00"
                />
                {formData.interestType === 'Aluguel' && formData.budget && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold bg-[#1685FF]/10 text-[#1685FF] px-2 py-1 rounded-[6px]">
                    / Mês
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className={labelClasses}>Origem</label>
              <input type="text" name="origin" value={formData.origin} onChange={handleChange} className={inputClasses} placeholder="Ex: Instagram, Indicação..." />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className={labelClasses}>Observação</label>
              <textarea name="observation" value={formData.observation} onChange={handleChange} rows={3} className={cn(inputClasses, "resize-none")} placeholder="Informações adicionais sobre o cliente..." />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] bg-gray-50 dark:bg-[rgba(11,37,69,0.5)] rounded-b-[16px]">
          <button onClick={onClose} className="px-5 py-2.5 rounded-[8px] font-semibold text-[#475569] dark:text-[#CBD5E1] hover:bg-gray-200 dark:hover:bg-[#0F294C] transition-colors">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-5 py-2.5 rounded-[8px] font-semibold text-white bg-[#1685FF] hover:bg-[#005CE6] transition-colors shadow-lg shadow-[#1685FF]/20">
            Salvar Cliente
          </button>
        </div>
      </div>
    </div>
  )
}
