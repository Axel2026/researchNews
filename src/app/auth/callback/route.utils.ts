import type { FailureUrlParams } from './route.utils.types';
export function failureUrl({ origin, login }: FailureUrlParams) {
  const target = new URL(login, origin);
  target.searchParams.set('error', 'auth');
  return target;
}
