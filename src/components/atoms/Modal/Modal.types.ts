import { type ReactNode } from 'react';

export type ModalProps = {
  id?: string;
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  describedBy?: string;
  children: ReactNode;
};
