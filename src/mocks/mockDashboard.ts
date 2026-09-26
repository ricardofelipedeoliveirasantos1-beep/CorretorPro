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
  },
  {
    id: '3',
    name: 'Ricardo Lima',
    propertyInterest: 'Casa em Condomínio',
    status: 'Qualificado',
    createdAt: '2026-09-15T09:00:00Z'
  }
]

export const mockRecentProperties = [
  {
    id: '1',
    title: 'Cobertura Duplex',
    addedAt: 'Adicionado hoje',
    badge: 'Novo',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '2',
    title: 'Apartamento Centro',
    addedAt: 'Adicionado ontem',
    badge: 'Destaque',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '3',
    title: 'Casa em Condomínio',
    addedAt: 'Adicionado há 2 dias',
    badge: 'Disponível',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=150&q=80'
  }
]
