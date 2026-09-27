import { useState, useEffect } from 'react'
import { X, Edit2, Save, XCircle, User, MapPin, Tag, Clock, AlignLeft } from 'lucide-react'
import { cn } from '../../utils/cn'
import { InlineFeedback } from '../ui/InlineFeedback'

interface ClientProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
  onSave: (updatedClient: any) => void;
}

import { ClientStatusBadge } from './ClientStatusBadge'
import { useClients } from '../../contexts/ClientsContext'
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

export function ClientProfileDrawer({ isOpen, onClose, client, onSave }: ClientProfileDrawerProps) {
  const { deleteClient } = useClients();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(client || {});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setFormData(client || {});
    setIsEditing(false);
    setShowDeleteConfirm(false);
  }, [client, isOpen]);

  const handleClose = () => {
    if (isEditing) {
      const isDirty = JSON.stringify(formData) !== JSON.stringify(client);
      if (isDirty) {
        if (!window.confirm('Existem alterações não salvas. Deseja realmente fechar?')) {
          return;
        }
      }
    }
    onClose();
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isEditing, formData, client]);

  if (!isOpen || !client) return null;

  const getInitials = (name: string) => {
    if (!name) return 'C';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    return name[0].toUpperCase();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'name' || name === 'responsible') {
      formattedValue = value
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
    } else if (name === 'phone') {
      let digits = value.replace(/\D/g, '');
      const isDeleting = value.length < formData.phone.length;
      if (isDeleting && formData.phone?.endsWith('-') && value.length === formData.phone.length - 1) {
         digits = digits.slice(0, -1);
      }
      if (digits.length === 0) formattedValue = '';
      else if (digits.length <= 2) formattedValue = `(${digits}`;
      else if (digits.length <= 6) formattedValue = `(${digits.slice(0, 2)})${digits.slice(2)}`;
      else if (digits.length <= 10) formattedValue = `(${digits.slice(0, 2)})${digits.slice(2, 6)}-${digits.slice(6)}`;
      else formattedValue = `(${digits.slice(0, 2)})${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    } else if (name === 'budget') {
      let digits = value.replace(/\D/g, '');
      if (digits === '') {
        formattedValue = '';
      } else {
        const amount = parseInt(digits, 10) / 100;
        formattedValue = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(amount);
      }
    }

    setFormData((prev: any) => ({ ...prev, [name]: formattedValue }));
  }

  const handleSave = () => {
    // Basic validation
    if (!formData.name?.trim() || !formData.phone?.trim()) {
      setShowError(true)
      return;
    }
    // We don't change createdAt. It is preserved from `client` originally via formData spreading it initially.
    let finalBudget = formData.budget;
    if (formData.interestType === 'Aluguel' && finalBudget && !finalBudget.includes('/ Mês')) {
      finalBudget = `${finalBudget} / Mês`;
    } else if (formData.interestType !== 'Aluguel' && finalBudget) {
      finalBudget = finalBudget.replace(/\s*\/\s*Mês/g, '');
    }

    onSave({
      ...formData,
      budget: finalBudget
    });
    setIsEditing(false);
    setShowError(false);
    setSuccessMessage('Cliente atualizado com sucesso.');
    setShowSuccess(true);
  }

  const handleDelete = () => {
    const result = deleteClient(client.id);
    if (!result.success) {
      setErrorMessage(result.message || 'Não foi possível excluir o cliente.');
      setShowError(true);
      setShowDeleteConfirm(false);
    } else {
      setSuccessMessage('Cliente excluído com sucesso.');
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }


  const handleCancel = () => {
    setFormData(client);
    setIsEditing(false);
  }

  const inputClasses = "w-full bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] text-[#0F172A] dark:text-[#F8FAFC] px-4 py-2 rounded-[8px] focus:outline-none focus:border-[#1685FF] focus:ring-1 focus:ring-[#1685FF] transition-all text-sm";
  const selectClasses = "w-full bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] text-[#0F172A] dark:text-[#F8FAFC] px-4 py-2 rounded-[8px] focus:outline-none focus:border-[#1685FF] transition-all text-sm";

  const labelClasses = "block text-[13px] font-semibold text-[#475569] dark:text-[#CBD5E1] mb-1.5";
  const readOnlyValue = "text-[#0F172A] dark:text-[#F8FAFC] text-[15px] font-medium bg-gray-50 dark:bg-[rgba(255,255,255,0.02)] px-4 py-2 rounded-[8px] border border-transparent";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-sm p-0 sm:p-6 transition-opacity" onClick={handleClose}>
      <div 
        className="bg-white dark:bg-[#06152B] w-full h-full sm:h-[90vh] sm:max-h-[850px] sm:max-w-[1100px] sm:rounded-[16px] shadow-2xl flex flex-col overflow-hidden border border-transparent dark:border-[#1685FF]/20"
        onClick={e => e.stopPropagation()}
      >

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0] dark:border-[rgba(255,255,255,0.05)] bg-white dark:bg-[#06152B]">
          <h2 className="text-[18px] font-bold text-[#0F172A] dark:text-white">Perfil do Cliente</h2>
          <button onClick={handleClose} className="p-2 text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.1)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">

          <InlineFeedback
            type="error"
            message={errorMessage || "Nome e telefone são obrigatórios."}
            visible={showError}
            duration={4000}
            onClose={() => setShowError(false)}
          />
          <InlineFeedback
            type="success"
            message={successMessage}
            visible={showSuccess}
            duration={2000}
            onClose={() => setShowSuccess(false)}
          />

          {/* Profile Card / Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8 bg-white dark:bg-[#0A1E39] p-5 rounded-[12px] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-[#1685FF] to-[#005CE6] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0">
              {getInitials(client.name)}
            </div>
            <div className="flex flex-col items-center sm:items-start flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white leading-tight">{client.name}</h3>
              <p className="text-[#64748B] dark:text-[#94A3B8] text-[14px] mt-1 mb-3">{client.email || 'Sem e-mail'}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <ClientStatusBadge status={client.status} />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Section: Dados Pessoais */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-[#1685FF] dark:text-[#3B82F6]">
                <User className="w-5 h-5" />
                <h4 className="font-bold text-[#0F172A] dark:text-white text-[15px]">Dados Pessoais</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Nome Completo</label>
                  {isEditing ? (
                    <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className={inputClasses} />
                  ) : (
                    <p className={readOnlyValue}>{client.name}</p>
                  )}
                </div>
                <div>
                  <label className={labelClasses}>Telefone</label>
                  {isEditing ? (
                    <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} className={inputClasses} />
                  ) : (
                    <p className={readOnlyValue}>{client.phone}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClasses}>E-mail</label>
                  {isEditing ? (
                    <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className={inputClasses} />
                  ) : (
                    <p className={readOnlyValue}>{client.email || '-'}</p>
                  )}
                </div>
                <div>
                  <label className={labelClasses}>Status</label>
                  {isEditing ? (
                    <select name="status" value={formData.status || ''} onChange={handleChange} className={selectClasses}>
                      <option value="Ativo">Ativo</option>
                      <option value="Em negociação">Em negociação</option>
                      <option value="Com negócio fechado">Com negócio fechado</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  ) : (
                    <p className={readOnlyValue}>{client.status}</p>
                  )}
                </div>
              </div>
            </section>

            <hr className="border-[#E2E8F0] dark:border-[rgba(255,255,255,0.05)]" />

            {/* Section: Localização */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-[#1685FF] dark:text-[#3B82F6]">
                <MapPin className="w-5 h-5" />
                <h4 className="font-bold text-[#0F172A] dark:text-white text-[15px]">Localização</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Cidade</label>
                  {isEditing ? (
                    <input type="text" name="city" value={formData.city || ''} onChange={handleChange} className={inputClasses} />
                  ) : (
                    <p className={readOnlyValue}>{client.city || '-'}</p>
                  )}
                </div>
                <div>
                  <label className={labelClasses}>Bairro</label>
                  {isEditing ? (
                    <input type="text" name="neighborhood" value={formData.neighborhood || ''} onChange={handleChange} className={inputClasses} />
                  ) : (
                    <p className={readOnlyValue}>{client.neighborhood || '-'}</p>
                  )}
                </div>
              </div>
            </section>

            <hr className="border-[#E2E8F0] dark:border-[rgba(255,255,255,0.05)]" />

            {/* Section: Interesse */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-[#1685FF] dark:text-[#3B82F6]">
                <Tag className="w-5 h-5" />
                <h4 className="font-bold text-[#0F172A] dark:text-white text-[15px]">Interesse Imobiliário</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Tipo de Interesse</label>
                  {isEditing ? (
                    <select name="interestType" value={formData.interestType || ''} onChange={handleChange} className={selectClasses}>
                      <option value="Compra">Compra</option>
                      <option value="Aluguel">Aluguel</option>
                      <option value="Investimento">Investimento</option>
                    </select>
                  ) : (
                    <p className={readOnlyValue}>{client.interestType || '-'}</p>
                  )}
                </div>
                <div>
                  <label className={labelClasses}>Orçamento</label>
                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget || ''}
                        onChange={handleChange}
                        className={cn(inputClasses, formData.interestType === 'Aluguel' ? 'pr-16' : '')}
                      />
                      {formData.interestType === 'Aluguel' && formData.budget && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold bg-[#1685FF]/10 text-[#1685FF] px-2 py-1 rounded-[6px]">
                          / Mês
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className={readOnlyValue}>
                      {client.budget || '-'}
                      {client.interestType === 'Aluguel' && client.budget && (
                        <span className="ml-2 text-[11px] font-bold bg-[#1685FF]/10 text-[#1685FF] px-2 py-1 rounded-[6px]">
                          / Mês
                        </span>
                      )}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClasses}>Imóvel de Interesse</label>
                  {isEditing ? (
                    <input type="text" name="propertyInterest" value={formData.propertyInterest || ''} onChange={handleChange} className={inputClasses} />
                  ) : (
                    <p className={readOnlyValue}>{client.propertyInterest || '-'}</p>
                  )}
                </div>
              </div>
            </section>

            <hr className="border-[#E2E8F0] dark:border-[rgba(255,255,255,0.05)]" />

            {/* Section: Detalhes do CRM */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-[#1685FF] dark:text-[#3B82F6]">
                <Clock className="w-5 h-5" />
                <h4 className="font-bold text-[#0F172A] dark:text-white text-[15px]">Cadastro e Atendimento</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Origem</label>
                  {isEditing ? (
                    <input type="text" name="origin" value={formData.origin || ''} onChange={handleChange} className={inputClasses} />
                  ) : (
                    <p className={readOnlyValue}>{client.origin || '-'}</p>
                  )}
                </div>
                <div>
                  <label className={labelClasses}>Responsável / Corretor</label>
                  {isEditing ? (
                    <input type="text" name="responsible" value={formData.responsible || ''} onChange={handleChange} className={inputClasses} />
                  ) : (
                    <p className={readOnlyValue}>{client.responsible || '-'}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClasses}>Data e hora de entrada (Criado em)</label>
                  <p className="text-[#64748B] dark:text-[#94A3B8] text-[14px]">
                    {formatDate(client.createdAt)} às {formatTime(client.createdAt)}
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-[#E2E8F0] dark:border-[rgba(255,255,255,0.05)]" />

            {/* Section: Observações */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-[#1685FF] dark:text-[#3B82F6]">
                <AlignLeft className="w-5 h-5" />
                <h4 className="font-bold text-[#0F172A] dark:text-white text-[15px]">Observações</h4>
              </div>
              <div>
                {isEditing ? (
                  <textarea
                    name="observation"
                    value={formData.observation || ''}
                    onChange={handleChange}
                    className={cn(inputClasses, "min-h-[100px] resize-y")}
                  />
                ) : (
                  <p className="text-[#475569] dark:text-[#CBD5E1] text-[14px] bg-gray-50 dark:bg-[rgba(255,255,255,0.02)] p-4 rounded-[8px] whitespace-pre-wrap">
                    {client.observation || 'Nenhuma observação.'}
                  </p>
                )}
              </div>
            </section>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 z-10 p-5 border-t border-[#E2E8F0] dark:border-[rgba(255,255,255,0.05)] bg-white dark:bg-[#06152B] shrink-0">
          {!isEditing ? (
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto px-8 py-3 bg-[#1685FF] text-white rounded-[8px] font-bold hover:bg-[#005CE6] transition-colors flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Editar Perfil
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="w-full sm:w-auto relative">
                {showDeleteConfirm ? (
                  <div className="flex flex-col sm:flex-row items-center gap-2 bg-[#FEF2F2] dark:bg-[#450a0a] p-2 rounded-[8px] border border-[#FECACA] dark:border-[#7f1d1d] w-full sm:w-auto">
                    <span className="text-[13px] text-[#991B1B] dark:text-[#fca5a5] font-semibold px-2">
                      Tem certeza?
                    </span>
                    <div className="flex w-full sm:w-auto gap-2">
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-transparent border border-[#FECACA] dark:border-[#7f1d1d] text-[#991B1B] dark:text-[#fca5a5] rounded-[6px] font-bold text-[13px] hover:bg-gray-50 dark:hover:bg-[#7f1d1d]/20 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex-1 sm:flex-none px-4 py-2 bg-[#DC2626] text-white rounded-[6px] font-bold text-[13px] hover:bg-[#B91C1C] transition-colors"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full sm:w-auto px-6 py-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-[8px] font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    Excluir Cliente
                  </button>
                )}
              </div>
              
              {!showDeleteConfirm && (
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleCancel}
                    className="w-full sm:w-auto px-6 py-3 border border-[#E2E8F0] dark:border-[rgba(255,255,255,0.1)] text-[#475569] dark:text-[#CBD5E1] rounded-[8px] font-bold hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="w-full sm:w-auto px-8 py-3 bg-[#10B981] text-white rounded-[8px] font-bold hover:bg-[#059669] transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Salvar Alterações
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
