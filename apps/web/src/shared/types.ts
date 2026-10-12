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
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  budget?: number;
  city?: string;
  postedBy: string;
  assignedTo?: string;
  status: JobStatus;
  createdAt: number;
}

export interface Application {
  id: string;
  jobId: string;
  workerId: string;
  message: string;
  status: ApplicationStatus;
  createdAt: number;
}
