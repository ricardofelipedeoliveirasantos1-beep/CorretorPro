import { useState } from 'react'
import { Plus, Filter } from 'lucide-react'
import { PageToolbar } from '../../../components/common/PageToolbar'
import { MetricCard } from '../../../components/dashboard/MetricCard'
import { UserPlus, PhoneForwarded, Star, DollarSign, CheckCircle2 } from 'lucide-react'
import { cn } from '../../../utils/cn'

// Mocks for now
const mockLeads = [
  { id: 1, name: 'João Silva', phone: '(11) 98765-4321', email: 'joao@email.com', interest: 'Apartamento Centro', origin: 'Site', date: '26/09/2026', status: 'Novo', broker: 'Você' },
  { id: 2, name: 'Maria Souza', phone: '(11) 91234-5678', email: 'maria@email.com', interest: 'Casa Condomínio', origin: 'Instagram', date: '25/09/2026', status: 'Em contato', broker: 'Você' },
  { id: 3, name: 'Carlos Santos', phone: '(11) 99999-8888', email: 'carlos@email.com', interest: 'Sala Comercial', origin: 'Indicação', date: '24/09/2026', status: 'Qualificado', broker: 'Você' },
  { id: 4, name: 'Ana Oliveira', phone: '(11) 97777-6666', email: 'ana@email.com', interest: 'Cobertura', origin: 'Portal', date: '23/09/2026', status: 'Proposta', broker: 'Você' },
  { id: 5, name: 'Pedro Costa', phone: '(11) 95555-4444', email: 'pedro@email.com', interest: 'Terreno', origin: 'Site', date: '20/09/2026', status: 'Convertido', broker: 'Você' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Novo': return 'bg-[#00D1B2]/10 text-[#00D1B2] border-[#00D1B2]/30 dark:bg-[#00D1B2]/20 dark:border-[#00D1B2]/40'
    case 'Em contato': return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30 dark:bg-[#F59E0B]/20 dark:border-[#F59E0B]/40'
    case 'Qualificado': return 'bg-[#A855F7]/10 text-[#A855F7] border-[#A855F7]/30 dark:bg-[#A855F7]/20 dark:border-[#A855F7]/40'
    case 'Proposta': return 'bg-[#1992FF]/10 text-[#1992FF] border-[#1992FF]/30 dark:bg-[#1992FF]/20 dark:border-[#1992FF]/40'
    case 'Convertido': return 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30 dark:bg-[#10B981]/20 dark:border-[#10B981]/40'
    case 'Perdido': return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30 dark:bg-[#EF4444]/20 dark:border-[#EF4444]/40'
    default: return 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700'
  }
}

export function LeadsList() {
  const [filter, setFilter] = useState('Todos')

  return (
    <div className="flex flex-col h-full pt-4 lg:pt-6">

      {/* Cards de Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <MetricCard title="Novos" value={5} indicator="" indicatorColor="" colorClass="green" icon={<UserPlus />} />
        <MetricCard title="Em contato" value={8} indicator="" indicatorColor="" colorClass="orange" icon={<PhoneForwarded />} />
        <MetricCard title="Qualificados" value={4} indicator="" indicatorColor="" colorClass="purple" icon={<Star />} />
        <MetricCard title="Em negociação" value={3} indicator="" indicatorColor="" colorClass="blue" icon={<DollarSign />} />
        <MetricCard title="Convertidos" value={2} indicator="" indicatorColor="" colorClass="green" icon={<CheckCircle2 />} />
      </div>

      {/* Toolbar */}
      <PageToolbar
        searchPlaceholder="Buscar leads por nome, email ou telefone..."
        primaryAction={
          <button className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#1685FF] hover:bg-[#005CE6] text-white px-4 py-2.5 rounded-[8px] font-semibold transition-colors">
            <Plus className="w-5 h-5" />
            Novo Lead
          </button>
        }
        filters={
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[8px] text-[#475569] dark:text-[#CBD5E1] hover:bg-gray-50 dark:hover:bg-[#0F294C] transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filtros</span>
          </button>
        }
      />

      {/* Filtros Rápidos (Pills) */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-2 [scrollbar-width:none]">
        {['Todos', 'Novos', 'Em contato', 'Qualificados', 'Proposta', 'Convertidos', 'Perdidos'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 rounded-[8px] border text-sm font-semibold whitespace-nowrap transition-colors",
              filter === f
                ? "bg-[#1685FF]/10 text-[#1685FF] border-[#1685FF]/30 dark:bg-[#1685FF]/20 dark:text-[#60A5FA] dark:border-[#1685FF]/50 shadow-sm"
                : "bg-transparent text-[#64748B] border-[#E2E8F0] dark:text-[#94A3B8] dark:border-[rgba(25,146,255,0.15)] hover:bg-[#1685FF]/5 dark:hover:bg-[rgba(25,146,255,0.05)]"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Listagem Desktop (Tabela) */}
      <div className="hidden lg:block w-full">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead className="text-[#0F172A] dark:text-[#CBD5E1]">
            <tr className="text-[12px] font-semibold uppercase tracking-wider">
              <th className="px-6 py-2">Lead / Contato</th>
              <th className="px-6 py-2">Interesse</th>
              <th className="px-6 py-2">Origem / Data</th>
              <th className="px-6 py-2">Status</th>
              <th className="px-6 py-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {mockLeads.map(lead => (
              <tr key={lead.id} className="group bg-white dark:bg-[#111C2E] transition-all shadow-[0_1px_3px_rgba(0,0,0,0.05),0_0_0_1px_rgba(22,133,255,0.2)] dark:shadow-none hover:shadow-[0_4px_12px_rgba(22,133,255,0.08)]">
                <td className="px-6 py-4 align-middle border-y border-l border-[#1685FF]/30 group-hover:border-[#1685FF]/60 dark:border-[#24344D] dark:group-hover:border-[#31435E] rounded-l-xl">
                  <p className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">{lead.name}</p>
                  <p className="text-sm text-[#475569] dark:text-[#94A3B8] mt-0.5">{lead.phone}</p>
                  <p className="text-[12px] text-[#64748B] dark:text-[#64748B]">{lead.email}</p>
                </td>
                <td className="px-6 py-4 align-middle border-y border-[#1685FF]/30 group-hover:border-[#1685FF]/60 dark:border-[#24344D] dark:group-hover:border-[#31435E]">
                  <p className="text-sm text-[#0F172A] dark:text-[#CBD5E1] font-medium">{lead.interest}</p>
                </td>
                <td className="px-6 py-4 align-middle border-y border-[#1685FF]/30 group-hover:border-[#1685FF]/60 dark:border-[#24344D] dark:group-hover:border-[#31435E]">
                  <p className="text-sm text-[#0F172A] dark:text-[#CBD5E1] font-semibold">{lead.origin}</p>
                  <p className="text-[12px] text-[#64748B] mt-0.5">{lead.date}</p>
                </td>
                <td className="px-6 py-4 align-middle border-y border-[#1685FF]/30 group-hover:border-[#1685FF]/60 dark:border-[#24344D] dark:group-hover:border-[#31435E]">
                  <span className={cn("px-3 py-1.5 rounded-[8px] text-[11px] font-bold border tracking-wider uppercase", getStatusColor(lead.status))}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right align-middle border-y border-r border-[#1685FF]/30 group-hover:border-[#1685FF]/60 dark:border-[#24344D] dark:group-hover:border-[#31435E] rounded-r-xl">
                  <button className="px-4 py-1.5 bg-[#1685FF]/10 text-[#1685FF] border border-[#1685FF]/30 dark:bg-[#1685FF]/20 dark:text-[#60A5FA] dark:border-[#1685FF]/40 font-bold text-[11px] uppercase tracking-wider rounded-[8px] hover:bg-[#1685FF]/20 dark:hover:bg-[#1685FF]/30 transition-colors whitespace-nowrap">
                    Ver detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Listagem Mobile (Cards) */}
      <div className="lg:hidden flex flex-col gap-4 pb-8">
        {mockLeads.map(lead => (
          <div key={lead.id} className="bg-white dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[12px] p-4 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">{lead.name}</h3>
                <p className="text-sm text-[#475569] dark:text-[#94A3B8] mt-0.5">{lead.phone}</p>
              </div>
              <span className={cn("px-2.5 py-1.5 rounded-[8px] text-[10px] font-bold border tracking-wider uppercase", getStatusColor(lead.status))}>
                {lead.status}
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-[#0A1E39] p-3 rounded-[8px]">
              <p className="text-[13px] text-[#475569] dark:text-[#CBD5E1]"><span className="font-semibold">Interesse:</span> {lead.interest}</p>
              <p className="text-[13px] text-[#475569] dark:text-[#CBD5E1] mt-1"><span className="font-semibold">Entrada:</span> {lead.date}</p>
            </div>
            <button className="w-full py-2 bg-[#1685FF]/10 text-[#1685FF] border border-[#1685FF]/30 dark:bg-[#1685FF]/20 dark:text-[#60A5FA] dark:border-[#1685FF]/40 font-bold text-[12px] uppercase tracking-wider rounded-[8px] hover:bg-[#1685FF]/20 dark:hover:bg-[#1685FF]/30 transition-colors">
              Detalhes
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}
