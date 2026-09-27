import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Appointment } from '../../types/firebase';

const COLLECTION = 'appointments';

export async function createAppointment(appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
  const newAppointmentRef = doc(collection(db, COLLECTION));
  const now = new Date().toISOString();
  
  const appointment: Appointment = {
    ...appointmentData,
    id: newAppointmentRef.id,
    createdAt: now,
    updatedAt: now,
  };
  
  await setDoc(newAppointmentRef, appointment);
  return appointment;
}

export async function getAppointments(workspaceId: string): Promise<Appointment[]> {
  const q = query(collection(db, COLLECTION), where('workspaceId', '==', workspaceId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as Appointment);
}

export async function updateAppointment(id: string, appointmentData: Partial<Appointment>): Promise<void> {
  const appointmentRef = doc(db, COLLECTION, id);
  await updateDoc(appointmentRef, {
    ...appointmentData,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteAppointment(id: string): Promise<void> {
  const appointmentRef = doc(db, COLLECTION, id);
  await deleteDoc(appointmentRef);
}
