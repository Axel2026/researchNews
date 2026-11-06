export type PasswordMessages = {
  passwordShort: string;
  passwordMismatch: string;
};

export type LoginSchemaMessages = {
  emailInvalid: string;
  passwordShort: string;
};

export type RegisterSchemaMessages = PasswordMessages & {
  emailInvalid: string;
};

export type FieldErrorMessageErrors = ReadonlyArray<
  { message?: string } | undefined
>;
