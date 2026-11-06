import { type ReactNode } from 'react';

export type InfoHintProps = {
  children: ReactNode;
  hint: ReactNode;
  label: string;
  description?: string;
};
