const authErrorKeys = {
  invalid_credentials: 'invalidCredentials',
  email_not_confirmed: 'emailNotConfirmed',
  user_already_exists: 'userExists',
  email_exists: 'userExists',
  weak_password: 'weakPassword',
  over_request_rate_limit: 'rateLimit',
  over_email_send_rate_limit: 'rateLimit',
} as const;

export type AuthErrorKey =
  (typeof authErrorKeys)[keyof typeof authErrorKeys] | 'genericError';

export function authErrorKey(code: string | undefined): AuthErrorKey {
  if (code && code in authErrorKeys) {
    return authErrorKeys[code as keyof typeof authErrorKeys];
  }

  return 'genericError';
}
