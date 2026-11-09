import type { DebounceParams, Debounced } from './debounce.types';

/**
 * Calls `callback` once `delay` ms pass with no further call.
 * `cancel` drops a pending run.
 */
export function debounce<Args extends readonly unknown[]>({
  delay,
  callback,
}: DebounceParams<Args>): Debounced<Args> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Args) => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = undefined;
      callback(...args);
    }, delay);
  };

  return Object.assign(debounced, {
    cancel() {
      if (timer === undefined) {
        return;
      }

      clearTimeout(timer);
      timer = undefined;
    },
  });
}
