import { useState } from 'react'
import { Plus, Filter, MoreHorizontal, Calendar, DollarSign } from 'lucide-react'
import { PageToolbar } from '../../../components/common/PageToolbar'
import { cn } from '../../../utils/cn'

// Mocks
const mockNegocios = [
  { id: 1, title: 'João Silva', property: 'Apartamento Centro', value: 'R$ 850.000', stage: 'Interesse', broker: 'US', date: '26/09', nextAction: 'Ligar para agendar' },
  { id: 2, title: 'Maria Souza', property: 'Casa Condomínio', value: 'R$ 1.200.000', stage: 'Visita', broker: 'US', date: '27/09', nextAction: 'Visita agendada' },
  { id: 3, title: 'Carlos Santos', property: 'Sala Comercial', value: 'R$ 450.000', stage: 'Proposta', broker: 'US', date: '28/09', nextAction: 'Aguardando aceite' },
  { id: 4, title: 'Ana Oliveira', property: 'Cobertura', value: 'R$ 2.500.000', stage: 'Documentação', broker: 'US', date: '30/09', nextAction: 'Enviar certidões' },
  { id: 5, title: 'Pedro Costa', property: 'Terreno', value: 'R$ 300.000', stage: 'Fechamento', broker: 'US', date: '01/10', nextAction: 'Assinar escritura' },
]

const STAGES = [
  { name: 'Interesse', color: 'bg-[#A855F7]' },
  { name: 'Visita', color: 'bg-[#1992FF]' },
  { name: 'Proposta', color: 'bg-[#F59E0B]' },
  { name: 'Documentação', color: 'bg-[#EF4444]' },
  { name: 'Fechamento', color: 'bg-[#10B981]' }
]

export function NegociosBoard() {
  const [mobileStage, setMobileStage] = useState('Interesse')

  return (
    <div className="flex flex-col h-full pt-4 lg:pt-6 overflow-hidden">

      {/* Toolbar */}
      <div className="shrink-0">
        <PageToolbar
          primaryAction={
            <button className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#1685FF] hover:bg-[#005CE6] text-white px-4 py-2.5 rounded-[8px] font-semibold transition-colors">
              <Plus className="w-5 h-5" />
              Novo Negócio
            </button>
          }
          filters={
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[8px] text-[#475569] dark:text-[#CBD5E1] hover:bg-gray-50 dark:hover:bg-[#0F294C] transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtros</span>
            </button>
          }
        />
      </div>

      {/* Kanban Desktop/Tablet */}
      <div className="hidden md:flex gap-6 overflow-x-auto pb-4 flex-1 [scrollbar-width:thin] items-start">
        {STAGES.map(stage => {
          const items = mockNegocios.filter(n => n.stage === stage.name)
          return (
            <div key={stage.name} className="flex flex-col w-[300px] shrink-0 bg-[#F8FAFC] dark:bg-[rgba(25,146,255,0.02)] rounded-[12px] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] h-max max-h-full">
              {/* Header Coluna */}
              <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)]">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", stage.color)}></div>
                  <h3 className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">{stage.name}</h3>
                  <span className="bg-[#E2E8F0] dark:bg-[rgba(25,146,255,0.1)] text-[#475569] dark:text-[#CBD5E1] text-[12px] font-bold px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>
                <button className="text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-white">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Lista de Cards */}
              <div className="flex flex-col gap-3 p-3 overflow-y-auto [scrollbar-width:none]">
                {items.map(item => (
                  <div key={item.id} className="bg-white dark:bg-[#081C36] p-4 rounded-[10px] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] shadow-sm hover:border-[#1685FF] transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-[15px]">{item.title}</h4>
                      <div className="w-6 h-6 rounded-full bg-[#E2E8F0] dark:bg-[rgba(25,146,255,0.1)] text-[#1685FF] flex items-center justify-center text-[10px] font-bold">
                        {item.broker}
                      </div>
                    </div>
                    <p className="text-[13px] text-[#475569] dark:text-[#CBD5E1] mb-3">{item.property}</p>

                    <div className="flex items-center gap-1.5 text-[#10B981] font-semibold text-[14px] mb-3">
                      <DollarSign className="w-4 h-4" />
                      {item.value}
                    </div>

                    <div className="border-t border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] pt-3 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] text-[#64748B] uppercase font-bold tracking-wider">Próxima Ação</span>
                        <span className="text-[12px] text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1.5">
                          {item.nextAction}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[12px] text-[#475569] dark:text-[#94A3B8] font-medium bg-gray-50 dark:bg-[rgba(25,146,255,0.05)] px-2 py-1 rounded-[6px]">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </div>
                    </div>
                  </div>
                ))}
                <button className="flex items-center justify-center gap-2 w-full py-2.5 border border-dashed border-[#CBD5E1] dark:border-[rgba(25,146,255,0.3)] text-[#64748B] dark:text-[#94A3B8] hover:text-[#1685FF] hover:border-[#1685FF] rounded-[8px] text-[13px] font-semibold transition-colors mt-1">
                  <Plus className="w-4 h-4" /> Adicionar
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile List View */}
      <div className="md:hidden flex flex-col gap-4 pb-8 h-full overflow-y-auto">
        <div className="flex overflow-x-auto gap-2 pb-2 [scrollbar-width:none]">
          {STAGES.map(s => (
            <button
              key={s.name}
              onClick={() => setMobileStage(s.name)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                mobileStage === s.name
                  ? "bg-[#1685FF] text-white"
                  : "bg-white dark:bg-[#0A1E39] text-[#475569] dark:text-[#CBD5E1] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] hover:bg-gray-50"
              )}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {mockNegocios.filter(n => n.stage === mobileStage).map(item => (
            <div key={item.id} className="bg-white dark:bg-[#081C36] p-4 rounded-[12px] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">{item.title}</h4>
                  <p className="text-[13px] text-[#475569] dark:text-[#CBD5E1] mt-0.5">{item.property}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[#10B981] font-bold">
                  {item.value}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-[#0A1E39] p-3 rounded-[8px] flex flex-col gap-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-[12px] text-[#64748B] font-semibold uppercase">Próx. Ação</span>
                  <span className="text-[13px] text-[#0F172A] dark:text-[#F8FAFC] font-medium">{item.nextAction}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] text-[#64748B] font-semibold uppercase">Data</span>
                  <span className="text-[13px] text-[#0F172A] dark:text-[#F8FAFC] font-medium">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
