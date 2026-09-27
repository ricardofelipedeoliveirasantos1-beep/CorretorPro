import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { mockClients } from '../mocks/mockClients';

interface ClientsContextData {
  clients: typeof mockClients;
  addClient: (client: typeof mockClients[0]) => void;
  updateClient: (client: typeof mockClients[0]) => void;
  deleteClient: (clientId: number) => { success: boolean, message?: string };
}

const ClientsContext = createContext<ClientsContextData>({} as ClientsContextData);

export function ClientsProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<typeof mockClients>(() => {
    const saved = localStorage.getItem('corretorpro_clients');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const validClients = parsed.filter(c => c && typeof c === 'object' && 'id' in c);
          if (validClients.length > 0) return validClients;
        }
      } catch (e) {
        return mockClients;
      }
    }
    return mockClients;
  });

  const addClient = (client: typeof mockClients[0]) => {
    setClients(prev => {
      const updated = [client, ...prev];
      localStorage.setItem('corretorpro_clients', JSON.stringify(updated));
      return updated;
    });
  };

  const updateClient = (updatedClient: typeof mockClients[0]) => {
    setClients(prev => {
      const updated = prev.map(c => c.id === updatedClient.id ? updatedClient : c);
      localStorage.setItem('corretorpro_clients', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteClient = (clientId: number) => {
    const savedDeals = localStorage.getItem('corretorpro_deals');
    if (savedDeals) {
      try {
        const deals = JSON.parse(savedDeals);
        if (Array.isArray(deals) && deals.some(d => d.clientId === clientId)) {
          return { success: false, message: 'Este cliente possui negócios vinculados e não pode ser excluído enquanto esses registros existirem.' };
        }
      } catch (e) {
        // ignore parse error
      }
    }
    
    setClients(prev => {
      const updated = prev.filter(c => c.id !== clientId);
      localStorage.setItem('corretorpro_clients', JSON.stringify(updated));
      return updated;
    });
    
    return { success: true };
  };

  return (
    <ClientsContext.Provider value={{ clients, addClient, updateClient, deleteClient }}>
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error('useClients must be used within a ClientsProvider');
  }
  return context;
}
