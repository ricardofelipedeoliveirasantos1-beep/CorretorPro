import { type Owner } from '../types/owner'

// TEMPORÁRIO — substituir por Supabase na fase de integração.

export const mockOwners: Owner[] = [
  {
    id: 'owner-1',
    firstName: 'Carlos',
    lastName: 'Ferreira',
    whatsapp: '(82) 99999-9999',
    phone: '(82) 99999-9999',
    email: 'carlos@email.com',
    cpf: '111.222.333-44',
    notes: 'Cliente investidor de alto padrão.',
    createdAt: '2026-09-01T10:00:00Z',
    propertyCount: 3
  },
  {
    id: 'owner-2',
    firstName: 'Mariana',
    lastName: 'Souza',
    whatsapp: '(82) 98888-8888',
    phone: '(82) 3333-3333',
    email: 'mariana.souza@email.com',
    cpf: '222.333.444-55',
    notes: 'Procura permuta em imóveis menores.',
    createdAt: '2026-09-05T14:30:00Z',
    propertyCount: 1
  },
  {
    id: 'owner-3',
    firstName: 'Roberto',
    lastName: 'Alves',
    whatsapp: '(82) 97777-7777',
    phone: '',
    email: 'roberto.alves@email.com',
    cpf: '333.444.555-66',
    notes: 'Construtora parceira.',
    createdAt: '2026-09-10T09:15:00Z',
    propertyCount: 5
  },
  {
    id: 'owner-4',
    firstName: 'Fernanda',
    lastName: 'Lima',
    whatsapp: '(82) 96666-6666',
    phone: '(82) 96666-6666',
    email: 'fernanda.lima@email.com',
    cpf: '444.555.666-77',
    notes: 'Quer alugar rápido.',
    createdAt: '2026-09-12T16:45:00Z',
    propertyCount: 2
  },
  {
    id: 'owner-5',
    firstName: 'João',
    lastName: 'Batista',
    whatsapp: '(82) 95555-5555',
    phone: '',
    email: 'joao.batista@email.com',
    cpf: '555.666.777-88',
    notes: '',
    createdAt: '2026-09-15T11:20:00Z',
    propertyCount: 1
  }
]
