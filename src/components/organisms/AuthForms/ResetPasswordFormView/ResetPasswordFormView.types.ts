export type ResetPasswordFormStatus =
  'loading' | 'missing' | 'form' | 'updated';

export type ResetPasswordFormViewProps = {
  status: ResetPasswordFormStatus;
  formError?: string | null;
  onFormError?: (message: string | null) => void;
  onUpdated?: () => void;
};
