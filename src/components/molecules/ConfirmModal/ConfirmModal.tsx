'use client';
import { useId } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Modal } from '@/components/atoms/Modal/Modal';
import styles from './ConfirmModal.module.css';
import type { ConfirmModalProps } from './ConfirmModal.types';

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
}: ConfirmModalProps) {
  const descriptionId = useId();
  const confirmBusy = busy || undefined;

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
        <Button disabled={busy} aria-busy={confirmBusy} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
