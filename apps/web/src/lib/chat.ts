import {
  collection, addDoc, query, where, orderBy,
  onSnapshot, serverTimestamp, limit,
} from 'firebase/firestore';
import { db } from './firestore';

export interface Message {
  id?: string;
  chatId: string;
  from: string;
  text: string;
  createdAt: number;
}

export interface Chat {
  id?: string;
  participants: string[];
  names: string[];
  lastMessage: string;
  createdAt: number;
  updatedAt: number;
}

/** Create a chat between two users (idempotent-ish — checks first). */
export async function ensureChat(
  aId: string, aName: string,
  bId: string, bName: string
): Promise<string> {
  if (!db) throw new Error('Firestore not configured');
  const key = [aId, bId].sort().join('__');
  const q = query(collection(db, 'chats'), where('participants', '==', [aId, bId].sort()));
  const existing = await new Promise<any[]>((res) => {
    const unsub = onSnapshot(q, (snap) => {
      res(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      unsub();
    });
  });
  if (existing.length > 0) return existing[0].id;

  const ref = await addDoc(collection(db, 'chats'), {
    participants: [aId, bId].sort(),
    names: [aName, bName],
    lastMessage: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    key,
  });
  return ref.id;
}

export async function sendMessage(chatId: string, from: string, text: string) {
  if (!db) throw new Error('Firestore not configured');
  await addDoc(collection(db, 'chats', chatId, 'messages'), {
    chatId, from, text, createdAt: Date.now(),
  });
}

export function subscribeMessages(
  chatId: string,
  cb: (msgs: Message[]) => void
): () => void {
  if (!db) return () => {};
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('createdAt', 'asc'),
    limit(200)
  );
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
  });
}
