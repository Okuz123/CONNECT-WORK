export const APP_NAME = 'CONNECT WORK';
export const APP_VERSION = '0.1.0';

export const CATEGORIES = [
  'Plumbing','Electrical','Carpentry','Painting','Cleaning',
  'Tutoring','Driving','Cooking','Tailoring','Mechanic',
  'Salon','Delivery','Security','Gardening','Moving',
  'IT & Tech','Other',
] as const;

export type Category = typeof CATEGORIES[number];

export const ROLES = ['customer', 'worker', 'owner', 'admin'] as const;
export const JOB_STATUS = ['open', 'assigned', 'in_progress', 'completed', 'cancelled'] as const;
export const APPLICATION_STATUS = ['pending', 'accepted', 'rejected'] as const;
export const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'] as const;
export const DEFAULT_CURRENCY = 'INR';

export const CITIES = [
  'Mumbai','Delhi','Bengaluru','Hyderabad','Chennai',
  'Kolkata','Pune','Ahmedabad','Jaipur','Other',
] as const;
