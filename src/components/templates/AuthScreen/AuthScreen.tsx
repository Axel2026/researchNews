import { Header } from '@/components/organisms/Header/Header';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import styles from './AuthScreen.module.css';
import type { AuthScreenProps } from './AuthScreen.types';

export function AuthScreen({ title, children }: AuthScreenProps) {
  return (
    <PageShell header={<Header showAccountMenu={false} />} variant="auth">
      <h1 className={styles.title}>{title}</h1>
      {children}
    </PageShell>
  );
}
