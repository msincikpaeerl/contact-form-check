export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export type ValidationResult = { ok: true; value: ContactInput } | { ok: false; errors: string[] };

function field(body: unknown, key: string): string {
  if (typeof body !== 'object' || body === null) return '';
  const value = (body as Record<string, unknown>)[key];
  return typeof value === 'string' ? value.trim() : '';
}

/** Checks what the contact form sent: all three fields are required, the e-mail must look valid. */
export function validateContact(body: unknown): ValidationResult {
  const value = {
    name: field(body, 'name'),
    email: field(body, 'email'),
    message: field(body, 'message'),
  };
  const errors: string[] = [];
  if (!value.name) errors.push('Please enter your name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
    errors.push('Please enter a valid e-mail address.');
  }
  if (!value.message) errors.push('Please enter a message.');
  return errors.length > 0 ? { ok: false, errors } : { ok: true, value };
}
