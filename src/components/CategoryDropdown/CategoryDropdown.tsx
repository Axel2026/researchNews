'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from 'react';
import { useTranslations } from 'next-intl';
import type { ArticleCategory } from '@/data/articles';
import { Link } from '@/i18n/navigation';
import styles from './CategoryDropdown.module.css';

export function CategoryDropdown({
  categories,
  currentSlug,
}: {
  categories: ArticleCategory[];
  currentSlug?: string;
}) {
  const t = useTranslations('Nav');
  const reactId = useId();
  const buttonId = `${reactId}-button`;
  const listId = `${reactId}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pendingFocus = useRef<'first' | 'last' | null>(null);
  const [open, setOpen] = useState(false);
  const isCurrent = Boolean(currentSlug);

  function links() {
    return [
      ...(listRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []),
    ];
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    const focusTarget = pendingFocus.current;
    const items = links();
    if (focusTarget === 'last') {
      items[items.length - 1]?.focus();
    } else if (focusTarget === 'first') {
      items[0]?.focus();
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

  if (categories.length === 0) {
    return null;
  }

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
    const items = links();
    const index = items.findIndex((link) => link === document.activeElement);

    if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      items[0]?.focus();
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      items[items.length - 1]?.focus();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      items[(index + 1) % items.length]?.focus();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
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
        className={isCurrent ? styles.triggerCurrent : styles.trigger}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onButtonKeyDown}
      >
        {t('fields')}
        <svg
          className={styles.chevron}
          viewBox="0 0 12 12"
          width="12"
          height="12"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M2.2 4.2 6 8l3.8-3.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ul
        ref={listRef}
        id={listId}
        className={styles.list}
        hidden={!open}
        aria-labelledby={buttonId}
        onKeyDown={onListKeyDown}
      >
        {categories.map((category) => {
          const current = category.slug === currentSlug;

          return (
            <li key={category.slug}>
              <Link
                className={current ? styles.optionCurrent : styles.option}
                href={`/category/${category.slug}`}
                aria-current={current ? 'page' : undefined}
              >
                {category.field}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
