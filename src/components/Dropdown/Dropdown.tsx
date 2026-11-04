'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { Modal } from '@/components/Modal/Modal';
import styles from './Dropdown.module.css';

const mobileQuery = '(max-width: 40rem)';

function subscribeMobile(onChange: () => void) {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function subscribeNoop() {
  return () => {};
}

function isMobile() {
  return window.matchMedia(mobileQuery).matches;
}

function notMobile() {
  return false;
}

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

export function Dropdown(props: DropdownProps) {
  const {
    label,
    triggerClassName,
    panelClassName,
    rootClassName,
    align = 'end',
    ariaLabel,
    icon = false,
    size = 'default',
    children,
  } = props;
  const mobileAsModal = Boolean(props.mobileAsModal);
  const title = props.title;
  const closeLabel = props.closeLabel;
  const reactId = useId();
  const buttonId = `${reactId}-button`;
  const listId = `${reactId}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pendingFocus = useRef<'first' | 'last' | null>(null);
  const [open, setOpen] = useState(false);
  const mobile = useSyncExternalStore(
    mobileAsModal ? subscribeMobile : subscribeNoop,
    mobileAsModal ? isMobile : notMobile,
    notMobile,
  );
  const useModal = mobileAsModal && mobile;

  function items() {
    return [
      ...(listRef.current?.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])',
      ) ?? []),
    ];
  }

  useEffect(() => {
    if (!mobileAsModal) {
      return;
    }

    const media = window.matchMedia(mobileQuery);

    function onChange() {
      setOpen(false);
    }

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [mobileAsModal]);

  useEffect(() => {
    if (!open || useModal) {
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
  }, [open, useModal]);

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
    if (useModal) {
      return;
    }

    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) {
      return;
    }

    setOpen(false);
  }

  function onListClick(event: MouseEvent<HTMLUListElement>) {
    const target = event.target;
    if (target instanceof Element && target.closest('a, button')) {
      setOpen(false);
    }
  }

  const triggerClass = [
    icon ? styles.iconTrigger : undefined,
    triggerClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const listClass = [
    styles.list,
    size === 'compact' ? styles.compact : undefined,
    align === 'start' ? styles.alignStart : styles.alignEnd,
    panelClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={[styles.root, rootClassName].filter(Boolean).join(' ')}
      ref={rootRef}
      onBlur={onBlur}
    >
      <button
        ref={buttonRef}
        id={buttonId}
        className={triggerClass}
        type="button"
        aria-expanded={open}
        aria-controls={useModal ? undefined : listId}
        aria-haspopup={useModal ? 'dialog' : 'menu'}
        aria-label={ariaLabel}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onButtonKeyDown}
      >
        {label}
      </button>
      {useModal && title && closeLabel ? (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title={title}
          closeLabel={closeLabel}
        >
          <ul className={styles.modalList} onClick={onListClick}>
            {children}
          </ul>
        </Modal>
      ) : (
        <ul
          ref={listRef}
          id={listId}
          className={listClass}
          hidden={!open}
          aria-labelledby={buttonId}
          onKeyDown={onListKeyDown}
          onClick={onListClick}
        >
          {children}
        </ul>
      )}
    </div>
  );
}
