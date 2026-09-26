import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sun, Moon, Palette } from 'lucide-react'
import { useTheme } from '../../../contexts/ThemeContext'

export function AparenciaConfiguracoes() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="space-y-6">
      {/* Header com botão Voltar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <button
          onClick={() => navigate('/configuracoes')}
          className="flex items-center text-sm font-medium text-[#64748B] hover:text-[#1685FF] transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Aparência do Sistema</h2>
        <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
          Escolha como o sistema será exibido.
        </p>
      </div>

      <div className="bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[16px] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)]">
          <h3 className="text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#1685FF]" />
            Tema
          </h3>
          <p className="text-sm text-[#475569] dark:text-[#94A3B8] mt-1">Selecione o modo claro ou escuro.</p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => theme !== 'light' && toggleTheme()}
            className={`flex flex-col items-center justify-center p-6 border-2 rounded-[16px] transition-all duration-300 ${
              theme === 'light'
                ? 'border-[#1685FF] bg-[#EAF3FF] dark:bg-[#112745]'
                : 'border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] bg-white dark:bg-[#0A1E39] hover:border-[#1685FF] hover:bg-gray-50'
            }`}
          >
            <Sun className={`w-12 h-12 mb-4 ${theme === 'light' ? 'text-[#1685FF]' : 'text-gray-400'}`} />
            <span className={`text-base font-semibold ${theme === 'light' ? 'text-[#005CE6] dark:text-[#60A5FA]' : 'text-[#0F172A] dark:text-[#F8FAFC]'}`}>Claro</span>
          </button>

          <button
            onClick={() => theme !== 'dark' && toggleTheme()}
            className={`flex flex-col items-center justify-center p-6 border-2 rounded-[16px] transition-all duration-300 ${
              theme === 'dark'
                ? 'border-[#1685FF] bg-gradient-to-r from-[rgba(30,94,255,0.15)] to-[rgba(16,63,155,0.15)] shadow-[0_0_20px_rgba(30,144,255,0.1)]'
                : 'border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] bg-white dark:bg-[#0A1E39] hover:border-[#1685FF] hover:bg-gray-50 dark:hover:bg-[#112745]'
            }`}
          >
            <Moon className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-[#1685FF]' : 'text-gray-400'}`} />
            <span className={`text-base font-semibold ${theme === 'dark' ? 'text-[#005CE6] dark:text-[#60A5FA]' : 'text-[#0F172A] dark:text-[#F8FAFC]'}`}>Escuro</span>
          </button>
        </div>
      </div>
    </div>
  )
}
