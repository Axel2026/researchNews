export type ForgotPasswordFormStatus = 'form' | 'sent';

export type ForgotPasswordFormViewProps = {
  status?: ForgotPasswordFormStatus;
  formError?: string | null;
  onFormError?: (message: string | null) => void;
  onSent?: () => void;
};
