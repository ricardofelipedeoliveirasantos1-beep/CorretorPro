export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  ownerUid: string;
  plan: 'basic' | 'premium';
  status: 'active' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  id: string;
  workspaceId: string;
  userId: string;
  role: 'owner' | 'admin' | 'broker' | 'assistant';
  status: 'active' | 'invited' | 'disabled';
  createdAt: string;
}

export interface Client {
  id: string;
  workspaceId: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  cpf?: string;
  rg?: string;
  profession?: string;
  nationality?: string;
  maritalStatus?: string;
  address?: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  workspaceId: string;
  ownerId?: string;
  title: string;
  description: string;
  type: string;
  status: string;
  priceSale?: number;
  priceRent?: number;
  condoFee?: number;
  iptu?: number;
  areaTotal: number;
  areaUseful: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpots: number;
  address: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  features: string[];
  images: string[];
  isPublished: boolean;
  publishedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  workspaceId: string;
  clientId: string;
  propertyId: string;
  type: 'Venda' | 'Aluguel';
  stage: 'Interesse' | 'Visita' | 'Proposta' | 'Documentação' | 'Fechado' | 'Perdido' | 'Cancelado';
  status: 'Em andamento' | 'Fechado' | 'Perdido' | 'Cancelado';
  value: number;
  nextAction?: string;
  nextActionDate?: string;
  broker: string;
  notes?: string;
  closedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Commission {
  id: string;
  workspaceId: string;
  dealId?: string;
  propertyId: string;
  clientId: string;
  brokerId: string;
  type: 'Venda' | 'Aluguel';
  baseValue: number;
  percentage: number;
  commissionValue: number;
  status: 'Prevista' | 'A receber' | 'Recebida' | 'Cancelada';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Interest {
  id: string;
  workspaceId: string;
  propertyId: string;
  visitorName: string;
  visitorPhone: string;
  visitorEmail: string;
  message?: string;
  source: string;
  status: 'new' | 'contacted' | 'converted' | 'dismissed';
  createdAt: string;
}

export interface Appointment {
  id: string;
  workspaceId: string;
  propertyId: string;
  clientId?: string;
  interestId?: string;
  visitorName: string;
  visitorPhone: string;
  visitorEmail: string;
  scheduledAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PublicProfile {
  id: string;
  workspaceId: string;
  slug: string;
  displayName: string;
  logoUrl?: string;
  description?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  city?: string;
  state?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}
