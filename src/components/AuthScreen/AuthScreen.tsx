import type { ReactNode } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import styles from './AuthScreen.module.css';

export function AuthScreen({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <LanguageSwitcher />
        <Link className={styles.brand} href="/">
          {/* eslint-disable-next-line @next/next/no-img-element -- next/image does not optimize SVG */}
          <img
            className={styles.logo}
            src="/images/logo.svg"
            alt="ResearchNews"
            width={2048}
            height={683}
          />
        </Link>
      </header>
      <main id="main" tabIndex={-1} className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </main>
    </div>
  );
}
