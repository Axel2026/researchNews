'use client';

import { Link } from '@/i18n/navigation';
import {
  localeLabels,
  localeNames,
  type AppLocale,
} from '@/i18n/routing';
import styles from './LanguageSwitcher.module.css';

export function LanguageOption({
  code,
  current,
  pathname,
}: {
  code: AppLocale;
  current: boolean;
  pathname: string;
}) {
  return (
    <Link
      className={current ? styles.optionCurrent : styles.option}
      href={pathname}
      locale={code}
      hrefLang={code}
      lang={code}
      aria-current={current ? 'true' : undefined}
    >
      <span>{localeNames[code]}</span>
      <span className={styles.code}>{localeLabels[code]}</span>
    </Link>
  );
}
