'use client';

import { useTranslations } from 'next-intl';
import { Dropdown } from '@/components/molecules/Dropdown/Dropdown';
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
  const isCurrent = Boolean(currentSlug);

  if (categories.length === 0) {
    return null;
  }

  return (
    <Dropdown
      align="start"
      triggerClassName={isCurrent ? styles.triggerCurrent : styles.trigger}
      label={
        <>
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
        </>
      }
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
    </Dropdown>
  );
}
