import { useState } from 'react'
import { X } from 'lucide-react'

interface ClientsFilterModalProps {
  isOpen: boolean
  onClose: () => void
  currentFilters: any
  onApplyFilters: (filters: any) => void
  onClearFilters: () => void
}

export function ClientsFilterModal({ isOpen, onClose, currentFilters, onApplyFilters, onClearFilters }: ClientsFilterModalProps) {
  const [localFilters, setLocalFilters] = useState(currentFilters)

  // Atualiza local quando abrir
  // Em uma implementacao mais robusta, usariamos useEffect para sincronizar isOpen com currentFilters

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setLocalFilters((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleApply = () => {
    onApplyFilters(localFilters)
    onClose()
  }

  const handleClear = () => {
    const emptyFilters = {
      status: '',
      responsible: '',
      city: '',
      neighborhood: '',
      interestType: '',
      origin: ''
    }
    setLocalFilters(emptyFilters)
    onClearFilters()
    onClose()
  }

  const inputClasses = "w-full bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] text-[#0F172A] dark:text-[#F8FAFC] px-4 py-2.5 rounded-[8px] focus:outline-none focus:border-[#1685FF] focus:ring-1 focus:ring-[#1685FF] transition-all text-sm"
  const labelClasses = "block text-sm font-semibold text-[#475569] dark:text-[#CBD5E1] mb-1.5"

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#081C36] w-full max-w-[100vw] sm:max-w-2xl rounded-[16px] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-300">

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] shrink-0">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Filtros Avançados</h2>
          <button onClick={onClose} className="p-2 text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-[#0A1E39]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body - Adicionado min-h-0 e overflow-x-hidden para impedir que vaze da tela */}
        <div className="p-4 sm:p-6 overflow-y-auto overflow-x-hidden flex-1 min-h-0 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">

            <div className="w-full">
              <label className={labelClasses}>Status</label>
              <select name="status" value={localFilters.status || ''} onChange={handleChange} className={inputClasses}>
                <option value="">Todos</option>
                <option value="Ativo">Ativos</option>
                <option value="Em negociação">Em negociação</option>
                <option value="Com negócio fechado">Com negócio fechado</option>
                <option value="Inativo">Inativos</option>
              </select>
            </div>

            <div className="w-full">
              <label className={labelClasses}>Tipo de interesse</label>
              <select name="interestType" value={localFilters.interestType || ''} onChange={handleChange} className={inputClasses}>
                <option value="">Todos</option>
                <option value="Compra">Compra</option>
                <option value="Aluguel">Locação</option>
                <option value="Investimento">Investimento</option>
              </select>
            </div>

            <div className="w-full">
              <label className={labelClasses}>Responsável / Corretor</label>
              <input type="text" name="responsible" value={localFilters.responsible || ''} onChange={handleChange} className={inputClasses} placeholder="Ex: Mariana Costa" />
            </div>

            <div className="w-full">
              <label className={labelClasses}>Origem</label>
              <select name="origin" value={localFilters.origin || ''} onChange={handleChange} className={inputClasses}>
                <option value="">Todas</option>
                <option value="Instagram">Instagram</option>
                <option value="Site">Site</option>
                <option value="Indicação">Indicação</option>
                <option value="Google">Google</option>
                <option value="Facebook">Facebook</option>
                <option value="Evento">Evento</option>
              </select>
            </div>

            <div className="w-full">
              <label className={labelClasses}>Cidade</label>
              <input type="text" name="city" value={localFilters.city || ''} onChange={handleChange} className={inputClasses} placeholder="Qualquer cidade" />
            </div>

            <div className="w-full">
              <label className={labelClasses}>Bairro</label>
              <input type="text" name="neighborhood" value={localFilters.neighborhood || ''} onChange={handleChange} className={inputClasses} placeholder="Qualquer bairro" />
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-t border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] bg-gray-50 dark:bg-[rgba(11,37,69,0.5)] shrink-0 mt-auto">
          <button onClick={handleClear} className="flex-1 px-4 py-3 sm:py-2.5 rounded-[8px] font-semibold text-[#EF4444] border border-[#EF4444]/30 hover:bg-[#EF4444]/10 transition-colors">
            Limpar
          </button>

          <button onClick={onClose} className="hidden sm:block flex-1 px-4 py-2.5 rounded-[8px] font-semibold text-[#475569] dark:text-[#CBD5E1] hover:bg-gray-200 dark:hover:bg-[#0F294C] transition-colors">
            Cancelar
          </button>

          <button onClick={handleApply} className="flex-1 px-4 py-3 sm:py-2.5 rounded-[8px] font-semibold text-white bg-[#1685FF] hover:bg-[#005CE6] transition-colors shadow-lg shadow-[#1685FF]/20 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            Pesquisar
          </button>
        </div>
      </div>
    </div>
  )
}
