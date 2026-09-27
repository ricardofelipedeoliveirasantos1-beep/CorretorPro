import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Commission } from '../../types/firebase';

const COLLECTION = 'commissions';

export async function createCommission(commissionData: Omit<Commission, 'id' | 'createdAt' | 'updatedAt'>): Promise<Commission> {
  const newCommissionRef = doc(collection(db, COLLECTION));
  const now = new Date().toISOString();
  
  const commission: Commission = {
    ...commissionData,
    id: newCommissionRef.id,
    createdAt: now,
    updatedAt: now,
  };
  
  await setDoc(newCommissionRef, commission);
  return commission;
}

export async function getCommissions(workspaceId: string): Promise<Commission[]> {
  const q = query(collection(db, COLLECTION), where('workspaceId', '==', workspaceId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as Commission);
}

export async function updateCommission(id: string, commissionData: Partial<Commission>): Promise<void> {
  const commissionRef = doc(db, COLLECTION, id);
  await updateDoc(commissionRef, {
    ...commissionData,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteCommission(id: string): Promise<void> {
  const commissionRef = doc(db, COLLECTION, id);
  await deleteDoc(commissionRef);
}
