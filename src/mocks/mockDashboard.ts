// TEMPORÁRIO — substituir por Supabase na fase de integração.

export const mockDashboardMetrics = {
  activeProperties: 14,
  newLeads: 5,
  scheduledVisits: 3,
  activeProposals: 2,
  ongoingDeals: 1,
  closedDeals: 8,
  revenue: 450000.00
}

export const mockUpcomingAppointments = [
  {
    id: '1',
    clientName: 'João Silva',
    propertyTitle: 'Apartamento Centro',
    date: '2026-09-19',
    time: '14:00',
    type: 'Visita'
  },
  {
    id: '2',
    clientName: 'Maria Santos',
    propertyTitle: 'Casa Condomínio Fechado',
    date: '2026-09-20',
    time: '10:00',
    type: 'Reunião'
  }
]

export const mockRecentLeads = [
  {
    id: '1',
    name: 'Carlos Oliveira',
    propertyInterest: 'Cobertura Duplex',
    status: 'Novo',
    createdAt: '2026-09-18T10:30:00Z'
  },
  {
    id: '2',
    name: 'Ana Costa',
    propertyInterest: 'Apartamento Centro',
    status: 'Em contato',
    createdAt: '2026-09-17T15:45:00Z'
  }
]
