import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './CategoryChip.module.css';
import type { CategoryChipProps } from './CategoryChip.types';

export function CategoryChip({ field, href }: CategoryChipProps) {
  const t = useTranslations('Category');

  if (href) {
    return (
      <Link
        href={href}
        className={styles.chip}
        aria-label={t('open', { field })}
      >
        {field}
      </Link>
    );
  }

  return <p className={styles.chip}>{field}</p>;
}
