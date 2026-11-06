export type SafeNextPathParams = {
  value: string | null;
  fallback?: string;
};

export type AuthCallbackUrlParams = {
  nextPath: string;
  loginPath: string;
};

export type LoginHrefParams = {
  nextPath: string;
};
