export type Role = 'customer' | 'worker' | 'owner' | 'admin'

export interface User {
  id: string
  name: string
  email?: string
  phone?: string
  role: Role
  photoURL?: string
  bio?: string
  skills?: string[]
  city?: string
  verified?: boolean
  createdAt: number
}

export interface Job {
  id: string
  title: string
  description: string
  category: string
  budget?: number
  postedBy: string
  assignedTo?: string
  status: 'open' | 'assigned' | 'closed'
  createdAt: number
}

export interface Application {
  id: string
  jobId: string
  workerId: string
  message: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: number
}

export interface Review {
  id: string
  fromUserId: string
  toUserId: string
  rating: number
  comment: string
  createdAt: number
}
