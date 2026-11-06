export type AuthErrorKey =
  | 'invalidCredentials'
  | 'emailNotConfirmed'
  | 'userExists'
  | 'weakPassword'
  | 'rateLimit'
  | 'genericError';

export type AuthErrorKeyParams = {
  code: string | undefined;
};
