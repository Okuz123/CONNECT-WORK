import {
  GoogleAuthProvider, RecaptchaVerifier,
  signInWithPopup, signInWithPhoneNumber,
  signOut as fbSignOut, type ConfirmationResult,
} from 'firebase/auth';
import { auth } from './firebase';

let confirmation: ConfirmationResult | null = null;
let verifier: RecaptchaVerifier | null = null;

export async function signInWithGoogle() {
  if (!auth) throw new Error('Firebase not configured');
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export function getRecaptcha(containerId = 'recaptcha-container') {
  if (!auth) throw new Error('Firebase not configured');
  if (!verifier) {
    verifier = new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
  }
  return verifier;
}

export async function sendOtp(phone: string) {
  if (!auth) throw new Error('Firebase not configured');
  confirmation = await signInWithPhoneNumber(auth, phone, getRecaptcha());
  return confirmation;
}

export async function verifyOtp(otp: string) {
  if (!confirmation) throw new Error('No OTP request in progress');
  const result = await confirmation.confirm(otp);
  return result.user;
}

export async function signOut() {
  if (!auth) return;
  if (verifier) { verifier.clear(); verifier = null; }
  await fbSignOut(auth);
}

export function currentUser() {
  return auth?.currentUser ?? null;
}
