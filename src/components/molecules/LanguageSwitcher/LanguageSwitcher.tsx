'use client';

import { useLocale, useTranslations } from 'next-intl';
import { LanguageOption } from '@/components/atoms/LanguageOption/LanguageOption';
import { Dropdown } from '@/components/molecules/Dropdown/Dropdown';
import { usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('Nav');

  return (
    <div className={styles.root}>
      <Dropdown
        icon
        size="compact"
        mobileAsModal
        ariaLabel={t('language')}
        title={t('language')}
        closeLabel={t('close')}
        label={
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
        }
      >
        {routing.locales.map((code) => (
          <li key={code}>
            <LanguageOption
              code={code}
              current={code === locale}
              pathname={pathname}
            />
          </li>
        ))}
      </Dropdown>
    </div>
  );
}
