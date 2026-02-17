export type ValidationErrors = Record<string, string>;

export function validateRequired(value: unknown): string | null {
  if (value === null || value === undefined) return 'This field is required.';
  if (typeof value === 'string' && value.trim().length === 0) return 'This field is required.';
  return null;
}

export function validateMinLength(value: unknown, min: number): string | null {
  if (value === null || value === undefined) return null;
  const str = String(value);
  if (str.length < min) return `Minimum length is ${min}.`;
  return null;
}

export function validateEmail(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  if (str.length === 0) return null;
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  return ok ? null : 'Please enter a valid email address.';
}
