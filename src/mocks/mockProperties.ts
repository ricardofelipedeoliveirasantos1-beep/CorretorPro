import { type Property } from '../types/property'

// TEMPORÁRIO — substituir por Supabase na fase de integração.

export let mockProperties: Property[] = [
  {
    id: 'prop-1',
    code: 'AP-101',
    title: 'Apartamento de alto padrão em Ponta Verde',
    purpose: 'Venda',
    type: 'Apartamento',
    status: 'Disponível',
    salePrice: 1250000,
    condoFee: 1200,
    iptu: 3500,
    address: {
      zipCode: '57035-000',
      state: 'AL',
      city: 'Maceió',
      neighborhood: 'Ponta Verde',
      street: 'Rua Deputado José Lages',
      number: '123',
      complement: 'Apt 402'
    },
    features: {
      totalArea: 140,
      builtArea: 140,
      bedrooms: 4,
      suites: 2,
      bathrooms: 4,
      parkingSpaces: 3,
      floor: 4
    },
    amenities: {
      hasPool: true,
      hasBalcony: true,
      hasElevator: true,
      hasGym: true,
      hasGourmetArea: true,
      hasConcierge: true,
      isGatedCommunity: true,
      isFurnished: false,
      allowsPets: true,
      hasAirConditioning: false,
      hasSeaView: true,
      others: ['Salão de festas', 'Brinquedoteca']
    },
    description: 'Excelente apartamento com vista para o mar em Ponta Verde. Amplo, nascente, super ventilado.',
    ownerId: 'owner-1',
    photos: [
      { id: 'photo-1', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800', isCover: true, order: 0 },
      { id: 'photo-2', url: 'https://images.unsplash.com/photo-1502672260266-1c1de2d9668f?auto=format&fit=crop&q=80&w=800', isCover: false, order: 1 }
    ],
    isPublished: true,
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-01T10:00:00Z'
  },
  {
    id: 'prop-2',
    code: 'CA-201',
    title: 'Casa em condomínio fechado',
    purpose: 'Venda',
    type: 'Casa',
    status: 'Em negociação',
    salePrice: 2800000,
    condoFee: 1500,
    iptu: 6000,
    address: {
      zipCode: '57038-000',
      state: 'AL',
      city: 'Maceió',
      neighborhood: 'Guaxuma',
      street: 'AL-101 Norte',
      number: 'S/N',
      complement: 'Lote 15'
    },
    features: {
      totalArea: 600,
      builtArea: 450,
      bedrooms: 5,
      suites: 4,
      bathrooms: 6,
      parkingSpaces: 4
    },
    amenities: {
      hasPool: true,
      hasBalcony: true,
      hasElevator: false,
      hasGym: false,
      hasGourmetArea: true,
      hasConcierge: true,
      isGatedCommunity: true,
      isFurnished: true,
      allowsPets: true,
      hasAirConditioning: true,
      hasSeaView: false,
      others: ['Jardim', 'Pé direito duplo']
    },
    description: 'Casa de luxo em condomínio fechado, recém construída, com acabamento premium e totalmente mobiliada.',
    ownerId: 'owner-1',
    photos: [
      { id: 'photo-3', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800', isCover: true, order: 0 }
    ],
    isPublished: true,
    createdAt: '2026-09-02T10:00:00Z',
    updatedAt: '2026-09-02T10:00:00Z'
  },
  {
    id: 'prop-3',
    code: 'TE-301',
    title: 'Terreno comercial bem localizado',
    purpose: 'Venda',
    type: 'Terreno',
    status: 'Disponível',
    salePrice: 450000,
    iptu: 1200,
    address: {
      zipCode: '57020-000',
      state: 'AL',
      city: 'Maceió',
      neighborhood: 'Farol',
      street: 'Avenida Fernandes Lima',
      number: '1000'
    },
    features: {
      totalArea: 800,
      builtArea: 0,
      bedrooms: 0,
      suites: 0,
      bathrooms: 0,
      parkingSpaces: 0
    },
    amenities: {
      hasPool: false,
      hasBalcony: false,
      hasElevator: false,
      hasGym: false,
      hasGourmetArea: false,
      hasConcierge: false,
      isGatedCommunity: false,
      isFurnished: false,
      allowsPets: true,
      hasAirConditioning: false,
      hasSeaView: false,
      others: []
    },
    description: 'Excelente terreno plano, pronto para construir, em uma das vias mais movimentadas da cidade.',
    ownerId: 'owner-3',
    photos: [
      { id: 'photo-4', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800', isCover: true, order: 0 }
    ],
    isPublished: false,
    createdAt: '2026-09-05T10:00:00Z',
    updatedAt: '2026-09-05T10:00:00Z'
  },
  {
    id: 'prop-4',
    code: 'SA-401',
    title: 'Sala Comercial no Harmony Center',
    purpose: 'Aluguel',
    type: 'Sala Comercial',
    status: 'Disponível',
    rentPrice: 3500,
    condoFee: 650,
    iptu: 150,
    address: {
      zipCode: '57035-000',
      state: 'AL',
      city: 'Maceió',
      neighborhood: 'Jatiúca',
      street: 'Rua José Pontes de Magalhães',
      number: '70'
    },
    features: {
      totalArea: 40,
      builtArea: 40,
      bedrooms: 0,
      suites: 0,
      bathrooms: 1,
      parkingSpaces: 1,
      floor: 8
    },
    amenities: {
      hasPool: false,
      hasBalcony: false,
      hasElevator: true,
      hasGym: false,
      hasGourmetArea: false,
      hasConcierge: true,
      isGatedCommunity: false,
      isFurnished: false,
      allowsPets: false,
      hasAirConditioning: true,
      hasSeaView: false,
      others: ['Auditório no prédio', 'Recepção']
    },
    description: 'Sala comercial pronta para escritório ou consultório médico, com piso em porcelanato e ar-condicionado instalado.',
    ownerId: 'owner-3',
    photos: [
      { id: 'photo-5', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', isCover: true, order: 0 }
    ],
    isPublished: true,
    createdAt: '2026-09-06T10:00:00Z',
    updatedAt: '2026-09-06T10:00:00Z'
  },
  {
    id: 'prop-5',
    code: 'AP-102',
    title: 'Apartamento aconchegante para aluguel',
    purpose: 'Aluguel',
    type: 'Apartamento',
    status: 'Alugado',
    rentPrice: 2000,
    condoFee: 400,
    iptu: 100,
    address: {
      zipCode: '57040-000',
      state: 'AL',
      city: 'Maceió',
      neighborhood: 'Farol',
      street: 'Rua Dom Antônio Brandão',
      number: '300'
    },
    features: {
      totalArea: 65,
      builtArea: 65,
      bedrooms: 2,
      suites: 1,
      bathrooms: 2,
      parkingSpaces: 1,
      floor: 2
    },
    amenities: {
      hasPool: true,
      hasBalcony: true,
      hasElevator: true,
      hasGym: false,
      hasGourmetArea: true,
      hasConcierge: true,
      isGatedCommunity: true,
      isFurnished: false,
      allowsPets: true,
      hasAirConditioning: false,
      hasSeaView: false,
      others: []
    },
    description: 'Ótimo apartamento de 2 quartos no Farol. Localização central, perto de hospitais, faculdades e supermercados.',
    ownerId: 'owner-4',
    photos: [
      { id: 'photo-6', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800', isCover: true, order: 0 }
    ],
    isPublished: false,
    createdAt: '2026-09-08T10:00:00Z',
    updatedAt: '2026-09-12T10:00:00Z'
  },
  {
    id: 'prop-6',
    code: 'CA-202',
    title: 'Casa espaçosa com piscina',
    purpose: 'Venda',
    type: 'Casa',
    status: 'Disponível',
    salePrice: 850000,
    iptu: 2000,
    address: {
      zipCode: '57038-000',
      state: 'AL',
      city: 'Maceió',
      neighborhood: 'Serraria',
      street: 'Avenida Menino Marcelo',
      number: '400',
      complement: 'Condomínio San Nicolas'
    },
    features: {
      totalArea: 300,
      builtArea: 200,
      bedrooms: 3,
      suites: 1,
      bathrooms: 3,
      parkingSpaces: 2
    },
    amenities: {
      hasPool: true,
      hasBalcony: true,
      hasElevator: false,
      hasGym: false,
      hasGourmetArea: true,
      hasConcierge: true,
      isGatedCommunity: true,
      isFurnished: false,
      allowsPets: true,
      hasAirConditioning: true,
      hasSeaView: false,
      others: ['Churrasqueira']
    },
    description: 'Linda casa na Serraria com excelente área de lazer privativa.',
    ownerId: 'owner-2',
    photos: [
      { id: 'photo-7', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800', isCover: true, order: 0 }
    ],
    isPublished: true,
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-09-10T10:00:00Z'
  },
  {
    id: 'prop-7',
    code: 'AP-103',
    title: 'Loft mobiliado perto da praia',
    purpose: 'Aluguel',
    type: 'Apartamento',
    status: 'Reservado',
    rentPrice: 4500,
    condoFee: 800,
    iptu: 200,
    address: {
      zipCode: '57035-000',
      state: 'AL',
      city: 'Maceió',
      neighborhood: 'Pajuçara',
      street: 'Rua Doutor Antônio Gouveia',
      number: '10'
    },
    features: {
      totalArea: 45,
      builtArea: 45,
      bedrooms: 1,
      suites: 1,
      bathrooms: 1,
      parkingSpaces: 1,
      floor: 5
    },
    amenities: {
      hasPool: true,
      hasBalcony: true,
      hasElevator: true,
      hasGym: true,
      hasGourmetArea: false,
      hasConcierge: true,
      isGatedCommunity: true,
      isFurnished: true,
      allowsPets: false,
      hasAirConditioning: true,
      hasSeaView: true,
      others: ['Lavanderia no prédio', 'Coworking']
    },
    description: 'Loft espetacular, pronto para morar, ideal para executivos. Decoração assinada.',
    ownerId: 'owner-5',
    photos: [
      { id: 'photo-8', url: 'https://images.unsplash.com/photo-1502672260266-1c1de2d9668f?auto=format&fit=crop&q=80&w=800', isCover: true, order: 0 }
    ],
    isPublished: true,
    createdAt: '2026-09-15T10:00:00Z',
    updatedAt: '2026-09-16T10:00:00Z'
  },
  {
    id: 'prop-8',
    code: 'CB-501',
    title: 'Cobertura Duplex Incrível',
    purpose: 'Venda',
    type: 'Cobertura',
    status: 'Vendido',
    salePrice: 4500000,
    condoFee: 2500,
    iptu: 8000,
    address: {
      zipCode: '57035-000',
      state: 'AL',
      city: 'Maceió',
      neighborhood: 'Ponta Verde',
      street: 'Avenida Álvaro Otacílio',
      number: '999'
    },
    features: {
      totalArea: 350,
      builtArea: 350,
      bedrooms: 4,
      suites: 4,
      bathrooms: 6,
      parkingSpaces: 4,
      floor: 15
    },
    amenities: {
      hasPool: true,
      hasBalcony: true,
      hasElevator: true,
      hasGym: true,
      hasGourmetArea: true,
      hasConcierge: true,
      isGatedCommunity: true,
      isFurnished: false,
      allowsPets: true,
      hasAirConditioning: true,
      hasSeaView: true,
      others: ['Piscina privativa na cobertura', 'Sauna']
    },
    description: 'A melhor cobertura da orla de Maceió. Frente total para o mar, luxo absoluto.',
    ownerId: 'owner-1',
    photos: [
      { id: 'photo-9', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800', isCover: true, order: 0 }
    ],
    isPublished: false,
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-09-15T10:00:00Z'
  }
]

export function updateMockProperty(id: string, updatedData: Partial<Property>) {
  const index = mockProperties.findIndex(p => p.id === id)
  if (index !== -1) {
    mockProperties[index] = { ...mockProperties[index], ...updatedData }
  }
}

export function createMockProperty(newProperty: Property) {
  mockProperties.push(newProperty)
}
