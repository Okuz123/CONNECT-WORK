# Architecture

## Clients
- **Android** — Kotlin + Jetpack Compose
- **Web** — React + Vite + TypeScript
- **PWA** — same build as web, installable on iPhone/Android/tablet

## Backend
- Node.js + Express
- Firebase Admin SDK
- Firestore (primary DB)
- Firebase Auth (Google + Phone OTP)
- Firebase Storage (images, documents)

## Data flow
Client → REST /api/* → Express → Firestore
Auth handled by Firebase client SDK → ID token → server verifies via Admin SDK
