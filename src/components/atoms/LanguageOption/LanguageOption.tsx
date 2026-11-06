import { Link } from '@/i18n/navigation';
import { localeLabels, localeNames } from '@/i18n/routing';
import styles from './LanguageOption.module.css';
import type { LanguageOptionProps } from './LanguageOption.types';

export function LanguageOption({
  code,
  current,
  pathname,
}: LanguageOptionProps) {
  const className = current ? styles.optionCurrent : styles.option;
  const currentOption = current ? 'true' : undefined;

  return (
    <Link
      className={className}
      href={pathname}
      locale={code}
      hrefLang={code}
      lang={code}
      aria-current={currentOption}
    >
      <span>{localeNames[code]}</span>
      <span className={styles.code}>{localeLabels[code]}</span>
    </Link>
  );
}
