import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Deal } from '../../types/firebase';

const COLLECTION = 'deals';

export async function createDeal(dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deal> {
  const newDealRef = doc(collection(db, COLLECTION));
  const now = new Date().toISOString();
  
  const deal: Deal = {
    ...dealData,
    id: newDealRef.id,
    createdAt: now,
    updatedAt: now,
  };
  
  await setDoc(newDealRef, deal);
  return deal;
}

export async function getDeals(workspaceId: string): Promise<Deal[]> {
  const q = query(collection(db, COLLECTION), where('workspaceId', '==', workspaceId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as Deal);
}

export async function updateDeal(id: string, dealData: Partial<Deal>): Promise<void> {
  const dealRef = doc(db, COLLECTION, id);
  await updateDoc(dealRef, {
    ...dealData,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteDeal(id: string): Promise<void> {
  const dealRef = doc(db, COLLECTION, id);
  await deleteDoc(dealRef);
}
