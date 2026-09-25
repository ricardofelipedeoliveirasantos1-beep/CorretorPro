import { mockDashboardMetrics, mockUpcomingAppointments, mockRecentLeads } from '../../mocks/mockDashboard'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Home, Users, Calendar, DollarSign, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export function Dashboard() {
  const { user } = useAuth()
  const userName = user?.user_metadata?.first_name || 'Corretor'

  return (
    <div className="space-y-6">
      {/* Header Saudação */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-base-900">
          Olá, {userName} 👋
        </h1>
        <p className="text-base-500">
          Aqui está o resumo do seu desempenho hoje.
        </p>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-base-500">Imóveis Ativos</CardTitle>
            <Home className="h-4 w-4 text-base-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardMetrics.activeProperties}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-base-500">Novos Leads</CardTitle>
            <Users className="h-4 w-4 text-base-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardMetrics.newLeads}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-base-500">Visitas Agendadas</CardTitle>
            <Calendar className="h-4 w-4 text-base-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardMetrics.scheduledVisits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-base-500">Fechamentos (Mês)</CardTitle>
            <DollarSign className="h-4 w-4 text-base-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardMetrics.closedDeals}</div>
          </CardContent>
        </Card>
      </div>

      {/* Listas: Próximos compromissos e Novos Leads */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Próximos Compromissos</CardTitle>
            <Link to="/agenda" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
              Ver todos <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockUpcomingAppointments.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between border-b border-base-100 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{appt.clientName}</p>
                    <p className="text-sm text-base-500">{appt.propertyTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appt.date}</p>
                    <p className="text-sm text-base-500">{appt.time}</p>
                    <Badge variant="outline" className="mt-1">{appt.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Novos Leads</CardTitle>
            <Link to="/leads" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
              Ver todos <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between border-b border-base-100 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-base-500">{lead.propertyInterest}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={lead.status === 'Novo' ? 'success' : 'warning'}>
                      {lead.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
