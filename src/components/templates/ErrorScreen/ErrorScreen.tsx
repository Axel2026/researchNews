import { Button } from '@/components/atoms/Button/Button';
import { Header } from '@/components/organisms/Header/Header';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import styles from './ErrorScreen.module.css';
import type { ErrorScreenProps } from './ErrorScreen.types';

export function ErrorScreen({
  code,
  title,
  homeLabel,
  showLanguageSwitcher = true,
}: ErrorScreenProps) {
  return (
    <PageShell
      header={
        <Header
          showAccountMenu={false}
          showSearch={false}
          showLanguageSwitcher={showLanguageSwitcher}
        />
      }
      variant="error"
    >
      <h1 className={styles.code}>{code}</h1>
      <p className={styles.title}>{title}</p>
      <Button href="/">{homeLabel}</Button>
    </PageShell>
  );
}
