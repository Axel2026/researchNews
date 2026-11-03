'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from 'react';
import { Modal } from '@/components/Modal/Modal';
import { Link, usePathname } from '@/i18n/navigation';
import {
  localeLabels,
  localeNames,
  routing,
  type AppLocale,
} from '@/i18n/routing';
import styles from './LanguageSwitcher.module.css';

const mobileQuery = '(max-width: 40rem)';

function subscribe(onChange: () => void) {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function isMobile() {
  return window.matchMedia(mobileQuery).matches;
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('Nav');
  const reactId = useId();
  const buttonId = `${reactId}-button`;
  const listId = `${reactId}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const mobile = useSyncExternalStore(subscribe, isMobile, () => false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(mobileQuery);

    function onChange() {
      setOpen(false);
    }

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!open || mobile) {
      return;
    }

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [mobile, open]);

  function close(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) {
      buttonRef.current?.focus();
    }
  }

  function onListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const items = [
      ...(listRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []),
    ];
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

  const languageOptions = routing.locales.map((code) => (
    <li key={code}>
      <LanguageOption
        code={code}
        current={code === locale}
        pathname={pathname}
        onNavigate={() => setOpen(false)}
      />
    </li>
  ));

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        ref={buttonRef}
        id={buttonId}
        className={styles.trigger}
        type="button"
        aria-expanded={open}
        aria-controls={mobile ? undefined : listId}
        aria-haspopup={mobile ? 'dialog' : undefined}
        aria-label={t('language')}
        onClick={() => setOpen((value) => !value)}
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="4"
            ry="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M3.5 12h17M5 8h14M5 16h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {mobile ? (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title={t('language')}
          closeLabel={t('close')}
        >
          <ul className={styles.modalList}>{languageOptions}</ul>
        </Modal>
      ) : (
        <ul
          ref={listRef}
          id={listId}
          className={styles.list}
          hidden={!open}
          aria-labelledby={buttonId}
          onKeyDown={onListKeyDown}
        >
          {languageOptions}
        </ul>
      )}
    </div>
  );
}

function LanguageOption({
  code,
  current,
  pathname,
  onNavigate,
}: {
  code: AppLocale;
  current: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      className={current ? styles.optionCurrent : styles.option}
      href={pathname}
      locale={code}
      hrefLang={code}
      lang={code}
      aria-current={current ? 'true' : undefined}
      onClick={onNavigate}
    >
      <span>{localeNames[code]}</span>
      <span className={styles.code}>{localeLabels[code]}</span>
    </Link>
  );
}
