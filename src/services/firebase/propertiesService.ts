import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Property } from '../../types/firebase';

const COLLECTION = 'properties';

export async function createProperty(propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
  const newPropertyRef = doc(collection(db, COLLECTION));
  const now = new Date().toISOString();
  
  const property: Property = {
    ...propertyData,
    id: newPropertyRef.id,
    createdAt: now,
    updatedAt: now,
  };
  
  await setDoc(newPropertyRef, property);
  return property;
}

export async function getProperties(workspaceId: string): Promise<Property[]> {
  const q = query(collection(db, COLLECTION), where('workspaceId', '==', workspaceId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as Property);
}

export async function updateProperty(id: string, propertyData: Partial<Property>): Promise<void> {
  const propertyRef = doc(db, COLLECTION, id);
  await updateDoc(propertyRef, {
    ...propertyData,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteProperty(id: string): Promise<void> {
  const propertyRef = doc(db, COLLECTION, id);
  await deleteDoc(propertyRef);
}
