// Firebase Admin initializer.
// Requires GOOGLE_APPLICATION_CREDENTIALS pointing to serviceAccountKey.json,
// or FIREBASE_* env vars. If not configured, exports null so routes can still run in demo mode.

import admin from 'firebase-admin';

let initialized = false;

export function initFirebase() {
  if (initialized) return admin;

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && !process.env.FIREBASE_PROJECT_ID) {
    console.warn('[firebase] No credentials found — running in demo mode (in-memory store).');
    return null;
  }

  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    initialized = true;
    console.log('[firebase] Admin SDK initialized');
    return admin;
  } catch (e) {
    console.error('[firebase] Init failed:', e.message);
    return null;
  }
}

export const db = () => (initialized ? admin.firestore() : null);
export const auth = () => (initialized ? admin.auth() : null);
