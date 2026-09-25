import { mockDashboardMetrics, mockUpcomingAppointments, mockRecentLeads } from '../../mocks/mockDashboard'
import { Home, Users, Calendar, DollarSign, MapPin, Clock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { MetricCard } from '../../components/dashboard/MetricCard'
import { DashboardCard } from '../../components/dashboard/DashboardCard'
import { StatusBadge, AppointmentBadge } from '../../components/dashboard/StatusBadge'
import { cn } from '../../utils/cn'

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

export function Dashboard() {
  const { user } = useAuth()
  const userName = user?.user_metadata?.first_name || 'Usuário'

  return (
    <div className="space-y-8 pb-10 max-w-[1500px] mx-auto transition-colors duration-300">
      {/* Header Saudação */}
      <div className="pt-2">
        <h1 className="text-[26px] md:text-[32px] lg:text-[38px] font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
          Olá, {userName} 👋
        </h1>
        <p className="text-[14px] md:text-[16px] lg:text-[18px] text-[#475569] dark:text-[#B7C2D6] mt-1">
          Aqui está o resumo do seu desempenho hoje.
        </p>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Imóveis Ativos"
          value={mockDashboardMetrics.activeProperties}
          indicator="↑ +2 este mês"
          indicatorColor="#10B981"
          icon={<Home className="h-6 w-6" />}
          colorClass="blue"
        />
        <MetricCard
          title="Novos Leads"
          value={mockDashboardMetrics.newLeads}
          indicator="↑ +3 esta semana"
          indicatorColor="#10B981"
          icon={<Users className="h-6 w-6" />}
          colorClass="purple"
        />
        <MetricCard
          title="Visitas Agendadas"
          value={mockDashboardMetrics.scheduledVisits}
          indicator="↑ +1 esta semana"
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

      {/* Listas: Próximos compromissos e Novos Leads */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 h-auto lg:h-[340px]">
        {/* Próximos Compromissos */}
        <DashboardCard
          title="Próximos Compromissos"
          icon={<Calendar className="h-6 w-6" />}
          borderColor="blue"
          linkTo="/agenda"
        >
          <div className="space-y-0">
            {mockUpcomingAppointments.map((appt, idx) => (
              <div
                key={appt.id}
                className={cn(
                  'flex items-center justify-between py-4',
                  idx !== mockUpcomingAppointments.length - 1
                    ? 'border-b border-[#E2E8F0] dark:border-[#283A54]'
                    : ''
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold shrink-0',
                    appt.type === 'Visita'
                      ? 'bg-[#EAF3FF] text-[#1685FF] dark:bg-[rgba(22,133,255,0.15)]'
                      : 'bg-[#F3E8FF] text-[#A855F7] dark:bg-[rgba(168,85,247,0.15)]'
                  )}>
                    {getInitials(appt.clientName)}
                  </div>
                  <div>
                    <p className="font-semibold text-[15px] text-[#0F172A] dark:text-[#F8FAFC]">{appt.clientName}</p>
                    <p className="flex items-center text-sm text-[#475569] dark:text-[#B7C2D6] mt-0.5">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {appt.propertyTitle}
                    </p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{appt.date}</p>
                  <p className="flex items-center text-sm text-[#475569] dark:text-[#B7C2D6] mt-0.5">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {appt.time}
                  </p>
                  <div className="mt-2">
                    <AppointmentBadge type={appt.type} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Novos Leads */}
        <DashboardCard
          title="Novos Leads"
          icon={<Users className="h-6 w-6" />}
          borderColor="green"
          linkTo="/leads"
        >
          <div className="space-y-0">
            {mockRecentLeads.map((lead, idx) => (
              <div
                key={lead.id}
                className={cn(
                  'flex items-center justify-between py-4',
                  idx !== mockRecentLeads.length - 1
                    ? 'border-b border-[#E2E8F0] dark:border-[#283A54]'
                    : ''
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold shrink-0',
                    lead.status === 'Novo'
                      ? 'bg-[#D1FAE5] text-[#10B981] dark:bg-[rgba(16,185,129,0.15)]'
                      : 'bg-[#FEF3C7] text-[#F59E0B] dark:bg-[rgba(245,158,11,0.15)]'
                  )}>
                    {getInitials(lead.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-[15px] text-[#0F172A] dark:text-[#F8FAFC]">{lead.name}</p>
                    <p className="text-sm text-[#475569] dark:text-[#B7C2D6] mt-0.5">{lead.propertyInterest}</p>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={lead.status as 'Novo' | 'Em contato'} />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}
