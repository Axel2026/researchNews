import { z } from 'zod';
import type {
  LoginSchemaParams,
  RegisterSchemaParams,
  ForgotPasswordSchemaParams,
  ResetPasswordSchemaParams,
  FieldErrorMessageParams,
} from './schema.utils.types';

const minPasswordLength = 8;

export function loginSchema({ messages }: LoginSchemaParams) {
  return z.object({
    email: z.email({ error: messages.emailInvalid }),
    password: z
      .string()
      .min(minPasswordLength, { error: messages.passwordShort }),
    confirmPassword: z.string(),
  });
}

export function registerSchema({ messages }: RegisterSchemaParams) {
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

export function forgotPasswordSchema({
  emailInvalid,
}: ForgotPasswordSchemaParams) {
  return z.object({
    email: z.email({ error: emailInvalid }),
  });
}

export function resetPasswordSchema({ messages }: ResetPasswordSchemaParams) {
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

export function fieldErrorMessage({ errors }: FieldErrorMessageParams) {
  for (const error of errors) {
    if (error?.message) {
      return error.message;
    }
  }

  return undefined;
}
