import { Button } from '@/components/atoms/Button/Button';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import styles from './ErrorScreen.module.css';

export function ErrorScreen({
  code,
  title,
  homeLabel,
  showLanguageSwitcher = true,
}: {
  code: string;
  title: string;
  homeLabel: string;
  showLanguageSwitcher?: boolean;
}) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="ResearchNews">
          {/* eslint-disable-next-line @next/next/no-img-element -- next/image does not optimize SVG */}
          <img
            className={styles.logo}
            src="/images/logo.svg"
            alt="ResearchNews"
            width={2048}
            height={683}
          />
        </Link>
        {showLanguageSwitcher ? <LanguageSwitcher /> : null}
      </header>
      <main id="main" tabIndex={-1} className={styles.main}>
        <h1 className={styles.code}>{code}</h1>
        <p className={styles.title}>{title}</p>
        <Button href="/">{homeLabel}</Button>
      </main>
    </div>
  );
}
