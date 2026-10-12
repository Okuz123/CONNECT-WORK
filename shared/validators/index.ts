export const isPhone = (s: string) => /^\+?[0-9]{7,15}$/.test(s)
export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
export const isNonEmpty = (s: string) => s.trim().length > 0
export const isRating = (n: number) => n >= 1 && n <= 5
