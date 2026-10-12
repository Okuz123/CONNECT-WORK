// ============================================================
// CONNECT WORK — Validators
// ============================================================

export const isPhone = (s: string): boolean => /^\+?[0-9]{7,15}$/.test(s);

export const isEmail = (s: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export const isNonEmpty = (s: string): boolean => s.trim().length > 0;

export const isRating = (n: number): boolean => n >= 1 && n <= 5;

export const isBudget = (n: number): boolean => n >= 0 && n < 10_000_000;

export const isFutureDate = (t: number): boolean => t > Date.now();

export const minLen = (s: string, n: number): boolean => s.trim().length >= n;

export const maxLen = (s: string, n: number): boolean => s.trim().length <= n;

export const validateJob = (j: { title: string; description: string; category: string }) => {
  const errors: string[] = [];
  if (!minLen(j.title, 3)) errors.push('Title must be at least 3 characters');
  if (!minLen(j.description, 10)) errors.push('Description must be at least 10 characters');
  if (!isNonEmpty(j.category)) errors.push('Category is required');
  return errors;
};
