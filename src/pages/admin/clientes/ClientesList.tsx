import { useState, useMemo, useEffect } from 'react'
import { Plus, Filter, Users, UserCheck, Briefcase, Award, ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { PageToolbar } from '../../../components/common/PageToolbar'
import { MetricCard } from '../../../components/dashboard/MetricCard'
import { cn } from '../../../utils/cn'
import { useClients } from '../../../contexts/ClientsContext'
import { ClientFormModal } from '../../../components/clientes/ClientFormModal'
import { ClientsFilterModal } from '../../../components/clientes/ClientsFilterModal'
import { ClientProfileDrawer } from '../../../components/clientes/ClientProfileDrawer'

const formatDate = (isoString?: string) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('pt-BR');
}

const formatTime = (isoString?: string) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ativo': return 'bg-[rgba(0,209,178,0.1)] text-[#00D1B2] border-[#00D1B2]'
    case 'Em negociação': return 'bg-[rgba(245,158,11,0.1)] text-[#F59E0B] border-[#F59E0B]'
    case 'Com negócio fechado': return 'bg-[rgba(16,185,129,0.1)] text-[#10B981] border-[#10B981]'
    case 'Inativo': return 'bg-[rgba(239,68,68,0.1)] text-[#EF4444] border-[#EF4444]'
    default: return 'bg-gray-100 text-gray-600 border-gray-300'
  }
}

const FILTER_OPTIONS = [
  {
    label: 'Todos',
    value: '',
    activeClass: 'bg-[#1992FF] text-white border-[#1992FF] shadow-[0_4px_12px_rgba(25,146,255,0.3)]',
    inactiveClass: 'bg-[#1992FF]/5 dark:bg-[#1992FF]/10 text-[#1992FF] border-[#1992FF]/30 hover:border-[#1992FF] hover:bg-[#1992FF]/10 dark:hover:bg-[#1992FF]/20'
  },
  {
    label: 'Ativos',
    value: 'Ativo',
    activeClass: 'bg-[#10B981] text-white border-[#10B981] shadow-[0_4px_12px_rgba(16,185,129,0.3)]',
    inactiveClass: 'bg-[#10B981]/5 dark:bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30 hover:border-[#10B981] hover:bg-[#10B981]/10 dark:hover:bg-[#10B981]/20'
  },
  {
    label: 'Em negociação',
    value: 'Em negociação',
    activeClass: 'bg-[#A855F7] text-white border-[#A855F7] shadow-[0_4px_12px_rgba(168,85,247,0.3)]',
    inactiveClass: 'bg-[#A855F7]/5 dark:bg-[#A855F7]/10 text-[#A855F7] border-[#A855F7]/30 hover:border-[#A855F7] hover:bg-[#A855F7]/10 dark:hover:bg-[#A855F7]/20'
  },
  {
    label: 'Com negócio fechado',
    value: 'Com negócio fechado',
    activeClass: 'bg-[#F59E0B] text-white border-[#F59E0B] shadow-[0_4px_12px_rgba(245,158,11,0.3)]',
    inactiveClass: 'bg-[#F59E0B]/5 dark:bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30 hover:border-[#F59E0B] hover:bg-[#F59E0B]/10 dark:hover:bg-[#F59E0B]/20'
  },
  {
    label: 'Inativos',
    value: 'Inativo',
    activeClass: 'bg-[#EF4444] text-white border-[#EF4444] shadow-[0_4px_12px_rgba(239,68,68,0.3)]',
    inactiveClass: 'bg-[#EF4444]/5 dark:bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30 hover:border-[#EF4444] hover:bg-[#EF4444]/10 dark:hover:bg-[#EF4444]/20'
  },
]

export function ClientesList() {
  const { clients: clientsList, addClient, updateClient } = useClients()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)

  const [advancedFilters, setAdvancedFilters] = useState({
    status: '',
    responsible: '',
    city: '',
    neighborhood: '',
    interestType: '',
    origin: ''
  })

  const ITEMS_PER_PAGE = 10

  // 1. Filtragem completa (Busca + Status + Avançados) baseada em clientsList (estado real)
  const filteredClients = useMemo(() => {
    let list = clientsList

    if (search.trim()) {
      const term = search.toLowerCase()
      list = list.filter(c =>
        (c.name && c.name.toLowerCase().includes(term)) ||
        (c.email && c.email.toLowerCase().includes(term)) ||
        (c.phone && c.phone.toLowerCase().includes(term)) ||
        (c.propertyInterest && c.propertyInterest.toLowerCase().includes(term)) ||
        (c.interestType && c.interestType.toLowerCase().includes(term)) ||
        (c.neighborhood && c.neighborhood.toLowerCase().includes(term)) ||
        (c.city && c.city.toLowerCase().includes(term)) ||
        (c.origin && c.origin.toLowerCase().includes(term)) ||
        (c.responsible && c.responsible.toLowerCase().includes(term)) ||
        (c.status && c.status.toLowerCase().includes(term))
      )
    }

    if (advancedFilters.status) {
      list = list.filter(c => c.status === advancedFilters.status)
    }
    if (advancedFilters.responsible) {
      list = list.filter(c => c.responsible && c.responsible.toLowerCase().includes(advancedFilters.responsible.toLowerCase()))
    }
    if (advancedFilters.city) {
      list = list.filter(c => c.city && c.city.toLowerCase().includes(advancedFilters.city.toLowerCase()))
    }
    if (advancedFilters.neighborhood) {
      list = list.filter(c => c.neighborhood && c.neighborhood.toLowerCase().includes(advancedFilters.neighborhood.toLowerCase()))
    }
    if (advancedFilters.interestType) {
      list = list.filter(c => c.interestType === advancedFilters.interestType)
    }
    if (advancedFilters.origin) {
      list = list.filter(c => c.origin === advancedFilters.origin)
    }

    return list.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    })
  }, [search, advancedFilters, clientsList])

  // 2. Paginação
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedClients = filteredClients.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE)

  // Auto-reset page if filter or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [search, advancedFilters])

  // Metricas baseadas em todos os clientes atuais da base
  const totalClientes = clientsList.length
  const totalAtivos = clientsList.filter(c => c.status === 'Ativo').length
  const totalNegociacao = clientsList.filter(c => c.status === 'Em negociação').length
  const totalFechados = clientsList.filter(c => c.status === 'Com negócio fechado').length

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handleSaveClient = (newClient: any) => {
    const nextId = clientsList.length > 0 ? Math.max(...clientsList.map(c => c.id)) + 1 : 1
    const clientToSave = { ...newClient, id: nextId }

    addClient(clientToSave)

    setAdvancedFilters({
      status: '', responsible: '', city: '', neighborhood: '', interestType: '', origin: ''
    })
    setSearch('')
    setCurrentPage(1)
    setIsModalOpen(false)
  }

  const handleUpdateClient = (updatedClient: any) => {
    updateClient(updatedClient);
    setSelectedClient(updatedClient); // Update the drawer data
  }

  const renderPagination = () => {
    if (totalPages <= 1 && filteredClients.length === 0) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-[8px] text-sm font-semibold transition-colors",
            currentPage === i
              ? "bg-[#1685FF] text-white shadow-md shadow-[#1685FF]/20"
              : "text-[#475569] dark:text-[#CBD5E1] hover:bg-gray-100 dark:hover:bg-[#0A1E39]"
          )}
        >
          {i}
        </button>
      )
    }

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-6 bg-white dark:bg-[#081C36] p-4 rounded-[12px] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] shadow-sm gap-4">
        <span className="text-sm text-[#475569] dark:text-[#94A3B8]">
          Mostrando <span className="font-bold text-[#0F172A] dark:text-white">{filteredClients.length > 0 ? startIndex + 1 : 0}</span> a <span className="font-bold text-[#0F172A] dark:text-white">{Math.min(endIndex, filteredClients.length)}</span> de <span className="font-bold text-[#0F172A] dark:text-white">{filteredClients.length}</span> clientes
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-1 flex-wrap justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-[8px] text-[#475569] dark:text-[#CBD5E1] hover:bg-gray-100 dark:hover:bg-[#0A1E39] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {pages}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-[8px] text-[#475569] dark:text-[#CBD5E1] hover:bg-gray-100 dark:hover:bg-[#0A1E39] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    )
  }

  // Active filters chips logic
  const activeFilterChips = Object.entries(advancedFilters).filter(([k, v]) => v !== '' && k !== 'status')

  const removeFilter = (key: string) => {
    setAdvancedFilters(prev => ({ ...prev, [key]: '' }))
  }

  return (
    <div className="flex flex-col h-full pt-4 lg:pt-6">

      {/* Cards de Resumo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Total de clientes" value={totalClientes} indicator="" indicatorColor="" colorClass="blue" icon={<Users />} />
        <MetricCard title="Clientes ativos" value={totalAtivos} indicator="" indicatorColor="" colorClass="green" icon={<UserCheck />} />
        <MetricCard title="Em negociação" value={totalNegociacao} indicator="" indicatorColor="" colorClass="orange" icon={<Briefcase />} />
        <MetricCard title="Negócios fechados" value={totalFechados} indicator="" indicatorColor="" colorClass="purple" icon={<Award />} />
      </div>

      {/* Toolbar - Atualizado com a nova estrutura responsiva */}
      <PageToolbar
        searchPlaceholder="Buscar por nome, bairro, imóvel..."
        onSearch={setSearch}
        primaryAction={
          <button onClick={() => setIsModalOpen(true)} className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#1685FF] hover:bg-[#005CE6] text-white px-4 py-2.5 rounded-[10px] font-semibold transition-colors shadow-lg shadow-[#1685FF]/20">
            <Plus className="w-5 h-5" />
            Novo Cliente
          </button>
        }
        filters={
          <button onClick={() => setIsFilterModalOpen(true)} className={cn("flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-[#0A1E39] border rounded-[10px] text-[#475569] dark:text-[#CBD5E1] hover:bg-gray-50 dark:hover:bg-[#0F294C] transition-colors", activeFilterChips.length > 0 ? "border-[#1685FF] dark:border-[#1685FF]/50" : "border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)]")}>
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filtros Avançados {activeFilterChips.length > 0 && `(${activeFilterChips.length})`}</span>
          </button>
        }
      />

      {/* Active Filter Chips */}
      {activeFilterChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilterChips.map(([key, value]) => (
            <div key={key} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1685FF]/10 text-[#1685FF] dark:bg-[#1685FF]/20 rounded-full text-xs font-semibold border border-[#1685FF]/20">
              <span>{value}</span>
              <button onClick={() => removeFilter(key)} className="hover:bg-[#1685FF]/20 rounded-full p-0.5 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Filtros Rápidos (Pills/Tabs) - Sincronizado com advancedFilters.status */}
      <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap gap-2 md:gap-3 lg:gap-[14px] mb-6 w-full">
        {FILTER_OPTIONS.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => setAdvancedFilters(prev => ({ ...prev, status: opt.value }))}
            className={cn(
              "flex items-center justify-center border text-center transition-all duration-300",
              "w-full md:w-auto md:flex-1",
              i === 4 ? "col-span-2 md:col-span-1" : "",
              "h-[40px] lg:h-[44px]",
              "px-2 md:px-[16px] lg:px-[22px]",
              "rounded-[12px]",
              "text-[13px] md:text-[14px] font-semibold tracking-wide leading-tight",
              advancedFilters.status === opt.value ? opt.activeClass : opt.inactiveClass
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {paginatedClients.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[12px]">
          <Search className="w-12 h-12 text-[#64748B] dark:text-[#475569] mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-2">Nenhum cliente encontrado</h3>
          <p className="text-[#475569] dark:text-[#94A3B8] text-center max-w-sm">
            Não encontramos resultados para a sua busca ou filtro atual. Tente usar outros termos.
          </p>
        </div>
      )}

      {/* Listagem Desktop (Tabela pura sem wrapper overflow-hidden problemático) */}
      {paginatedClients.length > 0 && (
        <div className="hidden lg:block w-full rounded-[12px] shadow-sm border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] bg-white dark:bg-[#081C36]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#0B2545] border-b border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] text-[#475569] dark:text-[#CBD5E1] text-[12px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4 rounded-tl-[12px]">Cliente / Contato</th>
                <th className="px-6 py-4">Interesse Principal</th>
                <th className="px-6 py-4">Responsável</th>
                <th className="px-6 py-4">Data e Hora</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center rounded-tr-[12px]">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#081C36]">
              {paginatedClients.map((cliente, index) => (
                <tr key={cliente.id} className={cn(
                  "border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] hover:bg-gray-50 dark:hover:bg-[rgba(25,146,255,0.02)] transition-colors",
                  index !== paginatedClients.length - 1 ? "border-b" : ""
                )}>
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-[15px]">{cliente.name}</p>
                    <p className="text-sm text-[#475569] dark:text-[#94A3B8] mt-0.5">{cliente.phone}</p>
                    {cliente.email && <p className="text-[12px] text-[#64748B] dark:text-[#64748B]">{cliente.email}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[14px] text-[#0F172A] dark:text-[#CBD5E1] font-semibold">{cliente.interestType} - {cliente.propertyInterest}</p>
                    <p className="text-[13px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">{cliente.neighborhood}, {cliente.city}</p>
                    {cliente.budget && <p className="text-[12px] text-[#475569] dark:text-[#64748B] font-medium mt-1">Orçamento: {cliente.budget}{cliente.interestType === 'Aluguel' ? ' / Mês' : ''}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-sm">{cliente.responsible}</span>
                      {cliente.origin && <span className="text-[12px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">Origem: {cliente.origin}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[14px] text-[#0F172A] dark:text-[#CBD5E1] font-medium">{formatDate(cliente.createdAt)}</p>
                    <p className="text-[12px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">às {formatTime(cliente.createdAt)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-3 py-1.5 rounded-full text-[11px] font-bold border tracking-wide whitespace-nowrap", getStatusColor(cliente.status))}>
                      {cliente.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center h-full w-full">
                      <button
                        onClick={() => setSelectedClient(cliente)}
                        className="w-full max-w-[110px] h-[36px] flex items-center justify-center bg-[#1685FF]/10 text-[#1685FF] hover:text-white font-semibold text-[13px] rounded-[10px] hover:bg-[#1685FF] transition-colors whitespace-nowrap"
                      >
                        Ver perfil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Listagem Mobile e Tablet (Cards) */}
      {paginatedClients.length > 0 && (
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
          {paginatedClients.map(cliente => (
            <div key={cliente.id} className="bg-white dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[12px] p-5 shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-[16px] leading-tight">{cliente.name}</h3>
                  <p className="text-[14px] text-[#475569] dark:text-[#94A3B8] mt-1">{cliente.phone}</p>
                </div>
                <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap shrink-0", getStatusColor(cliente.status))}>
                  {cliente.status}
                </span>
              </div>

              <div className="bg-gray-50 dark:bg-[#0A1E39] p-3.5 rounded-[8px] flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-[#475569] dark:text-[#94A3B8] font-medium">Interesse:</span>
                  <span className="text-[13px] font-bold text-[#0F172A] dark:text-[#F8FAFC] text-right">{cliente.interestType} - {cliente.propertyInterest}</span>
                </div>
                {cliente.budget && (
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-[#475569] dark:text-[#94A3B8] font-medium">Orçamento:</span>
                    <span className="text-[13px] font-bold text-[#1685FF] text-right">{cliente.budget}{cliente.interestType === 'Aluguel' ? ' / Mês' : ''}</span>
                  </div>
                )}
                <div className="flex justify-between items-center border-t border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] pt-2 mt-1">
                  <span className="text-[13px] text-[#475569] dark:text-[#94A3B8] font-medium">Corretor:</span>
                  <span className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{cliente.responsible}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-[#475569] dark:text-[#94A3B8] font-medium">Data e hora:</span>
                  <span className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{formatDate(cliente.createdAt)} • {formatTime(cliente.createdAt)}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedClient(cliente)}
                className="w-full py-2.5 bg-[#EAF3FF] dark:bg-[rgba(25,146,255,0.1)] hover:bg-[#D4E7FF] dark:hover:bg-[rgba(25,146,255,0.15)] text-[#1685FF] font-bold rounded-[8px] text-[14px] transition-colors"
              >
                Ver perfil
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination component */}
      {renderPagination()}

      <div className="pb-8"></div>

      <ClientFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveClient}
      />

      <ClientsFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentFilters={advancedFilters}
        onApplyFilters={(f) => {
          setAdvancedFilters(f);
          setCurrentPage(1);
        }}
        onClearFilters={() => {
          setSearch('');
        }}
      />

      <ClientProfileDrawer
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        client={selectedClient}
        onSave={handleUpdateClient}
      />
    </div>
  )
}
