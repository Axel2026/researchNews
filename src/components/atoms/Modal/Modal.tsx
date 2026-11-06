'use client';
import {
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import type { ModalProps } from './Modal.types';
import { subscribeNever } from './Modal.utils';

export function Modal({
  id,
  open,
  onClose,
  title,
  closeLabel,
  describedBy,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [mounted, open]);

  function onBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  if (!mounted) {
    return null;
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      id={id}
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={describedBy}
      aria-modal="true"
      onClose={onClose}
      onClick={onBackdropClick}
    >
      <div className={styles.panel}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        <button
          className={styles.close}
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M3.2 3.2 12.8 12.8M12.8 3.2 3.2 12.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {children}
      </div>
    </dialog>,
    document.body,
  );
}
