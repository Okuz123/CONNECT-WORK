import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firestore';
import type { WorkerProfile } from '../shared/districts';

export async function saveWorkerProfile(profile: WorkerProfile) {
  if (!db) throw new Error('Firestore not configured');
  const ref = await addDoc(collection(db, 'workers'), profile);
  return { id: ref.id, ...profile };
}

export async function listWorkers(max = 50): Promise<WorkerProfile[]> {
  if (!db) return [];
  const q = query(collection(db, 'workers'), orderBy('createdAt', 'desc'), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ uid: d.id, ...(d.data() as any) })) as WorkerProfile[];
}
