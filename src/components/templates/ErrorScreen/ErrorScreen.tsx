import { Button } from '@/components/atoms/Button/Button';
import { Header } from '@/components/organisms/Header/Header';
import { PageShell } from '@/components/templates/PageShell/PageShell';
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
    <PageShell
      header={
        <Header
          showAccountMenu={false}
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
