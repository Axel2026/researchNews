'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './ArticleComments.module.css';
import type { ArticleCommentsProps } from './ArticleComments.types';

export function ArticleComments({ slug, count }: ArticleCommentsProps) {
  const t = useTranslations('News');

  return (
    <Link
      href={`/article/${slug}#discussion-heading`}
      className={styles.link}
      aria-label={t('comments', { count })}
    >
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M6.2 6.4h11.6a1.7 1.7 0 0 1 1.7 1.7v6.1a1.7 1.7 0 0 1-1.7 1.7H11l-3.4 2.7v-2.7H6.2a1.7 1.7 0 0 1-1.7-1.7V8.1a1.7 1.7 0 0 1 1.7-1.7z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.count}>{count}</span>
    </Link>
  );
}
