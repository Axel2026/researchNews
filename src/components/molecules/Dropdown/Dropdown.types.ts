import { type ReactNode } from 'react';

export type DropdownProps = {
  label: ReactNode;
  children: ReactNode;
  triggerClassName?: string;
  panelClassName?: string;
  rootClassName?: string;
  align?: 'start' | 'end';
  ariaLabel?: string;
  icon?: boolean;
  size?: 'default' | 'compact';
  mobileAsModal?: boolean;
  title?: string;
  closeLabel?: string;
};
