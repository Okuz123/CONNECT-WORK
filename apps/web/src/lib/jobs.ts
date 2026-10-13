import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firestore';

export interface JobPost {
  id?: string;
  title: string;
  description: string;
  category: string;
  district: string;
  block: string;
  dailyWage: number;
  days: number;
  contactName: string;
  contactPhone: string;
  createdAt: number;
}

export async function postJob(job: JobPost) {
  if (!db) throw new Error('Firestore not configured');
  const ref = await addDoc(collection(db, 'jobs'), job);
  return { id: ref.id, ...job };
}

export async function listJobs(max = 50): Promise<JobPost[]> {
  if (!db) return [];
  const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
}
