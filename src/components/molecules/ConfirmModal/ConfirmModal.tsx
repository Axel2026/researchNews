'use client';

import { useId, type ReactNode } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Modal } from '@/components/atoms/Modal/Modal';
import styles from './ConfirmModal.module.css';

export function ConfirmModal({
  open,
  title,
  closeLabel,
  cancelLabel,
  confirmLabel,
  busy = false,
  error = null,
  onClose,
  onConfirm,
  children,
}: {
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
}) {
  const descriptionId = useId();

  return (
    <Modal
      open={open}
      title={title}
      closeLabel={closeLabel}
      describedBy={descriptionId}
      onClose={onClose}
    >
      <p id={descriptionId} className={styles.body}>
        {children}
      </p>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      <div className={styles.actions}>
        <Button variant="secondary" disabled={busy} onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          disabled={busy}
          aria-busy={busy || undefined}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
