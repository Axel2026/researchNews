import { expect, it } from 'vitest';
import { loginSchema, registerSchema } from './schema.utils';

const messages = {
  emailInvalid: 'Enter a valid email address.',
  passwordShort: 'The password must be at least 8 characters.',
  passwordMismatch: 'The passwords do not match.',
};

it('rejects a login with an invalid email', () => {
  const result = loginSchema({ messages }).safeParse({
    email: 'not-an-email',
    password: 'longenough',
    confirmPassword: '',
  });

  expect(result.success).toBe(false);
  expect(result.error?.issues).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ message: messages.emailInvalid }),
    ]),
  );
});

it('accepts a login with a valid email and password', () => {
  const result = loginSchema({ messages }).safeParse({
    email: 'ada@example.com',
    password: 'longenough',
    confirmPassword: '',
  });

  expect(result.success).toBe(true);
});

it('rejects registration when the passwords differ', () => {
  const result = registerSchema({ messages }).safeParse({
    email: 'ada@example.com',
    password: 'longenough',
    confirmPassword: 'different1',
  });

  expect(result.success).toBe(false);
  expect(result.error?.issues).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        message: messages.passwordMismatch,
        path: ['confirmPassword'],
      }),
    ]),
  );
});
