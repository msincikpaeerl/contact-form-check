import { describe, expect, it } from 'vitest';
import { validateContact } from '../../src/validation.js';

describe('validateContact', () => {
  it('accepts a complete form and trims values', () => {
    const result = validateContact({ name: ' Ann ', email: 'ann@example.com', message: 'Hi' });
    expect(result).toEqual({
      ok: true,
      value: { name: 'Ann', email: 'ann@example.com', message: 'Hi' },
    });
  });

  it('rejects missing fields and bad e-mail', () => {
    const result = validateContact({ email: 'nope' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toHaveLength(3);
  });

  it('rejects a body that is not an object', () => {
    expect(validateContact(undefined).ok).toBe(false);
  });
});
