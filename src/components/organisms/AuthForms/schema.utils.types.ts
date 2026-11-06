import type {
  FieldErrorMessageErrors,
  LoginSchemaMessages,
  PasswordMessages,
  RegisterSchemaMessages,
} from './schema.types';

export type LoginSchemaParams = {
  messages: LoginSchemaMessages;
};

export type RegisterSchemaParams = {
  messages: RegisterSchemaMessages;
};

export type ForgotPasswordSchemaParams = {
  emailInvalid: string;
};

export type ResetPasswordSchemaParams = {
  messages: PasswordMessages;
};

export type FieldErrorMessageParams = {
  errors: FieldErrorMessageErrors;
};
