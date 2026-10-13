import { collection, addDoc, getDocs, deleteDoc, doc, query, where, limit } from 'firebase/firestore';
import { db } from './firestore';

export interface Manager {
  id?: string;
  name: string;
  phone: string;
  district: string;
  blocks: string[];
  createdAt: number;
}

export async function addManager(m: Manager) {
  if (!db) throw new Error('Firestore not configured');
  const ref = await addDoc(collection(db, 'managers'), m);
  return { id: ref.id, ...m };
}

export async function listManagers(): Promise<Manager[]> {
  if (!db) return [];
  const snap = await getDocs(collection(db, 'managers'));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function removeManager(id: string) {
  if (!db) return;
  await deleteDoc(doc(db, 'managers', id));
}

export async function listWorkersByBlock(district: string, block: string) {
  if (!db) return [];
  const q = query(
    collection(db, 'workers'),
    where('district', '==', district),
    where('block', '==', block),
    limit(200)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}
