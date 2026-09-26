import { mockDashboardMetrics, mockUpcomingAppointments, mockRecentProperties } from '../../mocks/mockDashboard'
import { Home, Users, Calendar, DollarSign, MapPin, Clock } from 'lucide-react'
import { MetricCard } from '../../components/dashboard/MetricCard'
import { DashboardCard } from '../../components/dashboard/DashboardCard'
import { cn } from '../../utils/cn'
import { useClients } from '../../contexts/ClientsContext'
import { useMemo } from 'react'

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

export function Dashboard() {
  const { clients } = useClients();

  const recentClients = useMemo(() => {
    return [...clients]
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, 3);
  }, [clients]);

  const getRelativeTime = (isoString?: string) => {
    if (!isoString) return '';
    const diffMs = Date.now() - new Date(isoString).getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `Há ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Há ${hours}h`;
    const days = Math.floor(hours / 24);
    return `Há ${days} dia${days > 1 ? 's' : ''}`;
  }

  return (
    <div className="flex flex-col space-y-4 lg:space-y-[18px] pb-4 max-w-[1500px] mx-auto transition-colors duration-300 pt-2 lg:pt-3">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-[16px] shrink-0">
        <MetricCard
          title="Imóveis Ativos"
          value={mockDashboardMetrics.activeProperties}
          indicator="↑ +2 este mês"
          indicatorColor="#10B981"
          icon={<Home className="h-6 w-6" />}
          colorClass="blue"
        />
        <MetricCard
          title="Novos Clientes"
          value={mockDashboardMetrics.newLeads}
          indicator="↑ +3 esta semana"
          indicatorColor="#10B981"
          icon={<Users className="h-6 w-6" />}
          colorClass="purple"
        />
        <MetricCard
          title="Visitas Agendadas"
          value={mockDashboardMetrics.scheduledVisits}
          indicator="↓ -1 esta semana"
          indicatorColor="#10B981"
          icon={<Calendar className="h-6 w-6" />}
          colorClass="green"
        />
        <MetricCard
          title="Fechamentos (Mês)"
          value={mockDashboardMetrics.closedDeals}
          indicator="↑ +2 vs. mês anterior"
          indicatorColor="#10B981"
          icon={<DollarSign className="h-6 w-6" />}
          colorClass="orange"
        />
      </div>

      {/* Listas: Próximos compromissos, Novos Leads e Novos Imóveis */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 h-auto">
        {/* Próximo Compromisso */}
        <DashboardCard
          title="Próximo Compromisso"
          icon={<Calendar className="h-6 w-6" />}
          borderColor="blue"
          linkTo="/agenda"
        >
          <div className="pt-1">
            {mockUpcomingAppointments.slice(0, 1).map((appt) => (
              <div
                key={appt.id}
                className="flex items-center gap-3.5 bg-[#F8FAFC] dark:bg-[rgba(25,146,255,0.03)] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.15)] rounded-[16px] p-3.5"
              >
                <div className="flex flex-col items-center justify-center bg-[#1992FF] text-white rounded-[12px] h-[64px] w-[56px] shrink-0">
                  <span className="text-[22px] font-bold leading-none">{appt.date.split('-')[2]}</span>
                  <span className="text-[11px] font-medium uppercase tracking-wider mt-1">SET</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[16.5px] text-[#0F172A] dark:text-[#F8FAFC] truncate">{appt.clientName}</p>
                  <p className="flex items-center text-[12.5px] text-[#475569] dark:text-[#B8C4D9] mt-1 truncate">
                    <MapPin className="h-3.5 w-3.5 mr-1.5 shrink-0" />
                    {appt.propertyTitle}
                  </p>
                  <p className="flex items-center text-[12.5px] text-[#475569] dark:text-[#B8C4D9] mt-0.5">
                    <Clock className="h-3.5 w-3.5 mr-1.5 shrink-0" />
                    {appt.time}
                  </p>
                </div>

                <div className="shrink-0 pl-1">
                  <div className="px-3.5 py-1 rounded-full border border-[#1992FF] text-[#1992FF] text-[12px] font-semibold bg-[rgba(25,146,255,0.1)]">
                    {appt.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Novos Leads Cadastrados */}
        <DashboardCard
          title="Novos Clientes Cadastrados"
          icon={<Users className="h-6 w-6" />}
          borderColor="purple"
          linkTo="/clientes"
        >
          <div className="space-y-0 pt-1">
            {recentClients.map((lead, idx) => (
              <div
                key={lead.id}
                className={cn(
                  'flex items-center justify-between py-[11px]',
                  idx !== Math.min(recentClients.length, 3) - 1
                    ? 'border-b border-[#E2E8F0] dark:border-[rgba(176,92,255,0.15)]'
                    : ''
                )}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shrink-0',
                    idx === 0 ? 'bg-[#00D1B2] text-white' :
                    idx === 1 ? 'bg-[#F5B000] text-white' :
                    'bg-[#4B3B8A] text-[#B05CFF] border border-[rgba(176,92,255,0.3)]'
                  )}>
                    {getInitials(lead.name)}
                  </div>
                  <div className="min-w-0 pr-2 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[14.5px] text-[#0F172A] dark:text-[#F8FAFC] truncate pr-2">{lead.name}</p>
                      <span className="text-[11px] text-[#64748B] dark:text-[#8898B0] shrink-0">
                        {getRelativeTime(lead.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-[12.5px] text-[#475569] dark:text-[#B8C4D9] truncate pr-2">Interesse: {lead.propertyInterest || lead.interestType}</p>
                      <div className={cn(
                        "px-2.5 py-[2px] rounded-full text-[10px] font-semibold shrink-0 border",
                        lead.status === 'Novo'
                          ? "text-[#00D1B2] border-[#00D1B2] bg-[rgba(0,209,178,0.1)]"
                          : lead.status === 'Em negociação'
                          ? "text-[#F59E0B] border-[#F59E0B] bg-[rgba(245,158,11,0.1)]"
                          : lead.status === 'Com negócio fechado'
                          ? "text-[#10B981] border-[#10B981] bg-[rgba(16,185,129,0.1)]"
                          : lead.status === 'Inativo'
                          ? "text-[#EF4444] border-[#EF4444] bg-[rgba(239,68,68,0.1)]"
                          : "text-[#B05CFF] border-[#B05CFF] bg-[rgba(176,92,255,0.1)]"
                      )}>
                        {lead.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Novos Imóveis */}
        <DashboardCard
          title="Novos Imóveis"
          icon={<Home className="h-6 w-6" />}
          borderColor="teal"
          linkTo="/imoveis"
        >
          <div className="space-y-0 pt-1">
            {mockRecentProperties.slice(0, 3).map((property, idx) => (
              <div
                key={property.id}
                className={cn(
                  'flex items-center justify-between py-[11px]',
                  idx !== Math.min(mockRecentProperties.length, 3) - 1
                    ? 'border-b border-[#E2E8F0] dark:border-[rgba(0,209,178,0.15)]'
                    : ''
                )}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="h-10 w-[60px] rounded-[6px] overflow-hidden shrink-0 bg-[#E2E8F0] dark:bg-[#1E3048]">
                    <img src={property.imageUrl} alt={property.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 pr-2 flex-1">
                    <p className="font-bold text-[14.5px] text-[#0F172A] dark:text-[#F8FAFC] truncate">{property.title}</p>
                    <p className="text-[12.5px] text-[#475569] dark:text-[#B8C4D9] truncate mt-0.5">{property.addedAt}</p>
                  </div>
                  <div className="shrink-0">
                    <div className={cn(
                      "px-2.5 py-[2px] rounded-full text-[10px] font-semibold border",
                      idx === 0 ? "text-[#00D1B2] border-[#00D1B2] bg-[rgba(0,209,178,0.1)]" :
                      idx === 1 ? "text-[#F5B000] border-[#F5B000] bg-[rgba(245,176,0,0.1)]" :
                      "text-[#1992FF] border-[#1992FF] bg-[rgba(25,146,255,0.1)]"
                    )}>
                      {property.badge}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}
