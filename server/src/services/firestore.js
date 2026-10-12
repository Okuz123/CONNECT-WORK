import { db } from '../config/firebase.js';

export function hasDb() {
  return db() !== null;
}

export async function listCollection(name, filters = {}) {
  const store = db();
  if (!store) return [];
  let q = store.collection(name);
  for (const [k, v] of Object.entries(filters)) q = q.where(k, '==', v);
  const snap = await q.get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getDoc(name, id) {
  const store = db();
  if (!store) return null;
  const s = await store.collection(name).doc(id).get();
  return s.exists ? { id: s.id, ...s.data() } : null;
}

export async function createDoc(name, data) {
  const store = db();
  if (!store) return { id: String(Date.now()), ...data };
  const ref = await store.collection(name).add({
    ...data,
    createdAt: Date.now(),
  });
  return { id: ref.id, ...data };
}

export async function updateDoc(name, id, patch) {
  const store = db();
  if (!store) return { id, ...patch };
  await store.collection(name).doc(id).update({ ...patch, updatedAt: Date.now() });
  return { id, ...patch };
}
