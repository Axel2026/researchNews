'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import styles from './Dropdown.module.css';

export function Dropdown({
  label,
  triggerClassName,
  panelClassName,
  align = 'end',
  children,
}: {
  label: ReactNode;
  triggerClassName?: string;
  panelClassName?: string;
  align?: 'start' | 'end';
  children: ReactNode;
}) {
  const reactId = useId();
  const buttonId = `${reactId}-button`;
  const listId = `${reactId}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pendingFocus = useRef<'first' | 'last' | null>(null);
  const [open, setOpen] = useState(false);

  function items() {
    return [
      ...(listRef.current?.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])',
      ) ?? []),
    ];
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    const focusTarget = pendingFocus.current;
    const focusable = items();
    if (focusTarget === 'last') {
      focusable[focusable.length - 1]?.focus();
    } else if (focusTarget === 'first') {
      focusable[0]?.focus();
    }
    pendingFocus.current = null;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  function close(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) {
      buttonRef.current?.focus();
    }
  }

  function onButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      pendingFocus.current = event.key === 'ArrowUp' ? 'last' : 'first';
      setOpen(true);
      return;
    }

    if (event.key === 'Escape' && open) {
      event.preventDefault();
      close(true);
    }
  }

  function onListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const focusable = items();
    const index = focusable.findIndex(
      (item) => item === document.activeElement,
    );

    if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusable[0]?.focus();
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusable[focusable.length - 1]?.focus();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusable[(index + 1) % focusable.length]?.focus();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusable[(index - 1 + focusable.length) % focusable.length]?.focus();
    }
  }

  function onBlur(event: FocusEvent<HTMLDivElement>) {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) {
      return;
    }

    setOpen(false);
  }

  return (
    <div className={styles.root} ref={rootRef} onBlur={onBlur}>
      <button
        ref={buttonRef}
        id={buttonId}
        className={triggerClassName}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onButtonKeyDown}
      >
        {label}
      </button>
      <ul
        ref={listRef}
        id={listId}
        className={[
          styles.list,
          align === 'start' ? styles.alignStart : styles.alignEnd,
          panelClassName,
        ]
          .filter(Boolean)
          .join(' ')}
        hidden={!open}
        aria-labelledby={buttonId}
        onKeyDown={onListKeyDown}
      >
        {children}
      </ul>
    </div>
  );
}
