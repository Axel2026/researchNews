import { type InputHTMLAttributes, type ReactNode } from 'react';

export type InputProps = {
  label: string;
  error?: string;
  action?: ReactNode;
  describedBy?: string;
  invalid?: boolean;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id'> & {
    id?: string;
  };
