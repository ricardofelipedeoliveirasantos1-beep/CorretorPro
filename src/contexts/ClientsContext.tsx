import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { mockClients } from '../mocks/mockClients';

interface ClientsContextData {
  clients: typeof mockClients;
  addClient: (client: typeof mockClients[0]) => void;
  updateClient: (client: typeof mockClients[0]) => void;
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

  return (
    <ClientsContext.Provider value={{ clients, addClient, updateClient }}>
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
