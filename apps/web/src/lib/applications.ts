import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from './firestore';

export interface Application {
  id?: string;
  jobId: string;
  workerName: string;
  workerPhone: string;
  workerUid?: string;
  message: string;
  createdAt: number;
}

export async function applyToJob(app: Application) {
  if (!db) throw new Error('Firestore not configured');
  const ref = await addDoc(collection(db, 'applications'), app);
  return { id: ref.id, ...app };
}

export async function applicationsForJob(jobId: string): Promise<Application[]> {
  if (!db) return [];
  const q = query(
    collection(db, 'applications'),
    where('jobId', '==', jobId),
    orderBy('createdAt', 'desc'),
    limit(100)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}
