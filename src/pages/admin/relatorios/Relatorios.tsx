import { useState } from 'react'
import { Filter, Download, BarChart3, PieChart, LineChart, Users, DollarSign, Target, Home } from 'lucide-react'
import { PageToolbar } from '../../../components/common/PageToolbar'
import { MetricCard } from '../../../components/dashboard/MetricCard'
import { cn } from '../../../utils/cn'

export function Relatorios() {
  const [period, setPeriod] = useState('Este mês')

  return (
    <div className="flex flex-col h-full pt-4 lg:pt-6">

      {/* Toolbar */}
      <PageToolbar
        primaryAction={
          <button className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#1685FF] hover:bg-[#005CE6] text-white px-4 py-2.5 rounded-[8px] font-semibold transition-colors">
            <Download className="w-5 h-5" />
            Exportar PDF
          </button>
        }
        filters={
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[8px] text-[#475569] dark:text-[#CBD5E1] hover:bg-gray-50 dark:hover:bg-[#0F294C] transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Mais Filtros</span>
          </button>
        }
      />

      {/* Filtros de Período */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-4 [scrollbar-width:none]">
        {['Hoje', '7 dias', '30 dias', 'Este mês', 'Mês anterior', 'Personalizado'].map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              period === p
                ? "bg-[#1685FF] text-white"
                : "bg-white dark:bg-[#0A1E39] text-[#475569] dark:text-[#CBD5E1] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] hover:bg-gray-50 dark:hover:bg-[#0F294C]"
            )}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Clientes Recebidos" value={145} indicator="↑ 12%" indicatorColor="green" colorClass="purple" icon={<Users />} />
        <MetricCard title="Visitas Realizadas" value={38} indicator="↑ 5%" indicatorColor="green" colorClass="blue" icon={<Home />} />
        <MetricCard title="Taxa de Conversão" value="4.2%" indicator="↓ 1.1%" indicatorColor="red" colorClass="orange" icon={<Target />} />
        <MetricCard title="Valor Fechado" value="R$ 4.2M" indicator="↑ 22%" indicatorColor="green" colorClass="green" icon={<DollarSign />} />
      </div>

      {/* Gráficos (Mocks Visuais) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[16px] p-6 shadow-sm flex flex-col min-h-[300px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#1685FF]" /> Clientes por Período
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[8px] bg-gray-50 dark:bg-[#0A1E39]">
            <span className="text-[#64748B] font-medium">Área reservada para gráfico de barras</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[16px] p-6 shadow-sm flex flex-col min-h-[300px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
              <LineChart className="w-5 h-5 text-[#00D1B2]" /> Fechamentos por Mês
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[8px] bg-gray-50 dark:bg-[#0A1E39]">
            <span className="text-[#64748B] font-medium">Área reservada para gráfico de linha</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[16px] p-6 shadow-sm flex flex-col min-h-[300px] lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#A855F7]" /> Origem dos Clientes Convertidos
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[8px] bg-gray-50 dark:bg-[#0A1E39]">
            <span className="text-[#64748B] font-medium">Área reservada para gráfico de pizza/rosca</span>
          </div>
        </div>
      </div>

    </div>
  )
}
