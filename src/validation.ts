export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

/** One error message per field that is wrong. */
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ValidationResult =
  { ok: true; value: ContactInput } | { ok: false; errors: FieldErrors };

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
  const errors: FieldErrors = {};
  if (!value.name) errors.name = 'Please enter your name.';
  if (!value.email) {
    errors.email = 'Please enter your e-mail address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
    errors.email = 'Please enter a valid e-mail address.';
  }
  if (!value.message) errors.message = 'Please enter a message.';
  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, value };
}
