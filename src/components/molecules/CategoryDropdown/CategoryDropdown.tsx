import { useTranslations } from 'next-intl';
import { Chevron } from '@/components/atoms/Chevron/Chevron';
import { Dropdown } from '@/components/molecules/Dropdown/Dropdown';
import { Link } from '@/i18n/navigation';
import styles from './CategoryDropdown.module.css';
import type { CategoryDropdownProps } from './CategoryDropdown.types';

export function CategoryDropdown({
  categories,
  currentSlug,
}: CategoryDropdownProps) {
  const t = useTranslations('Nav');
  const isCurrent = Boolean(currentSlug);
  const triggerClassName = isCurrent ? styles.triggerCurrent : styles.trigger;

  if (categories.length === 0) {
    return null;
  }

  return (
    <Dropdown
      align="start"
      triggerClassName={triggerClassName}
      label={
        <>
          {t('fields')}
          <Chevron className={styles.chevron} strokeWidth={1.5} />
        </>
      }
    >
      {categories.map((category) => {
        const current = category.slug === currentSlug;
        const optionClassName = current ? styles.optionCurrent : styles.option;
        const currentPage = current ? 'page' : undefined;

        return (
          <li key={category.slug}>
            <Link
              className={optionClassName}
              href={`/category/${category.slug}`}
              aria-current={currentPage}
            >
              {category.field}
            </Link>
          </li>
        );
      })}
    </Dropdown>
  );
}
