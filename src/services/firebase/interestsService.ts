import { collection, doc, setDoc, getDocs, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Interest } from '../../types/firebase';

const COLLECTION = 'interests';

export async function createInterest(interestData: Omit<Interest, 'id' | 'createdAt'>): Promise<Interest> {
  const newInterestRef = doc(collection(db, COLLECTION));
  
  const interest: Interest = {
    ...interestData,
    id: newInterestRef.id,
    createdAt: new Date().toISOString(),
  };
  
  await setDoc(newInterestRef, interest);
  return interest;
}

export async function getInterests(workspaceId: string): Promise<Interest[]> {
  const q = query(collection(db, COLLECTION), where('workspaceId', '==', workspaceId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as Interest);
}

export async function updateInterest(id: string, interestData: Partial<Interest>): Promise<void> {
  const interestRef = doc(db, COLLECTION, id);
  await updateDoc(interestRef, interestData);
}
