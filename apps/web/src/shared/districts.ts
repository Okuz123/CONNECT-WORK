export const DISTRICTS = {
  Anantnag: [
    'Achabal', 'Anantnag', 'Bijbehara', 'Breng', 'Chattergul',
    'Dachnipora', 'Dooru', 'Hardu-Punzoo', 'Kavarigam', 'Khisrowpora',
    'Kokernag', 'Kulgam', 'Larnoo', 'Mattan', 'Pahalgam',
    'Qazigund', 'Shahabad', 'Shangus', 'Srigufwara', 'Vessu',
  ],
  Kulgam: [
    'Aharbal', 'Behibagh', 'D.H.Pora', 'Devsar', 'Frisal',
    'Kulgam', 'Manzgam', 'Pahloo', 'Pombay', 'Qaimoh',
    'Qazigund', 'Yaripora',
  ],
} as const;

export const CATEGORIES = [
  'Plumber', 'Electrician', 'Carpenter', 'Mason', 'Painter',
  'Welder', 'Driver', 'Cleaner', 'Cook', 'Tailor',
  'Farmer', 'Gardener', 'Security Guard', 'Tutor', 'Beautician',
  'Delivery', 'Helper', 'Other',
] as const;

export type District = keyof typeof DISTRICTS;
export type Category = typeof CATEGORIES[number];

export interface WorkerProfile {
  uid: string;
  name: string;
  phone: string;
  category: Category | string;
  district: District | string;
  block: string;
  experienceYears: number;
  dailyWage: number;
  bio: string;
  photoURL?: string;
  createdAt: number;
}
