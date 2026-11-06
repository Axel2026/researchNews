import { type ReactNode } from 'react';

export type ConfirmModalProps = {
  open: boolean;
  title: string;
  closeLabel: string;
  cancelLabel: string;
  confirmLabel: string;
  busy?: boolean;
  error?: string | null;
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
};
