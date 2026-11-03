'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { localeLabels, localeNames, routing } from '@/i18n/routing';
import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('Nav');

  return (
    <nav className={styles.switcher} aria-label={t('language')}>
      {routing.locales.map((code) => {
        const isCurrent = code === locale;

        return (
          <Link
            key={code}
            className={isCurrent ? styles.current : styles.option}
            href={pathname}
            locale={code}
            hrefLang={code}
            lang={code}
            aria-current={isCurrent ? 'true' : undefined}
          >
            {localeLabels[code]}
            <span className={styles.languageName}>{localeNames[code]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
