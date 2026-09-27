import { useState, useMemo, useEffect } from 'react'
import { Percent, DollarSign, Clock, CheckCircle2, Handshake, Calculator, User, UserCircle, Info, Building2, FileText, Trash2, Search, X, ChevronDown, ChevronUp, MapPin, Calendar, MoreVertical, Edit2, Check } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { InlineFeedback } from '../../../components/ui/InlineFeedback'
import { cn } from '../../../utils/cn'

// Tipos
type TransactionType = 'Venda' | 'Aluguel'
type StatusType = 'Prevista' | 'A receber' | 'Recebida' | 'Cancelada'

interface Commission {
  id: string
  propertyId: string
  clientId: string
  brokerId: string
  type: TransactionType
  baseValue: number
  percentage: number
  commissionValue: number
  status: StatusType
  createdAt: string
}

// Mocks
const MOCK_PROPERTIES = [
  { id: '1', name: 'Apartamento 2 Quartos', subtitle: 'Residencial Bella Vista', type: 'Venda', valueVenda: 120000, valueAluguel: null, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=100&h=100' },
  { id: '2', name: 'Casa em Condomínio', subtitle: 'Condomínio Jardins', type: 'Venda', valueVenda: 850000, valueAluguel: null, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=100&h=100' },
  { id: '3', name: 'Apartamento Studio', subtitle: 'Ed. Central Park', type: 'Aluguel', valueVenda: null, valueAluguel: 2500, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=100&h=100' },
  { id: '4', name: 'Sala Comercial', subtitle: 'Business Tower', type: 'Aluguel', valueVenda: null, valueAluguel: 3200, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=100&h=100' },
  { id: '5', name: 'Casa Térrea', subtitle: 'Vila Moderna', type: 'Venda', valueVenda: 450000, valueAluguel: null, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=100&h=100' },
]

const MOCK_CLIENTS = [
  { id: 'c1', name: 'Mariana Silva' },
  { id: 'c2', name: 'João Mendes' },
  { id: 'c3', name: 'Ana Costa' },
  { id: 'c4', name: 'Ricardo Lima' },
  { id: 'c5', name: 'Fernanda Alves' },
]

const MOCK_BROKERS = [
  { id: 'b1', name: 'Carlos Ferreira' },
  { id: 'b2', name: 'Andre Coragem' },
]

const INITIAL_COMMISSIONS: Commission[] = [
  { id: 'com1', propertyId: '1', clientId: 'c1', brokerId: 'b1', type: 'Venda', baseValue: 120000, percentage: 6, commissionValue: 7200, status: 'Prevista', createdAt: new Date().toISOString() },
  { id: 'com2', propertyId: '2', clientId: 'c2', brokerId: 'b1', type: 'Venda', baseValue: 850000, percentage: 5, commissionValue: 42500, status: 'Recebida', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'com3', propertyId: '3', clientId: 'c3', brokerId: 'b2', type: 'Aluguel', baseValue: 2500, percentage: 100, commissionValue: 2500, status: 'A receber', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'com4', propertyId: '4', clientId: 'c4', brokerId: 'b2', type: 'Aluguel', baseValue: 3200, percentage: 100, commissionValue: 3200, status: 'Recebida', createdAt: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 'com5', propertyId: '5', clientId: 'c5', brokerId: 'b1', type: 'Venda', baseValue: 450000, percentage: 6, commissionValue: 27000, status: 'A receber', createdAt: new Date(Date.now() - 86400000 * 4).toISOString() },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const parseCurrencyToNumber = (val: string): number => {
  if (!val) return 0
  const cleaned = val.replace(/[^\d,-]/g, '')
  if (!cleaned) return 0
  let normalized = cleaned
  const lastComma = normalized.lastIndexOf(',')
  if (lastComma !== -1) {
    normalized = normalized.substring(0, lastComma).replace(/,/g, '') + '.' + normalized.substring(lastComma + 1)
  }
  const num = parseFloat(normalized)
  return isNaN(num) ? 0 : num
}

const parsePercentageToNumber = (val: string): number => {
  if (!val) return 0
  const cleaned = val.replace(/[^\d,-]/g, '')
  if (!cleaned) return 0
  let normalized = cleaned
  const lastComma = normalized.lastIndexOf(',')
  if (lastComma !== -1) {
    normalized = normalized.substring(0, lastComma).replace(/,/g, '') + '.' + normalized.substring(lastComma + 1)
  }
  const num = parseFloat(normalized)
  return isNaN(num) ? 0 : num
}

export function Comissao() {
  const [commissions, setCommissions] = useState<Commission[]>(() => {
    const saved = localStorage.getItem('corretorpro_commissions')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    return INITIAL_COMMISSIONS
  })

  useEffect(() => {
    localStorage.setItem('corretorpro_commissions', JSON.stringify(commissions))
  }, [commissions])

  // Form State
  const [transactionType, setTransactionType] = useState<TransactionType>('Venda')
  const [selectedPropertyId, setSelectedPropertyId] = useState('')
  const [selectedClientId, setSelectedClientId] = useState('')
  const [selectedBrokerId, setSelectedBrokerId] = useState('')
  const [baseValue, setBaseValue] = useState<string>('')
  const [percentage, setPercentage] = useState<string>('')
  
  // Resumo/Estimado (após clicar em calcular)
  const [estimatedResult, setEstimatedResult] = useState<number | null>(null)
  
  const [feedback, setFeedback] = useState<{show: boolean, type: 'success'|'error', msg: string}>({ show: false, type: 'success', msg: '' })

  const [searchClientText, setSearchClientText] = useState('')
  const [expandedCommissionId, setExpandedCommissionId] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [editingCommissionId, setEditingCommissionId] = useState<string | null>(null)
  const [deletingCommissionId, setDeletingCommissionId] = useState<string | null>(null)

  const [editType, setEditType] = useState<TransactionType>('Venda')
  const [editPropertyId, setEditPropertyId] = useState('')
  const [editClientId, setEditClientId] = useState('')
  const [editBrokerId, setEditBrokerId] = useState('')
  const [editBaseValue, setEditBaseValue] = useState<string>('')
  const [editPercentage, setEditPercentage] = useState<string>('')

  const handleEditClick = (com: Commission) => {
    setEditingCommissionId(com.id)
    setExpandedCommissionId(com.id)
    setOpenMenuId(null)
    setEditType(com.type)
    setEditPropertyId(com.propertyId)
    setEditClientId(com.clientId)
    setEditBrokerId(com.brokerId)
    setEditBaseValue(formatCurrency(com.baseValue))
    setEditPercentage(com.percentage.toString())
  }

  const handleSaveEdit = () => {
    if (!editingCommissionId) return
    const val = parseCurrencyToNumber(editBaseValue)
    const perc = parsePercentageToNumber(editPercentage)
    
    if (val < 0 || perc < 0) {
      setFeedback({ show: true, type: 'error', msg: 'Valores inválidos.' })
      setTimeout(() => setFeedback(prev => ({ ...prev, show: false })), 3000)
      return
    }

    setCommissions(prev => prev.map(c => {
      if (c.id === editingCommissionId) {
        return {
          ...c,
          type: editType,
          propertyId: editPropertyId,
          clientId: editClientId,
          brokerId: editBrokerId,
          baseValue: val,
          percentage: perc,
          commissionValue: val * (perc / 100)
        }
      }
      return c
    }))
    setEditingCommissionId(null)
    setFeedback({ show: true, type: 'success', msg: 'Comissão atualizada com sucesso.' })
    setTimeout(() => setFeedback(prev => ({ ...prev, show: false })), 3000)
  }

  const handleDeleteConfirm = () => {
    if (!deletingCommissionId) return
    setCommissions(prev => prev.filter(c => c.id !== deletingCommissionId))
    setDeletingCommissionId(null)
    setFeedback({ show: true, type: 'success', msg: 'Comissão excluída.' })
    setTimeout(() => setFeedback(prev => ({ ...prev, show: false })), 3000)
  }

  const filteredCommissions = useMemo(() => {
    if (!searchClientText.trim()) return commissions
    const searchLower = searchClientText.trim().toLowerCase()
    return commissions.filter(com => {
      const client = MOCK_CLIENTS.find(c => c.id === com.clientId)
      if (!client) return false
      return client.name.toLowerCase().includes(searchLower)
    })
  }, [commissions, searchClientText])

  const showFeedback = (type: 'success'|'error', msg: string) => {
    setFeedback({ show: true, type, msg })
    setTimeout(() => setFeedback(prev => ({ ...prev, show: false })), 3000)
  }

  // Preenche valor base automaticamente ao mudar imóvel ou tipo
  useEffect(() => {
    if (selectedPropertyId) {
      const prop = MOCK_PROPERTIES.find(p => p.id === selectedPropertyId)
      if (prop) {
        if (transactionType === 'Venda' && prop.valueVenda) {
          setBaseValue(formatCurrency(prop.valueVenda))
        } else if (transactionType === 'Aluguel' && prop.valueAluguel) {
          setBaseValue(formatCurrency(prop.valueAluguel))
        } else {
          setBaseValue('')
        }
      }
    } else {
      setBaseValue('')
    }
    setEstimatedResult(null)
  }, [selectedPropertyId, transactionType])

  const handleCalculate = () => {
    if (!selectedPropertyId) return showFeedback('error', 'Selecione um imóvel.')
    if (!percentage || isNaN(Number(percentage))) return showFeedback('error', 'Informe um percentual válido.')
    if (!baseValue || isNaN(Number(baseValue))) return showFeedback('error', 'Valor base inválido.')

    const val = parseCurrencyToNumber(baseValue)
    const perc = parsePercentageToNumber(percentage)

    if (val < 0) return showFeedback('error', 'Valor base inválido.')
    if (perc < 0) return showFeedback('error', 'Percentual inválido.')

    setEstimatedResult(val * (perc / 100))
  }

  const handleSave = () => {
    if (!selectedPropertyId || !selectedClientId || !selectedBrokerId || !percentage || !baseValue) {
      return showFeedback('error', 'Preencha todos os campos obrigatórios.')
    }
    
    // Auto calcula se não calculou ainda
    const val = parseCurrencyToNumber(baseValue)
    const perc = parsePercentageToNumber(percentage)
    
    if (val < 0 || perc < 0) {
      return showFeedback('error', 'Valores inválidos.')
    }

    const commVal = estimatedResult !== null ? estimatedResult : val * (perc / 100)

    const novaComissao: Commission = {
      id: Math.random().toString(36).substr(2, 9),
      propertyId: selectedPropertyId,
      clientId: selectedClientId,
      brokerId: selectedBrokerId,
      type: transactionType,
      baseValue: val,
      percentage: perc,
      commissionValue: commVal,
      status: 'Prevista',
      createdAt: new Date().toISOString()
    }

    setCommissions([novaComissao, ...commissions])
    handleClear()
    showFeedback('success', 'Comissão salva com sucesso!')
  }

  const handleClear = () => {
    setTransactionType('Venda')
    setSelectedPropertyId('')
    setSelectedClientId('')
    setSelectedBrokerId('')
    setBaseValue('')
    setPercentage('')
    setEstimatedResult(null)
  }

  // Agregações
  const metrics = useMemo(() => {
    const previstas = commissions.filter(c => c.status === 'Prevista')
    const aReceber = commissions.filter(c => c.status === 'A receber')
    const recebidas = commissions.filter(c => c.status === 'Recebida')
    
    return {
      previstaValor: previstas.reduce((acc, c) => acc + c.commissionValue, 0),
      previstaQtd: previstas.length,
      aReceberValor: aReceber.reduce((acc, c) => acc + c.commissionValue, 0),
      aReceberQtd: aReceber.length,
      recebidaValor: recebidas.reduce((acc, c) => acc + c.commissionValue, 0),
      recebidaQtd: recebidas.length,
      totalQtd: commissions.length
    }
  }, [commissions])

  // Cores de status corrigidas (Dark e Light perfeitamente contrastados)
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Prevista': return 'bg-[#F5A000]/10 text-[#F5A000] border-[#F5A000]/30'
      case 'A receber': return 'bg-[#1296FF]/10 text-[#1296FF] border-[#1296FF]/30'
      case 'Recebida': return 'bg-[#00D99A]/10 text-[#00D99A] border-[#00D99A]/30'
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/30'
    }
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Prevista': return <Clock className="w-3.5 h-3.5 mr-1.5" />
      case 'A receber': return <Clock className="w-3.5 h-3.5 mr-1.5" />
      case 'Recebida': return <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
      default: return null
    }
  }

  const selProp = MOCK_PROPERTIES.find(p => p.id === selectedPropertyId)

  return (
    <div className="p-4 sm:p-5 lg:p-7 max-w-[1600px] mx-auto space-y-5 lg:space-y-6 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1296FF] to-[#0A5BA1] flex items-center justify-center shadow-[0_0_20px_rgba(18,150,255,0.3)]">
            <Percent className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#10233F] dark:text-[#F8FAFC] tracking-tight">
              Comissão
            </h1>
            <p className="text-sm text-[#60738F] dark:text-[#9FB5D1] mt-1">
              Calcule, acompanhe e projete ganhos por venda ou aluguel.
            </p>
          </div>
        </div>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[18px]">
        {/* Prevista */}
        <div className="bg-white dark:bg-[#071D35] border border-[#D7E2EF] dark:border-[rgba(25,146,255,0.28)] rounded-[20px] p-[22px] shadow-[0_4px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_0_14px_rgba(25,146,255,0.10)] relative overflow-hidden flex flex-col justify-center h-[130px]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#168CFF]/10 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6 text-[#168CFF]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#60738F] dark:text-[#9FB5D1]">Comissão Prevista</p>
              <h3 className="text-[22px] font-bold text-[#10233F] dark:text-[#F8FAFC] mt-0.5">{formatCurrency(metrics.previstaValor)}</h3>
              <p className="text-xs text-[#60738F] dark:text-[#9FB5D1] mt-0.5">{metrics.previstaQtd} negociações</p>
            </div>
          </div>
        </div>
        
        {/* A Receber */}
        <div className="bg-white dark:bg-[#071D35] border border-[#D7E2EF] dark:border-[rgba(25,146,255,0.28)] rounded-[20px] p-[22px] shadow-[0_4px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_0_14px_rgba(25,146,255,0.10)] relative overflow-hidden flex flex-col justify-center h-[130px]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F5A000]/10 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-[#F5A000]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#60738F] dark:text-[#9FB5D1]">A Receber</p>
              <h3 className="text-[22px] font-bold text-[#10233F] dark:text-[#F8FAFC] mt-0.5">{formatCurrency(metrics.aReceberValor)}</h3>
              <p className="text-xs text-[#60738F] dark:text-[#9FB5D1] mt-0.5">{metrics.aReceberQtd} negociações</p>
            </div>
          </div>
        </div>
        
        {/* Recebida */}
        <div className="bg-white dark:bg-[#071D35] border border-[#D7E2EF] dark:border-[rgba(25,146,255,0.28)] rounded-[20px] p-[22px] shadow-[0_4px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_0_14px_rgba(25,146,255,0.10)] relative overflow-hidden flex flex-col justify-center h-[130px]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#00D99A]/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-[#00D99A]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#60738F] dark:text-[#9FB5D1]">Recebida</p>
              <h3 className="text-[22px] font-bold text-[#10233F] dark:text-[#F8FAFC] mt-0.5">{formatCurrency(metrics.recebidaValor)}</h3>
              <p className="text-xs text-[#60738F] dark:text-[#9FB5D1] mt-0.5">{metrics.recebidaQtd} negociações</p>
            </div>
          </div>
        </div>
        
        {/* Total */}
        <div className="bg-white dark:bg-[#071D35] border border-[#D7E2EF] dark:border-[rgba(25,146,255,0.28)] rounded-[20px] p-[22px] shadow-[0_4px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_0_14px_rgba(25,146,255,0.10)] relative overflow-hidden flex flex-col justify-center h-[130px]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1296FF]/10 flex items-center justify-center shrink-0">
              <Handshake className="w-6 h-6 text-[#1296FF]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#60738F] dark:text-[#9FB5D1]">Negócios com Comissão</p>
              <h3 className="text-[22px] font-bold text-[#10233F] dark:text-[#F8FAFC] mt-0.5">{metrics.totalQtd}</h3>
              <p className="text-xs text-[#60738F] dark:text-[#9FB5D1] mt-0.5">No período atual</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-[20px]">
        
        {/* CALCULADORA (Esquerda - ~70%) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#08203B] border border-[#D7E2EF] dark:border-[#168CFF]/40 rounded-[22px] p-5 sm:p-[26px] shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_0_14px_rgba(25,146,255,0.08)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-[#D7E2EF] dark:border-[#168CFF]/20">
            <div className="flex items-center gap-3">
              <Calculator className="w-5 h-5 text-[#168CFF]" />
              <h2 className="text-[18px] font-semibold text-[#10233F] dark:text-[#F8FAFC]">Calculadora de Comissão</h2>
            </div>
            
            {/* Toggles Venda/Aluguel removidos conforme solicitação */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] mb-[18px]">
            {/* Imóvel */}
            <div className="space-y-2 md:col-span-1">
              <label className="text-[14px] font-semibold text-[#10233F] dark:text-[#A9BDD6]">Imóvel</label>
              <select 
                value={selectedPropertyId}
                onChange={e => setSelectedPropertyId(e.target.value)}
                className="w-full h-12 bg-[#F8FAFC] dark:bg-[#061A30] border border-[#CBD8E7] dark:border-[#17518A] rounded-[10px] px-3 text-sm text-[#10233F] dark:text-[#F8FAFC] focus:ring-2 focus:ring-[#168CFF] focus:border-transparent outline-none transition-shadow"
              >
                <option value="" className="text-gray-400">Selecione...</option>
                {MOCK_PROPERTIES.map(p => (
                  <option key={p.id} value={p.id}>{p.name} - {p.subtitle}</option>
                ))}
              </select>
            </div>
            
            {/* Cliente */}
            <div className="space-y-2 md:col-span-1">
              <label className="text-[14px] font-semibold text-[#10233F] dark:text-[#A9BDD6]">Cliente</label>
              <select 
                value={selectedClientId}
                onChange={e => setSelectedClientId(e.target.value)}
                className="w-full h-12 bg-[#F8FAFC] dark:bg-[#061A30] border border-[#CBD8E7] dark:border-[#17518A] rounded-[10px] px-3 text-sm text-[#10233F] dark:text-[#F8FAFC] focus:ring-2 focus:ring-[#168CFF] focus:border-transparent outline-none transition-shadow"
              >
                <option value="">Selecione...</option>
                {MOCK_CLIENTS.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Corretor */}
            <div className="space-y-2 md:col-span-1">
              <label className="text-[14px] font-semibold text-[#10233F] dark:text-[#A9BDD6]">Corretor</label>
              <select 
                value={selectedBrokerId}
                onChange={e => setSelectedBrokerId(e.target.value)}
                className="w-full h-12 bg-[#F8FAFC] dark:bg-[#061A30] border border-[#CBD8E7] dark:border-[#17518A] rounded-[10px] px-3 text-sm text-[#10233F] dark:text-[#F8FAFC] focus:ring-2 focus:ring-[#168CFF] focus:border-transparent outline-none transition-shadow"
              >
                <option value="">Selecione...</option>
                {MOCK_BROKERS.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] mb-6">
            {/* Valor Base */}
            <div className="space-y-2 md:col-span-1">
              <label className="text-[14px] font-semibold text-[#10233F] dark:text-[#A9BDD6]">Valor do imóvel</label>
              <div className="relative">
                <input 
                  type="text"
                  inputMode="decimal"
                  value={baseValue}
                  onChange={(e) => {
                    const val = e.target.value
                    if (!val || val === 'R$ ' || val === 'R$' || val === 'R') {
                      setBaseValue('')
                      return
                    }
                    let cleaned = val.replace(/^R\$\s?/, '').replace(/\./g, '')
                    cleaned = cleaned.replace(/[^\d,]/g, '')
                    const parts = cleaned.split(',')
                    let intPart = parts[0]
                    if (intPart.length > 1) {
                      intPart = intPart.replace(/^0+/, '') || '0'
                    }
                    if (parts.length > 1) {
                      let decPart = parts.slice(1).join('')
                      if (decPart.length > 2) decPart = decPart.substring(0, 2)
                      const formattedInt = intPart ? new Intl.NumberFormat('pt-BR').format(parseInt(intPart, 10)) : '0'
                      setBaseValue(`R$ ${formattedInt},${decPart}`)
                    } else {
                      const formattedInt = intPart ? new Intl.NumberFormat('pt-BR').format(parseInt(intPart, 10)) : ''
                      setBaseValue(formattedInt ? `R$ ${formattedInt}` : '')
                    }
                  }}
                  className="w-full h-12 bg-[#F8FAFC] dark:bg-[#061A30] border border-[#CBD8E7] dark:border-[#17518A] rounded-[10px] px-3 text-sm text-[#10233F] dark:text-[#F8FAFC] focus:ring-2 focus:ring-[#168CFF] outline-none transition-shadow placeholder-[#A0B0C4] dark:placeholder-[#60738F]"
                  placeholder="R$ 0,00"
                />
              </div>
            </div>

            {/* Percentual */}
            <div className="space-y-2 md:col-span-1">
              <label className="text-[14px] font-semibold text-[#10233F] dark:text-[#A9BDD6]">Percentual da comissão</label>
              <div className="relative">
                <input 
                  type="text"
                  inputMode="decimal"
                  value={percentage}
                  onChange={(e) => {
                    const val = e.target.value
                    if (!val) {
                      setPercentage('')
                      return
                    }
                    let cleaned = val.replace(/[^\d,]/g, '')
                    const parts = cleaned.split(',')
                    if (parts.length > 1) {
                      setPercentage(`${parts[0]},${parts.slice(1).join('')}`)
                    } else {
                      setPercentage(parts[0])
                    }
                  }}
                  className="w-full h-12 bg-[#F8FAFC] dark:bg-[#061A30] border border-[#CBD8E7] dark:border-[#17518A] rounded-[10px] pl-3 pr-8 text-sm text-[#10233F] dark:text-[#F8FAFC] focus:ring-2 focus:ring-[#168CFF] outline-none transition-shadow placeholder-[#A0B0C4] dark:placeholder-[#60738F]"
                  placeholder="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#60738F] dark:text-[#A9BDD6] font-medium">%</span>
              </div>
            </div>
            
            {/* Resultado Estimado em Highlight */}
            <div className="md:col-span-1 bg-gradient-to-r from-[#168CFF]/10 to-[#0A5BA1]/5 border border-[#168CFF]/30 dark:border-[#168CFF]/50 rounded-[12px] py-6 px-4 flex flex-col items-center justify-center relative overflow-hidden dark:shadow-[0_0_14px_rgba(25,146,255,0.15)] min-h-[140px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#168CFF]/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              
              <div className="flex flex-col items-center justify-center relative z-10 w-full text-center">
                <div className="w-8 h-8 rounded-full bg-[#168CFF] flex items-center justify-center mb-2 shadow-[0_0_10px_rgba(22,140,255,0.4)]">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-[12px] font-bold text-[#168CFF] dark:text-[#1296FF] uppercase tracking-wider mb-1">Comissão estimada</span>
                <span className="text-[32px] font-bold text-[#168CFF] dark:text-[#1296FF]">
                  {estimatedResult !== null ? formatCurrency(estimatedResult) : 'R$ 0,00'}
                </span>
              </div>
            </div>
          </div>

          {/* Feedback message (inline) */}
          {feedback.show && (
            <div className="mb-4">
               <InlineFeedback type={feedback.type} message={feedback.msg} visible={true} />
            </div>
          )}

          <div className="flex flex-col gap-3 mt-4">
            <div className="flex flex-row gap-3 w-full">
              <Button onClick={handleCalculate} className="flex-1 h-12 bg-[#168CFF] hover:bg-[#127BE0] text-white font-semibold text-sm rounded-[10px] shadow-[0_4px_12px_rgba(22,140,255,0.3)] border-none">
                <Calculator className="w-4 h-4 mr-2" /> Calcular
              </Button>
              <Button onClick={handleSave} className="flex-1 h-12 bg-[#22C55E] hover:bg-[#16A34A] text-white font-semibold text-sm rounded-[10px] shadow-[0_4px_12px_rgba(34,197,94,0.3)] border-none">
                <CheckCircle2 className="w-4 h-4 mr-2" /> Salvar comissão
              </Button>
            </div>
            <Button onClick={handleClear} variant="outline" className="w-full h-12 bg-transparent border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10 font-semibold text-sm rounded-[10px] shadow-[0_0_10px_rgba(239,68,68,0.15)]">
              <Trash2 className="w-4 h-4 mr-2" /> Limpar
            </Button>
          </div>
        </div>

        {/* RESUMO (Direita - ~30%) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-[#071D35] border border-[#D7E2EF] dark:border-[#168CFF]/40 rounded-[22px] p-5 sm:p-[26px] shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_0_14px_rgba(25,146,255,0.08)]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#D7E2EF] dark:border-[#168CFF]/20">
              <FileText className="w-5 h-5 text-[#168CFF]" />
              <h2 className="text-[18px] font-semibold text-[#10233F] dark:text-[#F8FAFC]">Resumo da Simulação</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-1">
                <span className="text-[13px] text-[#60738F] dark:text-[#9FB5D1] flex items-center gap-2"><User className="w-4 h-4"/> Tipo do negócio:</span>
                <span className="text-[13px] font-bold text-white bg-[#168CFF] px-2.5 py-0.5 rounded-md">{transactionType}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[13px] text-[#60738F] dark:text-[#9FB5D1] flex items-center gap-2"><Building2 className="w-4 h-4"/> Imóvel:</span>
                <span className="text-[13px] font-semibold text-[#10233F] dark:text-[#F8FAFC] truncate max-w-[140px]">{selProp ? selProp.name : '-'}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[13px] text-[#60738F] dark:text-[#9FB5D1] flex items-center gap-2"><DollarSign className="w-4 h-4"/> Valor base:</span>
                <span className="text-[13px] font-semibold text-[#10233F] dark:text-[#F8FAFC]">{baseValue ? (baseValue.includes('R$') ? baseValue : formatCurrency(parseCurrencyToNumber(baseValue))) : '-'}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[13px] text-[#60738F] dark:text-[#9FB5D1] flex items-center gap-2"><UserCircle className="w-4 h-4"/> Comissão:</span>
                <span className="text-[13px] font-semibold text-[#10233F] dark:text-[#F8FAFC]">{percentage ? `${percentage}%` : '-'}</span>
              </div>
              <div className="flex justify-between items-center py-2 mt-2 border-t border-[#D7E2EF] dark:border-[#168CFF]/20">
                <span className="text-[14px] font-semibold text-[#10233F] dark:text-[#A9BDD6] flex items-center gap-2"><Percent className="w-4 h-4"/> Ganho estimado:</span>
                <span className="text-[15px] font-bold text-[#168CFF]">{estimatedResult !== null ? formatCurrency(estimatedResult) : '-'}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[13px] text-[#60738F] dark:text-[#9FB5D1] flex items-center gap-2"><Clock className="w-4 h-4"/> Status:</span>
                <span className="text-[11px] font-bold text-[#F5A000] bg-[#F5A000]/10 px-2 py-1 rounded border border-[#F5A000]/30 flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> Prevista
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#168CFF]/10 dark:bg-[#05182B] border border-[#168CFF]/30 dark:border-[#168CFF]/50 rounded-[16px] p-4 flex gap-3 shadow-[0_4px_12px_rgba(22,140,255,0.05)]">
            <Info className="w-5 h-5 text-[#168CFF] shrink-0 mt-0.5" />
            <p className="text-[12px] text-[#10233F] dark:text-[#9FB5D1] leading-relaxed font-medium">
              O percentual pode variar por imóvel e negociação. Confirme as condições com o proprietário e a imobiliária.
            </p>
          </div>
        </div>

      </div>

      {/* LISTA RECENTES EM FORMATO DE CARDS COMPACTOS */}
      <div className="bg-white dark:bg-[#071D35] border border-[#D7E2EF] dark:border-[#168CFF]/40 rounded-[22px] shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_0_14px_rgba(25,146,255,0.08)] flex flex-col">
        <div className="p-5 sm:px-6 flex items-center justify-between border-b border-[#D7E2EF] dark:border-[#168CFF]/20 bg-white dark:bg-[#061B31] rounded-t-[22px]">
          <div className="flex items-center gap-3">
            <UserCircle className="w-5 h-5 text-[#168CFF]" />
            <h2 className="text-[16px] font-bold text-[#10233F] dark:text-[#F8FAFC]">Comissões Recentes</h2>
          </div>
          <Button variant="outline" size="sm" className="text-[12px] h-8 bg-transparent border-[#CBD8E7] dark:border-[#168CFF]/30 text-[#60738F] dark:text-[#9FB5D1] hover:text-[#10233F] dark:hover:text-white">
            Ver todas &gt;
          </Button>
        </div>

        {/* PESQUISA */}
        <div className="p-4 border-b border-[#D7E2EF] dark:border-[#168CFF]/20">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#60738F] dark:text-[#A9BDD6]" />
            <input 
              type="text"
              placeholder="Buscar cliente por nome e sobrenome"
              value={searchClientText}
              onChange={(e) => setSearchClientText(e.target.value)}
              className="w-full h-11 bg-[#F8FAFC] dark:bg-[#061A30] border border-[#CBD8E7] dark:border-[#17518A] rounded-[10px] pl-10 pr-10 text-sm text-[#10233F] dark:text-[#F8FAFC] focus:ring-2 focus:ring-[#168CFF] outline-none transition-shadow placeholder-[#A0B0C4] dark:placeholder-[#60738F]"
            />
            {searchClientText && (
              <button 
                onClick={() => setSearchClientText('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#60738F] dark:text-[#A9BDD6] hover:text-[#10233F] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* LISTA DE CARDS */}
        <div className="p-4 sm:p-5 flex flex-col gap-[14px]">
          {filteredCommissions.slice(0, 10).map(com => {
            const client = MOCK_CLIENTS.find(c => c.id === com.clientId)
            const prop = MOCK_PROPERTIES.find(p => p.id === com.propertyId)
            const broker = MOCK_BROKERS.find(b => b.id === com.brokerId)
            
            const isVenda = com.type === 'Venda'
            const badgeBg = isVenda ? "bg-[#22C55E]/15 dark:bg-[#16A34A]/20" : "bg-[#F97316]/15 dark:bg-[#F97316]/20"
            const badgeText = isVenda ? "text-[#22C55E] dark:text-[#4ADE80]" : "text-[#F97316] dark:text-[#FB923C]"
            
            const isExpanded = expandedCommissionId === com.id
            const isEditing = editingCommissionId === com.id
            const isMenuOpen = openMenuId === com.id
            
            return (
              <div key={com.id} className="bg-[#F8FAFC] dark:bg-[#061A30] border border-[#D7E2EF] dark:border-[#17518A] rounded-[16px] p-4 flex flex-col relative transition-all">
                {/* MENU E EXPANDIR (ABSOLUTE Z-20) */}
                <div className="absolute top-3 right-3 flex gap-1 z-20">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setExpandedCommissionId(isExpanded ? null : com.id) }} 
                    className="p-1.5 rounded-md text-[#60738F] dark:text-[#9FB5D1] hover:bg-[#E2E8F0] dark:hover:bg-[#17518A] transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  <div className="relative">
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation()
                        if (isMenuOpen) {
                          setOpenMenuId(null)
                        } else {
                          setOpenMenuId(com.id)
                        }
                      }}
                      className="p-1.5 rounded-md text-[#60738F] dark:text-[#9FB5D1] hover:bg-[#E2E8F0] dark:hover:bg-[#17518A] transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {isMenuOpen && (
                      <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-[#071D35] border border-[#D7E2EF] dark:border-[#168CFF]/30 rounded-lg shadow-lg overflow-hidden z-30">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleEditClick(com); }}
                          className="w-full text-left px-4 py-3 text-[13px] font-semibold text-[#168CFF] hover:bg-[#F3F6FA] dark:hover:bg-[#061A30] flex items-center gap-2"
                        >
                          <Edit2 className="w-4 h-4" /> Editar
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); setDeletingCommissionId(com.id); }}
                          className="w-full text-left px-4 py-3 text-[13px] font-semibold text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[#EF4444]/10 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> Excluir
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* VISUALIZAÇÃO PADRÃO (FECHADA) */}
                <div className="flex flex-col pr-16 gap-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-[#05182B] border border-[#D7E2EF] dark:border-[#168CFF]/20 flex items-center justify-center shrink-0 mt-1 sm:mt-0">
                      <User className="w-5 h-5 text-[#60738F] dark:text-[#9FB5D1]" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-[14px] font-bold text-[#10233F] dark:text-[#F8FAFC] truncate max-w-[150px] sm:max-w-[200px]">
                        {client?.name || '-'}
                      </span>
                      <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wide inline-block w-max", badgeBg, badgeText)}>
                        {com.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-[14px] font-semibold text-[#10233F] dark:text-[#A9BDD6] truncate">
                      {prop?.name}
                    </span>
                    <span className="text-[12px] text-[#60738F] dark:text-[#9FB5D1] truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" /> <span className="truncate">{prop?.subtitle}</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[12px] text-[#60738F] dark:text-[#9FB5D1] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(com.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                    <span className={cn("text-[16px] font-bold", badgeText)}>
                      {formatCurrency(com.commissionValue)}
                    </span>
                  </div>
                </div>

                {/* CONTEÚDO EXPANDIDO */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#D7E2EF] dark:border-[#17518A]">
                    {isEditing ? (
                      <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Tipo Negócio */}
                          <div className="space-y-1">
                            <label className="text-[12px] font-semibold text-[#10233F] dark:text-[#A9BDD6]">Tipo de negócio</label>
                            <select 
                              value={editType}
                              onChange={e => setEditType(e.target.value as TransactionType)}
                              className="w-full h-10 bg-white dark:bg-[#071D35] border border-[#CBD8E7] dark:border-[#168CFF]/30 rounded-lg px-3 text-sm text-[#10233F] dark:text-[#F8FAFC] outline-none"
                            >
                              <option value="Venda">Venda</option>
                              <option value="Aluguel">Aluguel</option>
                            </select>
                          </div>
                          
                          {/* Imóvel */}
                          <div className="space-y-1">
                            <label className="text-[12px] font-semibold text-[#10233F] dark:text-[#A9BDD6]">Imóvel</label>
                            <select 
                              value={editPropertyId}
                              onChange={e => setEditPropertyId(e.target.value)}
                              className="w-full h-10 bg-white dark:bg-[#071D35] border border-[#CBD8E7] dark:border-[#168CFF]/30 rounded-lg px-3 text-sm text-[#10233F] dark:text-[#F8FAFC] outline-none"
                            >
                              {MOCK_PROPERTIES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                          </div>

                          {/* Cliente */}
                          <div className="space-y-1">
                            <label className="text-[12px] font-semibold text-[#10233F] dark:text-[#A9BDD6]">Cliente</label>
                            <select 
                              value={editClientId}
                              onChange={e => setEditClientId(e.target.value)}
                              className="w-full h-10 bg-white dark:bg-[#071D35] border border-[#CBD8E7] dark:border-[#168CFF]/30 rounded-lg px-3 text-sm text-[#10233F] dark:text-[#F8FAFC] outline-none"
                            >
                              {MOCK_CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                          </div>

                          {/* Corretor */}
                          <div className="space-y-1">
                            <label className="text-[12px] font-semibold text-[#10233F] dark:text-[#A9BDD6]">Corretor</label>
                            <select 
                              value={editBrokerId}
                              onChange={e => setEditBrokerId(e.target.value)}
                              className="w-full h-10 bg-white dark:bg-[#071D35] border border-[#CBD8E7] dark:border-[#168CFF]/30 rounded-lg px-3 text-sm text-[#10233F] dark:text-[#F8FAFC] outline-none"
                            >
                              {MOCK_BROKERS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                          </div>

                          {/* Valor Base */}
                          <div className="space-y-1">
                            <label className="text-[12px] font-semibold text-[#10233F] dark:text-[#A9BDD6]">Valor base</label>
                            <input 
                              type="text"
                              inputMode="decimal"
                              value={editBaseValue}
                              onChange={(e) => {
                                const val = e.target.value
                                if (!val || val === 'R$ ' || val === 'R$' || val === 'R') {
                                  setEditBaseValue('')
                                  return
                                }
                                let cleaned = val.replace(/^R\$\s?/, '').replace(/\./g, '')
                                cleaned = cleaned.replace(/[^\d,]/g, '')
                                const parts = cleaned.split(',')
                                let intPart = parts[0]
                                if (intPart.length > 1) {
                                  intPart = intPart.replace(/^0+/, '') || '0'
                                }
                                if (parts.length > 1) {
                                  let decPart = parts.slice(1).join('')
                                  if (decPart.length > 2) decPart = decPart.substring(0, 2)
                                  const formattedInt = intPart ? new Intl.NumberFormat('pt-BR').format(parseInt(intPart, 10)) : '0'
                                  setEditBaseValue(`R$ ${formattedInt},${decPart}`)
                                } else {
                                  const formattedInt = intPart ? new Intl.NumberFormat('pt-BR').format(parseInt(intPart, 10)) : ''
                                  setEditBaseValue(formattedInt ? `R$ ${formattedInt}` : '')
                                }
                              }}
                              className="w-full h-10 bg-white dark:bg-[#071D35] border border-[#CBD8E7] dark:border-[#168CFF]/30 rounded-lg px-3 text-sm text-[#10233F] dark:text-[#F8FAFC] outline-none"
                            />
                          </div>

                          {/* Percentual */}
                          <div className="space-y-1">
                            <label className="text-[12px] font-semibold text-[#10233F] dark:text-[#A9BDD6]">% Comissão</label>
                            <div className="relative">
                              <input 
                                type="text"
                                inputMode="decimal"
                                value={editPercentage}
                                onChange={(e) => {
                                  const val = e.target.value
                                  if (!val) {
                                    setEditPercentage('')
                                    return
                                  }
                                  let cleaned = val.replace(/[^\d,]/g, '')
                                  const parts = cleaned.split(',')
                                  if (parts.length > 1) {
                                    setEditPercentage(`${parts[0]},${parts.slice(1).join('')}`)
                                  } else {
                                    setEditPercentage(parts[0])
                                  }
                                }}
                                className="w-full h-10 bg-white dark:bg-[#071D35] border border-[#CBD8E7] dark:border-[#168CFF]/30 rounded-lg pl-3 pr-8 text-sm text-[#10233F] dark:text-[#F8FAFC] outline-none"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#60738F] dark:text-[#A9BDD6] text-sm">%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 mt-3 w-full">
                          <button onClick={handleSaveEdit} className="flex-1 h-11 bg-[#22C55E] hover:bg-[#16A34A] text-white text-[13px] font-semibold rounded-[10px] flex items-center justify-center gap-1.5 shadow-[0_2px_8px_rgba(34,197,94,0.3)]">
                            <Check className="w-4 h-4" /> Salvar
                          </button>
                          <button onClick={() => setEditingCommissionId(null)} className="flex-1 h-11 bg-transparent border border-[#60738F] dark:border-[#9FB5D1] text-[#10233F] dark:text-[#F8FAFC] hover:bg-[#E2E8F0] dark:hover:bg-[#17518A] text-[13px] font-semibold rounded-[10px] flex items-center justify-center gap-1.5">
                            <X className="w-4 h-4" /> Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-y-5 gap-x-3">
                        <div className="flex flex-col items-start">
                          <span className="text-[11px] text-[#60738F] dark:text-[#9FB5D1] uppercase tracking-wider font-semibold mb-1">Status</span>
                          <span className={cn("px-2.5 py-1 text-[11px] font-bold rounded-md border flex items-center w-max uppercase tracking-wide", getStatusColor(com.status))}>
                            {getStatusIcon(com.status)}
                            {com.status}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] text-[#60738F] dark:text-[#9FB5D1] uppercase tracking-wider font-semibold mb-1">Corretor</span>
                          <span className="text-[13px] font-bold text-[#10233F] dark:text-[#F8FAFC]">{broker?.name || '-'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] text-[#60738F] dark:text-[#9FB5D1] uppercase tracking-wider font-semibold mb-1">Valor Base</span>
                          <span className="text-[13px] font-bold text-[#10233F] dark:text-[#F8FAFC]">{formatCurrency(com.baseValue)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] text-[#60738F] dark:text-[#9FB5D1] uppercase tracking-wider font-semibold mb-1">Percentual</span>
                          <span className="text-[13px] font-bold text-[#10233F] dark:text-[#F8FAFC]">{com.percentage}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
          
          {filteredCommissions.length === 0 && (
            <div className="py-10 text-center flex flex-col items-center">
              <Info className="w-8 h-8 text-[#60738F] dark:text-[#9FB5D1] mb-3" />
              <p className="text-[13px] text-[#60738F] dark:text-[#9FB5D1]">
                Nenhuma comissão encontrada para este cliente.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {deletingCommissionId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#071D35] border border-[#D7E2EF] dark:border-[#168CFF]/40 rounded-2xl w-full max-w-sm p-6 shadow-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#EF4444]/10 flex items-center justify-center mb-4">
              <Trash2 className="w-7 h-7 text-[#EF4444]" />
            </div>
            <h3 className="text-[18px] font-bold text-[#10233F] dark:text-[#F8FAFC] mb-2">Excluir comissão?</h3>
            <p className="text-[14px] text-[#60738F] dark:text-[#9FB5D1] mb-6">
              Tem certeza que deseja excluir esta comissão? Esta ação não poderá ser desfeita.
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setDeletingCommissionId(null)}
                className="flex-1 h-12 bg-transparent border border-[#60738F] dark:border-[#9FB5D1] text-[#10233F] dark:text-[#F8FAFC] hover:bg-[#E2E8F0] dark:hover:bg-[#17518A] text-[14px] font-semibold rounded-xl"
              >
                Cancelar
              </button>
              <button 
                onClick={handleDeleteConfirm}
                className="flex-1 h-12 bg-[#EF4444] hover:bg-[#DC2626] text-white text-[14px] font-semibold rounded-xl shadow-[0_2px_8px_rgba(239,68,68,0.3)]"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
