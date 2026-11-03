import { z } from 'zod';

const minPasswordLength = 8;

type PasswordMessages = {
  passwordShort: string;
  passwordMismatch: string;
};

export function loginSchema(messages: {
  emailInvalid: string;
  passwordShort: string;
}) {
  return z.object({
    email: z.email({ error: messages.emailInvalid }),
    password: z
      .string()
      .min(minPasswordLength, { error: messages.passwordShort }),
    confirmPassword: z.string(),
  });
}

export function registerSchema(
  messages: PasswordMessages & { emailInvalid: string },
) {
  return z
    .object({
      email: z.email({ error: messages.emailInvalid }),
      password: z
        .string()
        .min(minPasswordLength, { error: messages.passwordShort }),
      confirmPassword: z
        .string()
        .min(minPasswordLength, { error: messages.passwordShort }),
    })
    .refine((value) => value.password === value.confirmPassword, {
      path: ['confirmPassword'],
      error: messages.passwordMismatch,
    });
}

export function forgotPasswordSchema(emailInvalid: string) {
  return z.object({
    email: z.email({ error: emailInvalid }),
  });
}

export function resetPasswordSchema(messages: PasswordMessages) {
  return z
    .object({
      password: z
        .string()
        .min(minPasswordLength, { error: messages.passwordShort }),
      confirmPassword: z
        .string()
        .min(minPasswordLength, { error: messages.passwordShort }),
    })
    .refine((value) => value.password === value.confirmPassword, {
      path: ['confirmPassword'],
      error: messages.passwordMismatch,
    });
}

export function fieldErrorMessage(
  errors: ReadonlyArray<{ message?: string } | undefined>,
) {
  for (const error of errors) {
    if (error?.message) {
      return error.message;
    }
  }

  return undefined;
}
