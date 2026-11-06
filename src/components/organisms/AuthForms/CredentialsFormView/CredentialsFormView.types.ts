export type CredentialsMode = 'login' | 'register';

export type CredentialsFormStatus = 'form' | 'checkEmail' | 'redirecting';

export type CredentialsFormViewProps = {
  mode: CredentialsMode;
  status?: CredentialsFormStatus;
  nextHref?: string;
  callbackFailed?: boolean;
  formError?: string | null;
  googlePending?: boolean;
  onGoogle?: () => void;
  onSubmitSuccess?: () => void;
  onCheckEmail?: () => void;
  onFormError?: (message: string | null) => void;
};
