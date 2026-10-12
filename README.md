# CONNECT WORK

> A multi-platform marketplace connecting **skilled workers** with **people who need them**.

[![CI](https://github.com/Okuz123/CONNECT-WORK/actions/workflows/ci.yml/badge.svg)](https://github.com/Okuz123/CONNECT-WORK/actions)

## What is CONNECT WORK?

CONNECT WORK lets:
- **Customers** post jobs and hire verified workers
- **Workers** create profiles, list their skills, and get hired
- **Owners** run their business, manage staff, and take bookings
- **Admins** approve users, moderate content, and view platform analytics

## Structure

| Folder | Purpose |
|--------|---------|
| `apps/android/` | Native Android app (Kotlin + Jetpack Compose) |
| `apps/web/` | Web app + admin dashboard (React + Vite + TS) |
| `apps/mobile-pwa/` | Installable PWA — works on iPhone, Android, tablet |
| `server/` | Node.js + Express + Firebase Admin backend |
| `shared/` | Shared types, constants, validators |
| `docs/` | Architecture, setup, API, roles |
| `design/` | Wireframes, mockups, brand assets |
| `scripts/` | Developer scripts |

## Quick start

```bash
# 1. Install
bash scripts/setup.sh

# 2. Configure
cp .env.example .env
# edit .env with your Firebase keys

# 3. Run
bash scripts/dev.sh
setup
architecture
roles 
api
Licence
MIT - see licence
echo ''REDME.md wriyten''

## 📋 File 3 — `shared/types/index.ts`

```bash
cd ~/CONNECT-WORK
cat > shared/types/index.ts <<'EOF'
// ============================================================
// CONNECT WORK — Shared types
// ============================================================

export type Role = 'customer' | 'worker' | 'owner' | 'admin';

export type JobStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: Role;
  photoURL?: string;
  bio?: string;
  skills?: string[];
  city?: string;
  hourlyRate?: number;
  verified: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: number;
  updatedAt?: number;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  budget?: number;
  currency?: string;
  city?: string;
  postedBy: string;
  assignedTo?: string;
  status: JobStatus;
  scheduledAt?: number;
  createdAt: number;
}

export interface Application {
  id: string;
  jobId: string;
  workerId: string;
  message: string;
  proposedRate?: number;
  status: ApplicationStatus;
  createdAt: number;
}

export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  jobId?: string;
  rating: number;
  comment: string;
  createdAt: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: number;
}
