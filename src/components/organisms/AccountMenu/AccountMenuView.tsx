'use client';

import { useTranslations } from 'next-intl';
import { UserIcon } from '@/components/atoms/UserIcon/UserIcon';
import { Dropdown } from '@/components/molecules/Dropdown/Dropdown';
import { Link } from '@/i18n/navigation';
import styles from './AccountMenu.module.css';
import type { AccountMenuViewProps } from './AccountMenuView.types';

export function AccountMenuView({ status, onSignOut }: AccountMenuViewProps) {
  const t = useTranslations('Auth');
  const tNav = useTranslations('Nav');

  if (status === 'pending') {
    return (
      <p className={styles.pending} role="status">
        {t('loading')}
      </p>
    );
  }

  if (status === 'authenticated') {
    return (
      <nav className={styles.root} aria-label={t('account')}>
        <Dropdown
          icon
          size="compact"
          mobileAsModal
          ariaLabel={t('account')}
          title={t('account')}
          closeLabel={tNav('close')}
          label={<UserIcon />}
        >
          <li>
            <Link className={styles.option} href="/">
              {t('userPanel')}
            </Link>
          </li>
          <li>
            <Link className={styles.option} href="/bookmarks">
              {t('bookmarks')}
            </Link>
          </li>
          <li>
            <button className={styles.option} type="button" onClick={onSignOut}>
              {t('logout')}
            </button>
          </li>
        </Dropdown>
      </nav>
    );
  }

  return (
    <nav className={styles.menu} aria-label={t('account')}>
      <Link className={styles.action} href="/login">
        {t('login')}
      </Link>
      <Link className={styles.action} href="/register">
        {t('register')}
      </Link>
    </nav>
  );
}
