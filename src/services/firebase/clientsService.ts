import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Client } from '../../types/firebase';

const COLLECTION = 'clients';

export async function createClient(clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
  const newClientRef = doc(collection(db, COLLECTION));
  const now = new Date().toISOString();
  
  const client: Client = {
    ...clientData,
    id: newClientRef.id,
    createdAt: now,
    updatedAt: now,
  };
  
  await setDoc(newClientRef, client);
  return client;
}

export async function getClients(workspaceId: string): Promise<Client[]> {
  const q = query(collection(db, COLLECTION), where('workspaceId', '==', workspaceId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as Client);
}

export async function updateClient(id: string, clientData: Omit<Partial<Client>, 'workspaceId'>): Promise<void> {
  const clientRef = doc(db, COLLECTION, id);
  const safeData = { ...clientData } as any;
  delete safeData.workspaceId;
  await updateDoc(clientRef, {
    ...safeData,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteClient(id: string): Promise<void> {
  const clientRef = doc(db, COLLECTION, id);
  await deleteDoc(clientRef);
}
