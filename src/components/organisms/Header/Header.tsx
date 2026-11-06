'use client';
import { useTranslations } from 'next-intl';
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon';
import { CategoryDropdown } from '@/components/molecules/CategoryDropdown/CategoryDropdown';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher/LanguageSwitcher';
import { AccountMenu } from '@/components/organisms/AccountMenu/AccountMenu';
import { Link, usePathname } from '@/i18n/navigation';
import styles from './Header.module.css';
import type { HeaderProps } from './Header.types';

export function Header({
  current,
  categories,
  currentCategorySlug,
  children,
  actions,
  showAccountMenu = true,
  showSearch = true,
  showLanguageSwitcher = true,
}: HeaderProps) {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const onSearch = current === 'search' || pathname === '/search';
  const searchCurrent = onSearch ? 'page' : undefined;
  const storiesCurrent = current === 'stories' ? 'page' : undefined;
  const sourcesCurrent = current === 'sources' ? 'page' : undefined;
  const resolvedActions =
    actions ??
    (showAccountMenu || showSearch || showLanguageSwitcher ? (
      <>
        {showAccountMenu ? <AccountMenu /> : null}
        {showSearch ? (
          <Link
            className={styles.search}
            href="/search"
            aria-label={t('search')}
            aria-current={searchCurrent}
          >
            <SearchIcon />
          </Link>
        ) : null}
        {showLanguageSwitcher ? <LanguageSwitcher /> : null}
      </>
    ) : null);

  const nav =
    children ??
    (categories ? (
      <nav className={styles.nav} aria-label={t('main')}>
        <Link className={styles.navLink} href="/" aria-current={storiesCurrent}>
          {t('stories')}
        </Link>
        <Link
          className={styles.navLink}
          href="/sources"
          aria-current={sourcesCurrent}
        >
          {t('sources')}
        </Link>
        <CategoryDropdown
          categories={categories}
          currentSlug={currentCategorySlug}
        />
      </nav>
    ) : null);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <div className={styles.start}>
          <Link className={styles.brand} href="/" aria-label="ResearchNews">
            {/* eslint-disable-next-line @next/next/no-img-element -- next/image does not optimize SVG */}
            <img
              className={styles.logo}
              src="/images/logo.svg"
              alt="ResearchNews"
              width={2048}
              height={578}
            />
          </Link>
          {nav}
        </div>
        {resolvedActions ? (
          <div className={styles.actions}>{resolvedActions}</div>
        ) : null}
      </div>
    </header>
  );
}
