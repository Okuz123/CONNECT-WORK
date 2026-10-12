# CONNECT WORK — Setup

## Prerequisites
- Node.js 20+
- npm or pnpm
- (Android) Android Studio or GitHub Actions

## Web
cd apps/webs
npm install
npm run dev

## Server

## Android
Open `apps/android/` in Android Studio, or let GitHub Actions build the APK.

## Firebase
Create a project at https://console.firebase.google.com
Enable: Authentication (Google + Phone), Firestore, Storage.
Download `google-services.json` → place in `apps/android/app/`.
