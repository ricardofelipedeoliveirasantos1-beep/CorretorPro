import { useState, useMemo, useEffect } from 'react'
import { Plus, Filter, Calendar, Search, X, Edit2, CheckCircle2, Home } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { useClients } from '../../../contexts/ClientsContext'
import { mockProperties } from '../../../mocks/mockProperties'

export interface Deal {
  id: string;
  clientId: number;
  propertyId: string;
  type: 'Venda' | 'Aluguel';
  stage: 'Interesse' | 'Visita' | 'Proposta' | 'Documentação' | 'Fechado' | 'Perdido' | 'Cancelado';
  status: 'Em andamento' | 'Fechado' | 'Perdido' | 'Cancelado';
  value: number;
  nextAction: string;
  nextActionDate: string;
  broker: string;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

const INITIAL_DEALS: Deal[] = [
  {
    id: 'd1',
    clientId: 1,
    propertyId: 'prop-1',
    type: 'Venda',
    stage: 'Interesse',
    status: 'Em andamento',
    value: 1250000,
    nextAction: 'Ligar para agendar',
    nextActionDate: '2026-09-28',
    broker: 'Mariana Costa',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'd2',
    clientId: 2,
    propertyId: 'prop-8',
    type: 'Venda',
    stage: 'Proposta',
    status: 'Em andamento',
    value: 4500000,
    nextAction: 'Aguardando aceite',
    nextActionDate: '2026-09-29',
    broker: 'Rafael Lima',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function NegociosBoard() {
  const { clients } = useClients();
  const properties = mockProperties;

  const [deals, setDeals] = useState<Deal[]>(() => {
    const saved = localStorage.getItem('corretorpro_deals');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return INITIAL_DEALS;
  });

  useEffect(() => {
    localStorage.setItem('corretorpro_deals', JSON.stringify(deals));
  }, [deals]);

  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState('Todos');
  const [filterStage, setFilterStage] = useState('Todas');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  // Form states
  const [formData, setFormData] = useState<Partial<Deal>>({});

  const openNewDealModal = () => {
    setFormData({
      type: 'Venda',
      stage: 'Interesse',
      status: 'Em andamento',
      value: 0,
      nextAction: '',
      nextActionDate: '',
      broker: '',
      notes: ''
    });
    setEditingDeal(null);
    setIsModalOpen(true);
  };

  const openEditModal = (deal: Deal) => {
    setFormData({ ...deal });
    setEditingDeal(deal);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.clientId || !formData.propertyId) {
      alert("Selecione um cliente e um imóvel.");
      return;
    }

    const now = new Date().toISOString();
    
    // Auto-update status based on stage
    let status = formData.status || 'Em andamento';
    let closedAt = formData.closedAt;
    
    if (formData.stage === 'Fechado') {
      status = 'Fechado';
      if (!closedAt) closedAt = now;
    } else if (formData.stage === 'Perdido') {
      status = 'Perdido';
    } else if (formData.stage === 'Cancelado') {
      status = 'Cancelado';
    } else {
      status = 'Em andamento';
    }

    if (editingDeal) {
      setDeals(prev => prev.map(d => d.id === editingDeal.id ? { 
        ...d, 
        ...formData, 
        status,
        closedAt,
        updatedAt: now 
      } as Deal : d));
    } else {
      const newDeal: Deal = {
        ...(formData as Deal),
        id: 'deal-' + Date.now(),
        status,
        closedAt,
        createdAt: now,
        updatedAt: now
      };
      setDeals(prev => [newDeal, ...prev]);
    }
    setIsModalOpen(false);
  };

  const updateDealStage = (dealId: string, newStage: Deal['stage']) => {
    const now = new Date().toISOString();
    setDeals(prev => prev.map(d => {
      if (d.id !== dealId) return d;
      let status: Deal['status'] = 'Em andamento';
      let closedAt = d.closedAt;
      if (newStage === 'Fechado') {
        status = 'Fechado';
        if (!closedAt) closedAt = now;
      } else if (newStage === 'Perdido') {
        status = 'Perdido';
      } else if (newStage === 'Cancelado') {
        status = 'Cancelado';
      }
      return { ...d, stage: newStage, status, closedAt, updatedAt: now };
    }));
  };

  const enrichedDeals = useMemo(() => {
    return deals.map(d => {
      const client = clients.find(c => c.id === Number(d.clientId));
      const property = properties.find(p => p.id === d.propertyId);
      return { ...d, client, property };
    });
  }, [deals, clients, properties]);

  const filteredDeals = useMemo(() => {
    let result = enrichedDeals;

    if (filterType !== 'Todos') {
      result = result.filter(d => d.type === filterType);
    }
    if (filterStage !== 'Todas') {
      if (filterStage === 'Perdidos / Cancelados') {
        result = result.filter(d => d.stage === 'Perdido' || d.stage === 'Cancelado');
      } else {
        result = result.filter(d => d.stage === filterStage);
      }
    }

    if (searchText.trim()) {
      const s = searchText.toLowerCase();
      result = result.filter(d => {
        const clientMatch = d.client?.name?.toLowerCase().includes(s);
        const propMatch = d.property?.title?.toLowerCase().includes(s) || d.property?.address?.neighborhood?.toLowerCase().includes(s) || d.property?.address?.city?.toLowerCase().includes(s) || d.property?.code?.toLowerCase().includes(s);
        return clientMatch || propMatch;
      });
    }

    return result;
  }, [enrichedDeals, searchText, filterType, filterStage]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const renderCard = (deal: any) => {
    return (
      <div key={deal.id} className="bg-white dark:bg-[#081C36] p-4 rounded-[12px] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] shadow-sm flex flex-col gap-3 group relative w-full overflow-hidden">
        <div className="flex justify-between items-start w-full gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-[#0F172A] dark:text-[#F8FAFC] truncate">{deal.client?.name || 'Cliente Removido'}</h4>
            <p className="text-[13px] text-[#475569] dark:text-[#CBD5E1] mt-0.5 truncate flex items-center gap-1">
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{deal.property?.title || 'Imóvel Removido'}</span>
            </p>
          </div>
          <button 
            onClick={() => openEditModal(deal)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 dark:bg-[rgba(25,146,255,0.05)] text-[#64748B] hover:text-[#1685FF] hover:bg-[#1685FF]/10 transition-colors shrink-0"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className={cn(
            "px-2 py-0.5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider shrink-0",
            deal.type === 'Venda' ? "bg-[#22C55E]/15 text-[#22C55E]" : "bg-[#F97316]/15 text-[#F97316]"
          )}>
            {deal.type}
          </div>
          <div className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-[14px] truncate">
            {formatCurrency(deal.value)}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A1E39] p-3 rounded-[8px] flex flex-col gap-2">
          <div className="flex justify-between items-center w-full gap-2">
            <span className="text-[11px] text-[#64748B] font-semibold uppercase tracking-wider shrink-0">Próxima Ação</span>
            <span className="text-[12px] text-[#0F172A] dark:text-[#F8FAFC] font-medium truncate ml-auto text-right">{deal.nextAction || '-'}</span>
          </div>
          <div className="flex justify-between items-center w-full gap-2">
            <span className="text-[11px] text-[#64748B] font-semibold uppercase tracking-wider shrink-0">Data</span>
            <span className="text-[12px] text-[#0F172A] dark:text-[#F8FAFC] font-medium flex items-center gap-1 shrink-0 ml-auto">
              <Calendar className="w-3 h-3" />
              {deal.nextActionDate ? new Date(deal.nextActionDate).toLocaleDateString('pt-BR') : '-'}
            </span>
          </div>
        </div>

        <div className="mt-1 pt-3 border-t border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] w-full">
          <select 
            value={deal.stage}
            onChange={(e) => updateDealStage(deal.id, e.target.value as Deal['stage'])}
            className="w-full text-[12px] font-bold bg-transparent border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[6px] px-2 py-1.5 text-[#475569] dark:text-[#CBD5E1] outline-none focus:border-[#1685FF] max-w-full truncate"
          >
            <option value="Interesse">Interesse</option>
            <option value="Visita">Visita</option>
            <option value="Proposta">Proposta</option>
            <option value="Documentação">Documentação</option>
            <option value="Fechado">Fechado</option>
            <option value="Perdido">Perdido</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>
    );
  };

  const renderColumn = (title: string, stages: string[], colorClass: string) => {
    const items = filteredDeals.filter(d => stages.includes(d.stage));
    return (
      <div className="flex flex-col bg-[#F8FAFC] dark:bg-[rgba(25,146,255,0.02)] rounded-[12px] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] min-h-[300px] w-full min-w-0 overflow-hidden">
        <div className="flex items-center justify-between p-3.5 border-b border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)]">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <div className={cn("w-3 h-3 rounded-full shrink-0", colorClass)}></div>
            <h3 className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-[14px] md:text-[15px] truncate">{title}</h3>
            <span className="bg-[#E2E8F0] dark:bg-[rgba(25,146,255,0.1)] text-[#475569] dark:text-[#CBD5E1] text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0">
              {items.length}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-3 h-full">
          {items.map(renderCard)}
          {items.length === 0 && (
            <div className="flex items-center justify-center flex-1 text-[#94A3B8] text-[13px] font-medium py-8 text-center px-4 w-full">
              Nenhum negócio nesta etapa.
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden w-full max-w-full">
      {/* Top Search & Filter Bar */}
      <div className="shrink-0 mb-4 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Buscar cliente, imóvel, bairro..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[8px] pl-9 pr-10 py-2.5 text-[14px] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1685FF] transition-colors"
            />
            {searchText && (
              <button onClick={() => setSearchText('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#EF4444]">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] border transition-colors whitespace-nowrap w-full sm:w-auto",
              showFilters 
                ? "bg-[#1685FF]/10 border-[#1685FF]/30 text-[#1685FF]" 
                : "bg-white dark:bg-[#0A1E39] border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] text-[#475569] dark:text-[#CBD5E1] hover:bg-gray-50"
            )}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filtros</span>
          </button>
          <button 
            onClick={openNewDealModal}
            className="flex items-center justify-center gap-2 bg-[#1685FF] hover:bg-[#005CE6] text-white px-4 py-2.5 rounded-[8px] font-semibold transition-colors whitespace-nowrap w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            Novo Negócio
          </button>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="bg-white dark:bg-[#0A1E39] p-4 rounded-[8px] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] flex flex-wrap gap-4 items-end animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
              <label className="text-[12px] font-bold text-[#64748B] uppercase">Tipo</label>
              <select 
                value={filterType} onChange={e => setFilterType(e.target.value)}
                className="w-full bg-[#F8FAFC] dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[6px] px-3 py-2 text-[13px] text-[#0F172A] dark:text-[#F8FAFC] outline-none focus:border-[#1685FF]"
              >
                <option value="Todos">Todos</option>
                <option value="Venda">Venda</option>
                <option value="Aluguel">Aluguel</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
              <label className="text-[12px] font-bold text-[#64748B] uppercase">Etapa</label>
              <select 
                value={filterStage} onChange={e => setFilterStage(e.target.value)}
                className="w-full bg-[#F8FAFC] dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[6px] px-3 py-2 text-[13px] text-[#0F172A] dark:text-[#F8FAFC] outline-none focus:border-[#1685FF]"
              >
                <option value="Todas">Todas</option>
                <option value="Interesse">Interesse</option>
                <option value="Visita">Visita</option>
                <option value="Proposta">Proposta</option>
                <option value="Documentação">Documentação</option>
                <option value="Fechado">Fechado</option>
                <option value="Perdidos / Cancelados">Perdidos / Cancelados</option>
              </select>
            </div>
            <button 
              onClick={() => { setFilterType('Todos'); setFilterStage('Todas'); }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#475569] dark:text-[#CBD5E1] text-[13px] font-bold rounded-[6px] transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Main Board Area - Vertical scroll only, no horizontal scroll */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 [scrollbar-width:thin] w-full pr-1 pb-10">
        
        {/* TOP ROW: Active Stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
          {renderColumn('Interesse', ['Interesse'], 'bg-[#A855F7]')}
          {renderColumn('Visita', ['Visita'], 'bg-[#1992FF]')}
          {renderColumn('Proposta', ['Proposta'], 'bg-[#F59E0B]')}
          {renderColumn('Documentação', ['Documentação'], 'bg-[#EF4444]')}
        </div>

        {/* BOTTOM ROW: Closed/Lost Stages */}
        <h3 className="font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-4 text-[16px] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          Finalizados e Histórico
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {renderColumn('Fechados', ['Fechado'], 'bg-[#10B981]')}
          {renderColumn('Perdidos / Cancelados', ['Perdido', 'Cancelado'], 'bg-[#64748B]')}
        </div>
      </div>

      {/* Modal Novo / Editar Negócio */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-[#0A1E39] rounded-[16px] w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)]">
              <h2 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                {editingDeal ? 'Editar Negócio' : 'Novo Negócio'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-[#EF4444] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 flex flex-col gap-4">
              {/* Cliente */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#475569] dark:text-[#94A3B8]">Cliente *</label>
                <select 
                  value={formData.clientId || ''}
                  onChange={e => setFormData({...formData, clientId: Number(e.target.value)})}
                  className="w-full bg-[#F8FAFC] dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[8px] px-3 py-2.5 text-[14px] text-[#0F172A] dark:text-[#F8FAFC] outline-none focus:border-[#1685FF]"
                >
                  <option value="">Selecione um cliente...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              {/* Imóvel */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#475569] dark:text-[#94A3B8]">Imóvel *</label>
                <select 
                  value={formData.propertyId || ''}
                  onChange={e => setFormData({...formData, propertyId: e.target.value})}
                  className="w-full bg-[#F8FAFC] dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[8px] px-3 py-2.5 text-[14px] text-[#0F172A] dark:text-[#F8FAFC] outline-none focus:border-[#1685FF]"
                >
                  <option value="">Selecione um imóvel...</option>
                  {properties.map(p => <option key={p.id} value={p.id}>{p.title} - {p.address.neighborhood}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Tipo */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#475569] dark:text-[#94A3B8]">Tipo da Operação</label>
                  <select 
                    value={formData.type || 'Venda'}
                    onChange={e => setFormData({...formData, type: e.target.value as Deal['type']})}
                    className="w-full bg-[#F8FAFC] dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[8px] px-3 py-2.5 text-[14px] text-[#0F172A] dark:text-[#F8FAFC] outline-none focus:border-[#1685FF]"
                  >
                    <option value="Venda">Venda</option>
                    <option value="Aluguel">Aluguel</option>
                  </select>
                </div>

                {/* Valor */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#475569] dark:text-[#94A3B8]">Valor (R$)</label>
                  <input 
                    type="number"
                    value={formData.value || 0}
                    onChange={e => setFormData({...formData, value: Number(e.target.value)})}
                    className="w-full bg-[#F8FAFC] dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[8px] px-3 py-2.5 text-[14px] text-[#0F172A] dark:text-[#F8FAFC] outline-none focus:border-[#1685FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Etapa */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#475569] dark:text-[#94A3B8]">Etapa Atual</label>
                  <select 
                    value={formData.stage || 'Interesse'}
                    onChange={e => setFormData({...formData, stage: e.target.value as Deal['stage']})}
                    className="w-full bg-[#F8FAFC] dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[8px] px-3 py-2.5 text-[14px] text-[#0F172A] dark:text-[#F8FAFC] outline-none focus:border-[#1685FF]"
                  >
                    <option value="Interesse">Interesse</option>
                    <option value="Visita">Visita</option>
                    <option value="Proposta">Proposta</option>
                    <option value="Documentação">Documentação</option>
                    <option value="Fechado">Fechado</option>
                    <option value="Perdido">Perdido</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>

                {/* Corretor */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#475569] dark:text-[#94A3B8]">Corretor / Responsável</label>
                  <input 
                    type="text"
                    value={formData.broker || ''}
                    onChange={e => setFormData({...formData, broker: e.target.value})}
                    placeholder="Nome do responsável"
                    className="w-full bg-[#F8FAFC] dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[8px] px-3 py-2.5 text-[14px] text-[#0F172A] dark:text-[#F8FAFC] outline-none focus:border-[#1685FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Próxima Ação */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#475569] dark:text-[#94A3B8]">Próxima Ação</label>
                  <input 
                    type="text"
                    value={formData.nextAction || ''}
                    onChange={e => setFormData({...formData, nextAction: e.target.value})}
                    placeholder="Ex: Ligar para agendar"
                    className="w-full bg-[#F8FAFC] dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[8px] px-3 py-2.5 text-[14px] text-[#0F172A] dark:text-[#F8FAFC] outline-none focus:border-[#1685FF]"
                  />
                </div>

                {/* Data Próxima Ação */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#475569] dark:text-[#94A3B8]">Data da Ação</label>
                  <input 
                    type="date"
                    value={formData.nextActionDate || ''}
                    onChange={e => setFormData({...formData, nextActionDate: e.target.value})}
                    className="w-full bg-[#F8FAFC] dark:bg-[#081C36] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[8px] px-3 py-2.5 text-[14px] text-[#0F172A] dark:text-[#F8FAFC] outline-none focus:border-[#1685FF]"
                  />
                </div>
              </div>

              {/* Data Fechamento (Only if closed) */}
              {formData.stage === 'Fechado' && (
                <div className="flex flex-col gap-1.5 bg-green-50 dark:bg-green-500/10 p-4 rounded-[8px] border border-green-200 dark:border-green-500/20">
                  <label className="text-[13px] font-bold text-green-700 dark:text-green-400">Data de Fechamento</label>
                  <input 
                    type="date"
                    value={formData.closedAt ? formData.closedAt.split('T')[0] : ''}
                    onChange={e => setFormData({...formData, closedAt: e.target.value ? new Date(e.target.value).toISOString() : ''})}
                    className="w-full bg-white dark:bg-[#081C36] border border-green-200 dark:border-green-500/20 rounded-[8px] px-3 py-2.5 text-[14px] text-[#0F172A] dark:text-[#F8FAFC] outline-none focus:border-green-500"
                  />
                  <p className="text-[11px] text-green-600 dark:text-green-500 mt-1">
                    Esta data será utilizada para calcular os fechamentos no Dashboard.
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] flex justify-end gap-3 bg-gray-50 dark:bg-[rgba(25,146,255,0.02)] rounded-b-[16px]">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-[14px] font-bold text-[#475569] dark:text-[#CBD5E1] hover:bg-gray-200 dark:hover:bg-white/10 rounded-[8px] transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2.5 text-[14px] font-bold bg-[#1685FF] hover:bg-[#005CE6] text-white rounded-[8px] transition-colors"
              >
                {editingDeal ? 'Salvar Alterações' : 'Criar Negócio'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
