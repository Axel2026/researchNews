import { z } from 'zod';
import type {
  PasswordMessages,
  LoginSchemaMessages,
  RegisterSchemaMessages,
  FieldErrorMessageErrors,
} from './schema.types';

const minPasswordLength = 8;

export function loginSchema(messages: LoginSchemaMessages) {
  return z.object({
    email: z.email({ error: messages.emailInvalid }),
    password: z
      .string()
      .min(minPasswordLength, { error: messages.passwordShort }),
    confirmPassword: z.string(),
  });
}

export function registerSchema(messages: RegisterSchemaMessages) {
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

export function fieldErrorMessage(errors: FieldErrorMessageErrors) {
  for (const error of errors) {
    if (error?.message) {
      return error.message;
    }
  }

  return undefined;
}
