'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import styles from './InfoHint.module.css';

export function InfoHint({
  children,
  hint,
  label,
  description,
}: {
  children: ReactNode;
  hint: ReactNode;
  label: string;
  description?: string;
}) {
  const tooltipId = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const touchPointer = useRef(false);
  const [open, setOpen] = useState(false);

  function cancelHide() {
    if (hideTimer.current !== undefined) {
      clearTimeout(hideTimer.current);
      hideTimer.current = undefined;
    }
  }

  function show() {
    cancelHide();
    setOpen(true);
  }

  function hideSoon() {
    cancelHide();
    hideTimer.current = setTimeout(() => {
      setOpen(false);
      hideTimer.current = undefined;
    }, 150);
  }

  function hideNow() {
    cancelHide();
    setOpen(false);
  }

  useEffect(() => {
    return () => cancelHide();
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function close() {
      cancelHide();
      setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close();
      }
    }

    function onPointerDown(event: Event) {
      const target = event.target;
      if (!(target instanceof Node) || rootRef.current?.contains(target)) {
        return;
      }

      close();
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  function onInfoPointerEnter(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'mouse') {
      show();
    }
  }

  function onInfoPointerLeave(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'mouse') {
      hideSoon();
    }
  }

  function onInfoPointerDown(event: PointerEvent<HTMLButtonElement>) {
    touchPointer.current = event.pointerType !== 'mouse';
  }

  function onInfoClick() {
    if (touchPointer.current) {
      show();
    }
  }

  function onInfoBlur(event: FocusEvent<HTMLButtonElement>) {
    const next = event.relatedTarget;
    if (next instanceof Node && rootRef.current?.contains(next)) {
      return;
    }

    hideNow();
  }

  const described =
    description ?? (typeof hint === 'string' ? hint : undefined);

  return (
    <span
      ref={rootRef}
      className={open ? `${styles.root} ${styles.open}` : styles.root}
    >
      {children}
      <span
        className={styles.info}
        onPointerEnter={onInfoPointerEnter}
        onPointerLeave={onInfoPointerLeave}
      >
        <button
          type="button"
          className={styles.trigger}
          aria-label={label}
          aria-describedby={described ? tooltipId : undefined}
          aria-expanded={open}
          onPointerDown={onInfoPointerDown}
          onClick={onInfoClick}
          onFocus={show}
          onBlur={onInfoBlur}
        >
          <svg
            viewBox="0 0 16 16"
            width="13"
            height="13"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              cx="8"
              cy="8"
              r="6.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <circle cx="8" cy="5.2" r="0.9" fill="currentColor" />
            <path
              d="M8 7.2v4.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {described ? (
          <span id={tooltipId} className={styles.srOnly} role="tooltip">
            {described}
          </span>
        ) : null}
        {open ? (
          <span
            className={styles.tooltip}
            aria-hidden={typeof hint === 'string' ? true : undefined}
          >
            {hint}
          </span>
        ) : null}
      </span>
    </span>
  );
}
