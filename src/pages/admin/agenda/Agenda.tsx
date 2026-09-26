import { useState, useMemo } from 'react'
import { Plus, Calendar as CalendarIcon, MapPin, Video, Phone, Users, Filter, X } from 'lucide-react'
import { PageToolbar } from '../../../components/common/PageToolbar'
import { cn } from '../../../utils/cn'

// Mocks
const mockAgenda = [
  { id: 1, type: 'Visita', title: 'Visita Apartamento Centro', client: 'João Silva', time: '09:00', date: '2026-09-26', location: 'Rua das Flores, 123', status: 'Confirmado', property: 'Apartamento Centro', rep: 'Carlos' },
  { id: 2, type: 'Ligação', title: 'Retorno sobre proposta', client: 'Ana Costa', time: '14:00', date: '2026-09-26', location: 'Telefone', status: 'Agendado', property: 'Casa Condomínio', rep: 'Maria' },
  { id: 3, type: 'Reunião', title: 'Assinatura de Contrato', client: 'Marcos Paulo', time: '16:30', date: '2026-09-26', location: 'Escritório', status: 'Agendado', property: 'Terreno Sul', rep: 'Carlos' },
  { id: 4, type: 'Visita', title: 'Visita Casa Condomínio', client: 'Fernanda Lima', time: '10:00', date: '2026-09-27', location: 'Cond. Alphaville', status: 'Agendado', property: 'Casa Condomínio', rep: 'João' },
  { id: 5, type: 'Ligação', title: 'Follow-up de Visita', client: 'Roberto Almeida', time: '11:00', date: '2026-09-25', location: 'Telefone', status: 'Concluído', property: 'Apartamento Duplex', rep: 'Maria' },
  { id: 6, type: 'Reunião', title: 'Apresentação de Imóveis', client: 'Juliana Costa', time: '15:00', date: '2026-09-22', location: 'Escritório', status: 'Concluído', property: 'Vários', rep: 'Carlos' },
  { id: 7, type: 'Visita', title: 'Visita Cobertura', client: 'Paulo Santos', time: '13:00', date: '2026-09-20', location: 'Edifício Infinity', status: 'Cancelado', property: 'Cobertura Duplex', rep: 'João' },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Visita': return <MapPin className="w-4 h-4" />
    case 'Ligação': return <Phone className="w-4 h-4" />
    case 'Reunião': return <Video className="w-4 h-4" />
    default: return <CalendarIcon className="w-4 h-4" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Visita': return 'bg-[#1992FF] text-white'
    case 'Ligação': return 'bg-[#F59E0B] text-white'
    case 'Reunião': return 'bg-[#A855F7] text-white'
    default: return 'bg-gray-500 text-white'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmado': return 'bg-[rgba(16,185,129,0.1)] text-[#10B981] border-[#10B981]'
    case 'Agendado': return 'bg-[rgba(25,146,255,0.1)] text-[#1992FF] border-[#1992FF]'
    case 'Cancelado': return 'bg-[rgba(239,68,68,0.1)] text-[#EF4444] border-[#EF4444]'
    case 'Concluído': return 'bg-[rgba(0,209,178,0.1)] text-[#00D1B2] border-[#00D1B2]'
    default: return 'bg-gray-100 text-gray-600 border-gray-300'
  }
}

const QUICK_FILTERS = [
  { label: 'Hoje', activeClass: 'bg-[#1992FF] text-white shadow-[0_4px_12px_rgba(25,146,255,0.3)] border-[#1992FF]', inactiveClass: 'bg-[#1992FF]/5 dark:bg-[#1992FF]/10 text-[#1992FF] border-[#1992FF]/30 hover:bg-[#1992FF]/10 dark:hover:bg-[#1992FF]/20' },
  { label: 'Ontem', activeClass: 'bg-[#10B981] text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] border-[#10B981]', inactiveClass: 'bg-[#10B981]/5 dark:bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30 hover:bg-[#10B981]/10 dark:hover:bg-[#10B981]/20' },
  { label: 'Últimos 7 dias', activeClass: 'bg-[#A855F7] text-white shadow-[0_4px_12px_rgba(168,85,247,0.3)] border-[#A855F7]', inactiveClass: 'bg-[#A855F7]/5 dark:bg-[#A855F7]/10 text-[#A855F7] border-[#A855F7]/30 hover:bg-[#A855F7]/10 dark:hover:bg-[#A855F7]/20' },
  { label: 'Mês Atual', activeClass: 'bg-[#F59E0B] text-white shadow-[0_4px_12px_rgba(245,158,11,0.3)] border-[#F59E0B]', inactiveClass: 'bg-[#F59E0B]/5 dark:bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30 hover:bg-[#F59E0B]/10 dark:hover:bg-[#F59E0B]/20' },
]

export function Agenda() {
  const [search, setSearch] = useState('')
  const [quickFilter, setQuickFilter] = useState('Hoje')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const emptyAdv = { type: 'Todos', status: 'Todos', client: '', property: '', rep: '' }
  const [advFilters, setAdvFilters] = useState(emptyAdv)
  const [appliedAdvFilters, setAppliedAdvFilters] = useState(emptyAdv)

  // Hardcoded TODAY for mock stability (2026-09-26)
  const TODAY = new Date('2026-09-26T12:00:00Z')

  const filteredAgenda = useMemo(() => {
    return mockAgenda.filter(item => {
      // 1. Search
      if (search) {
        const term = search.toLowerCase()
        const match =
          item.title.toLowerCase().includes(term) ||
          item.client.toLowerCase().includes(term) ||
          item.location.toLowerCase().includes(term) ||
          item.type.toLowerCase().includes(term) ||
          item.property.toLowerCase().includes(term) ||
          item.rep.toLowerCase().includes(term)
        if (!match) return false
      }

      // 2. Quick Filter
      if (quickFilter !== 'Todos') {
        const itemDate = new Date(item.date + 'T12:00:00Z')
        const diffTime = TODAY.getTime() - itemDate.getTime()
        const diffDays = Math.round(diffTime / (1000 * 3600 * 24))

        if (quickFilter === 'Hoje' && diffDays !== 0) return false
        if (quickFilter === 'Ontem' && diffDays !== 1) return false
        if (quickFilter === 'Últimos 7 dias' && (diffDays < 0 || diffDays > 7)) return false
        if (quickFilter === 'Mês Atual') {
          if (itemDate.getMonth() !== TODAY.getMonth() || itemDate.getFullYear() !== TODAY.getFullYear()) return false
        }
      }

      // 3. Advanced Filters
      if (appliedAdvFilters.type !== 'Todos' && item.type !== appliedAdvFilters.type) return false
      if (appliedAdvFilters.status !== 'Todos' && item.status !== appliedAdvFilters.status) return false
      if (appliedAdvFilters.client && !item.client.toLowerCase().includes(appliedAdvFilters.client.toLowerCase())) return false
      if (appliedAdvFilters.property && !item.property.toLowerCase().includes(appliedAdvFilters.property.toLowerCase())) return false
      if (appliedAdvFilters.rep && !item.rep.toLowerCase().includes(appliedAdvFilters.rep.toLowerCase())) return false

      return true
    })
  }, [search, quickFilter, appliedAdvFilters])

  const grouped = filteredAgenda.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = []
    acc[curr.date].push(curr)
    return acc
  }, {} as Record<string, typeof mockAgenda>)

  const sortedDates = Object.keys(grouped).sort().reverse() // Show newest first or just sort alphabetically

  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr + 'T12:00:00Z')
    const diff = Math.round((TODAY.getTime() - d.getTime()) / (1000 * 3600 * 24))
    if (diff === 0) return `Hoje, ${d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}`
    if (diff === -1) return `Amanhã, ${d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}`
    if (diff === 1) return `Ontem, ${d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}`

    // uppercase first letter
    let str = d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const applyAdvFilters = () => {
    setAppliedAdvFilters(advFilters)
    setShowAdvanced(false)
  }
  const clearAdvFilters = () => {
    setAdvFilters(emptyAdv)
    setAppliedAdvFilters(emptyAdv)
    setShowAdvanced(false)
  }

  const removeAdvFilter = (key: keyof typeof emptyAdv) => {
    setAppliedAdvFilters(prev => ({ ...prev, [key]: emptyAdv[key] }))
    setAdvFilters(prev => ({ ...prev, [key]: emptyAdv[key] }))
  }

  const hasAdvFilters = appliedAdvFilters.type !== 'Todos' || appliedAdvFilters.status !== 'Todos' || appliedAdvFilters.client || appliedAdvFilters.property || appliedAdvFilters.rep

  return (
    <div className="flex flex-col h-full pt-4 lg:pt-6 relative">

      {/* Toolbar with Search */}
      <PageToolbar
        searchPlaceholder="Buscar por cliente, imóvel, tipo, observação..."
        onSearch={setSearch}
        primaryAction={
          <button className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#1685FF] hover:bg-[#005CE6] text-white px-4 py-2.5 rounded-[8px] font-semibold transition-colors shadow-lg shadow-[#1685FF]/20">
            <Plus className="w-5 h-5" />
            Novo Compromisso
          </button>
        }
      />

      {/* Quick Filters */}
      <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-2 md:gap-3 lg:gap-[14px] mb-4 w-full">
        {QUICK_FILTERS.map((opt) => (
          <button
            key={opt.label}
            onClick={() => setQuickFilter(quickFilter === opt.label ? 'Todos' : opt.label)}
            className={cn(
              "flex items-center justify-center border text-center transition-all duration-300",
              "w-full md:w-auto md:flex-1",
              "h-[40px] lg:h-[44px]",
              "px-2 md:px-[16px] lg:px-[22px]",
              "rounded-[12px]",
              "text-[13px] md:text-[14px] font-semibold tracking-wide leading-tight",
              quickFilter === opt.label ? opt.activeClass : opt.inactiveClass
            )}
          >
            {opt.label}
          </button>
        ))}
        {/* Advanced Filter Button */}
        <button
          onClick={() => setShowAdvanced(true)}
          className={cn(
            "flex items-center justify-center border text-center transition-all duration-300 col-span-2 md:col-span-1",
            "w-full md:w-auto md:flex-1",
            "h-[40px] lg:h-[44px]",
            "px-2 md:px-[16px] lg:px-[22px]",
            "rounded-[12px]",
            "text-[13px] md:text-[14px] font-semibold tracking-wide leading-tight",
            hasAdvFilters
              ? "bg-[#EF4444] text-white border-[#EF4444] shadow-[0_4px_12px_rgba(239,68,68,0.3)]"
              : "bg-white dark:bg-[#0A1E39] text-[#475569] dark:text-[#CBD5E1] border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] hover:border-[#1685FF] hover:text-[#1685FF] dark:hover:text-[#1685FF] hover:bg-gray-50 dark:hover:bg-[rgba(25,146,255,0.1)]"
          )}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtro {hasAdvFilters && "Ativo"}
        </button>
      </div>

      {/* Applied Filters Tags */}
      {hasAdvFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {appliedAdvFilters.type !== 'Todos' && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A855F7]/10 text-[#A855F7] text-xs font-semibold border border-[#A855F7]/30">
              Tipo: {appliedAdvFilters.type}
              <button onClick={() => removeAdvFilter('type')}><X className="w-3 h-3 hover:text-[#A855F7]" /></button>
            </span>
          )}
          {appliedAdvFilters.status !== 'Todos' && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs font-semibold border border-[#10B981]/30">
              Status: {appliedAdvFilters.status}
              <button onClick={() => removeAdvFilter('status')}><X className="w-3 h-3 hover:text-[#10B981]" /></button>
            </span>
          )}
          {appliedAdvFilters.client && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1992FF]/10 text-[#1992FF] text-xs font-semibold border border-[#1992FF]/30">
              Cliente: {appliedAdvFilters.client}
              <button onClick={() => removeAdvFilter('client')}><X className="w-3 h-3 hover:text-[#1992FF]" /></button>
            </span>
          )}
          {appliedAdvFilters.property && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-semibold border border-[#F59E0B]/30">
              Imóvel: {appliedAdvFilters.property}
              <button onClick={() => removeAdvFilter('property')}><X className="w-3 h-3 hover:text-[#F59E0B]" /></button>
            </span>
          )}
          {appliedAdvFilters.rep && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-500/10 text-gray-500 text-xs font-semibold border border-gray-500/30">
              Resp: {appliedAdvFilters.rep}
              <button onClick={() => removeAdvFilter('rep')}><X className="w-3 h-3 hover:text-gray-500" /></button>
            </span>
          )}
        </div>
      )}

      {/* Listagem */}
      <div className="flex flex-col gap-6 pb-8">
        {sortedDates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[16px]">
            <CalendarIcon className="w-12 h-12 text-[#64748B] dark:text-[#475569] mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-2">Nenhum compromisso encontrado</h3>
            <p className="text-[#475569] dark:text-[#94A3B8]">Tente ajustar seus filtros rápidos, avançados ou o termo de busca.</p>
            {(hasAdvFilters || search || quickFilter !== 'Todos') && (
              <button
                onClick={() => { clearAdvFilters(); setQuickFilter('Todos'); setSearch('') }}
                className="mt-6 px-4 py-2 bg-gray-100 dark:bg-[#0A1E39] text-[#0F172A] dark:text-white rounded-[8px] font-semibold hover:bg-gray-200 dark:hover:bg-[#0F294C] transition-colors"
              >
                Limpar todos os filtros
              </button>
            )}
          </div>
        ) : (
          sortedDates.map(date => (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] capitalize">{formatDateLabel(date)}</h3>

              <div className="flex flex-col gap-3">
                {grouped[date].map(appt => (
                  <div key={appt.id} className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[12px] p-4 shadow-sm hover:border-[#1685FF] transition-colors group">
                    {/* Horário */}
                    <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0 shrink-0 sm:w-20">
                      <span className="text-[20px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">{appt.time}</span>
                      <span className={cn("px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-wider hidden sm:block mt-1", getTypeColor(appt.type))}>
                        {appt.type}
                      </span>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-[16px]">{appt.title}</h4>
                          <p className="text-[#475569] dark:text-[#94A3B8] text-[14px] mt-1 flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" /> {appt.client}
                          </p>
                          <p className="text-[#475569] dark:text-[#94A3B8] text-[13px] mt-1 flex items-center gap-1.5">
                            {getTypeIcon(appt.type)} {appt.location}
                          </p>
                        </div>
                        <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-semibold border shrink-0", getStatusColor(appt.status))}>
                          {appt.status}
                        </span>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex sm:flex-col justify-end gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] pt-3 sm:pt-0 sm:pl-4 mt-2 sm:mt-0">
                      <button className="text-sm font-medium text-[#1685FF] hover:text-[#005CE6] transition-colors py-1">Editar</button>
                      <button className="text-sm font-medium text-[#10B981] hover:text-[#059669] transition-colors py-1">Concluir</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal: Filtro Avançado */}
      {showAdvanced && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[20px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            <div className="p-6 border-b border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] flex items-center justify-between sticky top-0 bg-white/95 dark:bg-[#081C36]/95 backdrop-blur-md z-10">
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#1685FF]" /> Filtro Avançado
              </h2>
              <button onClick={() => setShowAdvanced(false)} className="text-[#64748B] hover:text-[#0F172A] dark:hover:text-white transition-colors bg-gray-100 dark:bg-[#0A1E39] p-2 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#475569] dark:text-[#CBD5E1]">Tipo de Compromisso</label>
                <select
                  value={advFilters.type}
                  onChange={e => setAdvFilters({...advFilters, type: e.target.value})}
                  className="p-3 rounded-[10px] bg-gray-50 dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#1685FF] focus:border-[#1685FF] outline-none transition-all"
                >
                  <option>Todos</option>
                  <option>Visita</option>
                  <option>Reunião</option>
                  <option>Ligação</option>
                  <option>Retorno</option>
                  <option>Assinatura</option>
                  <option>Outro</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#475569] dark:text-[#CBD5E1]">Status</label>
                <select
                  value={advFilters.status}
                  onChange={e => setAdvFilters({...advFilters, status: e.target.value})}
                  className="p-3 rounded-[10px] bg-gray-50 dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#1685FF] focus:border-[#1685FF] outline-none transition-all"
                >
                  <option>Todos</option>
                  <option>Agendado</option>
                  <option>Confirmado</option>
                  <option>Concluído</option>
                  <option>Cancelado</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#475569] dark:text-[#CBD5E1]">Cliente</label>
                <input
                  type="text" placeholder="Nome do cliente..."
                  value={advFilters.client}
                  onChange={e => setAdvFilters({...advFilters, client: e.target.value})}
                  className="p-3 rounded-[10px] bg-gray-50 dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#1685FF] focus:border-[#1685FF] outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#475569] dark:text-[#CBD5E1]">Imóvel</label>
                <input
                  type="text" placeholder="Nome ou código do imóvel..."
                  value={advFilters.property}
                  onChange={e => setAdvFilters({...advFilters, property: e.target.value})}
                  className="p-3 rounded-[10px] bg-gray-50 dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#1685FF] focus:border-[#1685FF] outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-sm font-semibold text-[#475569] dark:text-[#CBD5E1]">Responsável / Corretor</label>
                <input
                  type="text" placeholder="Nome do corretor..."
                  value={advFilters.rep}
                  onChange={e => setAdvFilters({...advFilters, rep: e.target.value})}
                  className="p-3 rounded-[10px] bg-gray-50 dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#1685FF] focus:border-[#1685FF] outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>

            <div className="p-6 border-t border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] flex flex-col sm:flex-row justify-end gap-3 bg-gray-50/50 dark:bg-[#0A1E39]/50 rounded-b-[20px]">
              <button onClick={() => setShowAdvanced(false)} className="px-6 py-3 rounded-[10px] font-semibold text-[#64748B] hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto">
                Cancelar
              </button>
              <button onClick={clearAdvFilters} className="px-6 py-3 rounded-[10px] font-semibold text-[#EF4444] border border-[#EF4444]/30 hover:bg-[#EF4444]/10 transition-colors w-full sm:w-auto">
                Limpar Filtros
              </button>
              <button onClick={applyAdvFilters} className="px-6 py-3 rounded-[10px] font-semibold bg-[#1685FF] text-white hover:bg-[#005CE6] transition-colors shadow-lg shadow-[#1685FF]/20 w-full sm:w-auto">
                Aplicar Filtro
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
