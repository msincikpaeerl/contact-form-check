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
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual(['email', 'message', 'name']);
      expect(result.errors.email).toBe('Please enter a valid e-mail address.');
    }
  });

  it('asks for the e-mail when it is empty', () => {
    const result = validateContact({ name: 'A', email: '', message: 'B' });
    expect(result).toEqual({ ok: false, errors: { email: 'Please enter your e-mail address.' } });
  });

  it('rejects a body that is not an object', () => {
    expect(validateContact(undefined).ok).toBe(false);
  });
});
