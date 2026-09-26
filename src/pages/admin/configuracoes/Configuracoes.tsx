import { useNavigate } from 'react-router-dom'
import { Image as ImageIcon, ChevronRight, Palette } from 'lucide-react'

export function Configuracoes() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Configurações</h2>
          <p className="text-sm text-[#475569] dark:text-[#94A3B8]">Personalize as configurações e a aparência do sistema.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[16px] shadow-sm overflow-hidden p-6 space-y-4">

        {/* Botão SUA LOGO */}
        <button
          onClick={() => navigate('/configuracoes/logo')}
          className="w-full flex items-center justify-between bg-white dark:bg-[#112745] border border-[#E2E8F0] dark:border-[rgba(22,133,255,0.2)] hover:border-[#1685FF] dark:hover:border-[#1685FF] rounded-[16px] p-[16px] transition-all duration-300 group hover:shadow-[0_4px_12px_rgba(22,133,255,0.08)] dark:hover:shadow-[0_4px_20px_rgba(22,133,255,0.15)]"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-[48px] h-[48px] rounded-[12px] bg-[#EAF3FF] dark:bg-[rgba(22,133,255,0.15)] text-[#1685FF] group-hover:scale-105 transition-transform duration-300">
              <ImageIcon className="w-[22px] h-[22px]" />
            </div>
            <div className="text-left">
              <span className="block text-[15px] font-semibold text-[#0F172A] dark:text-white leading-tight">
                SUA LOGO
              </span>
              <span className="block text-[13px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                Altere a marca do cabeçalho
              </span>
            </div>
          </div>

          <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-50 dark:bg-[#0A1E39] group-hover:bg-[#1685FF] text-[#94A3B8] group-hover:text-white transition-colors duration-300">
            <ChevronRight className="w-5 h-5" />
          </div>
        </button>

        {/* Botão APARÊNCIA */}
        <button
          onClick={() => navigate('/configuracoes/aparencia')}
          className="w-full flex items-center justify-between bg-white dark:bg-[#112745] border border-[#E2E8F0] dark:border-[rgba(22,133,255,0.2)] hover:border-[#1685FF] dark:hover:border-[#1685FF] rounded-[16px] p-[16px] transition-all duration-300 group hover:shadow-[0_4px_12px_rgba(22,133,255,0.08)] dark:hover:shadow-[0_4px_20px_rgba(22,133,255,0.15)]"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-[48px] h-[48px] rounded-[12px] bg-[#F3E8FF] dark:bg-[rgba(168,85,247,0.15)] text-[#A855F7] group-hover:scale-105 transition-transform duration-300">
              <Palette className="w-[22px] h-[22px]" />
            </div>
            <div className="text-left">
              <span className="block text-[15px] font-semibold text-[#0F172A] dark:text-white leading-tight">
                APARÊNCIA
              </span>
              <span className="block text-[13px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                Escolha entre Modo Claro e Escuro
              </span>
            </div>
          </div>

          <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-gray-50 dark:bg-[#0A1E39] group-hover:bg-[#1685FF] text-[#94A3B8] group-hover:text-white transition-colors duration-300">
            <ChevronRight className="w-5 h-5" />
          </div>
        </button>
      </div>
    </div>
  )
}
