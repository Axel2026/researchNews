export type DebounceCallback<Args extends readonly unknown[]> = (
  ...args: Args
) => void;

export type DebounceParams<Args extends readonly unknown[]> = {
  delay: number;
  callback: DebounceCallback<Args>;
};

export type Debounced<Args extends readonly unknown[]> =
  DebounceCallback<Args> & {
    cancel: () => void;
  };
