'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from 'react';
import { useTranslations } from 'next-intl';
import styles from './ArticleAuthors.module.css';

const SHOW_DELAY_MS = 400;
const HIDE_DELAY_MS = 150;

export function ArticleAuthors({ authors }: { authors: string[] }) {
  const t = useTranslations('News');
  const listId = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const touchPointer = useRef(false);
  const openOnPointerDown = useRef(false);
  const [open, setOpen] = useState(false);

  function cancelShow() {
    if (showTimer.current !== undefined) {
      clearTimeout(showTimer.current);
      showTimer.current = undefined;
    }
  }

  function cancelHide() {
    if (hideTimer.current !== undefined) {
      clearTimeout(hideTimer.current);
      hideTimer.current = undefined;
    }
  }

  function show() {
    cancelShow();
    cancelHide();
    setOpen(true);
  }

  function hideNow() {
    cancelShow();
    cancelHide();
    setOpen(false);
  }

  function scheduleShow() {
    cancelHide();
    if (open || showTimer.current !== undefined) {
      return;
    }

    showTimer.current = setTimeout(() => {
      showTimer.current = undefined;
      setOpen(true);
    }, SHOW_DELAY_MS);
  }

  function scheduleHide() {
    cancelShow();
    const active = document.activeElement;
    if (active instanceof Node && rootRef.current?.contains(active)) {
      return;
    }

    cancelHide();
    hideTimer.current = setTimeout(() => {
      hideTimer.current = undefined;
      setOpen(false);
    }, HIDE_DELAY_MS);
  }

  useEffect(() => {
    return () => {
      clearTimeout(showTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function close() {
      clearTimeout(showTimer.current);
      clearTimeout(hideTimer.current);
      showTimer.current = undefined;
      hideTimer.current = undefined;
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

  function onPointerEnter(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'mouse') {
      scheduleShow();
    }
  }

  function onPointerLeave(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'mouse') {
      scheduleHide();
    }
  }

  function onButtonPointerDown(event: PointerEvent<HTMLButtonElement>) {
    touchPointer.current = event.pointerType !== 'mouse';
    openOnPointerDown.current = open;
  }

  function onButtonClick() {
    if (!touchPointer.current) {
      return;
    }

    if (openOnPointerDown.current) {
      hideNow();
      return;
    }

    show();
  }

  function onButtonBlur(event: FocusEvent<HTMLButtonElement>) {
    const next = event.relatedTarget;
    if (next instanceof Node && rootRef.current?.contains(next)) {
      return;
    }

    hideNow();
  }

  if (authors.length === 0) {
    return null;
  }

  return (
    <span
      ref={rootRef}
      className={open ? `${styles.root} ${styles.open}` : styles.root}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-label={t('authors')}
        aria-expanded={open}
        aria-controls={listId}
        aria-describedby={listId}
        onPointerDown={onButtonPointerDown}
        onClick={onButtonClick}
        onFocus={show}
        onBlur={onButtonBlur}
      >
        <svg
          viewBox="0 0 24 24"
          width="15"
          height="15"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M15.2 19.6v-1.2a3.2 3.2 0 0 0-3.2-3.2H7.2a3.2 3.2 0 0 0-3.2 3.2v1.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle
            cx="9.6"
            cy="8.2"
            r="2.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M20 19.6v-1.2a3.2 3.2 0 0 0-2.4-3.1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M15.4 5.6a2.6 2.6 0 0 1 0 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <span id={listId} className={open ? styles.panel : styles.srOnly}>
        <ul className={styles.names}>
          {authors.map((name, index) => (
            <li key={`${name}-${index}`}>{name}</li>
          ))}
        </ul>
      </span>
    </span>
  );
}
