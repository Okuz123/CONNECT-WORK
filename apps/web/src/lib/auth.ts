import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPopup,
  signInWithPhoneNumber,
  signOut as fbSignOut,
  type ConfirmationResult,
} from 'firebase/auth';
import { auth } from './firebase';

let confirmation: ConfirmationResult | null = null;

export async function signInWithGoogle() {
  if (!auth) throw new Error('Firebase not configured');
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export function setupRecaptcha(containerId: string) {
  if (!auth) throw new Error('Firebase not configured');
  return new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
}

export async function sendOtp(phone: string, containerId = 'recaptcha-container') {
  if (!auth) throw new Error('Firebase not configured');
  const verifier = setupRecaptcha(containerId);
  confirmation = await signInWithPhoneNumber(auth, phone, verifier);
  return confirmation;
}

export async function verifyOtp(otp: string) {
  if (!confirmation) throw new Error('No OTP request in progress');
  const result = await confirmation.confirm(otp);
  return result.user;
}

export async function signOut() {
  if (!auth) return;
  await fbSignOut(auth);
}

export function currentUser() {
  return auth?.currentUser ?? null;
}
