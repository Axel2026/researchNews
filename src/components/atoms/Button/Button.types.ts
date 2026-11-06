import type { ComponentProps, ReactNode } from 'react';

import { Link } from '@/i18n/navigation';

export type AppHref = ComponentProps<typeof Link>['href'];

export type ButtonVariant = 'primary' | 'secondary';

export type CommonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

export type ButtonAsLink = CommonProps & {
  href: AppHref;
  newWindowHint?: string;
};

export type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  'aria-pressed'?: boolean;
  'aria-busy'?: boolean;
};

export type ButtonProps = ButtonAsLink | ButtonAsButton;
