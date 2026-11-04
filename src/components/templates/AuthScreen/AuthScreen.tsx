import type { ReactNode } from 'react';
import { Header } from '@/components/organisms/Header/Header';
import { PageShell } from '@/components/templates/PageShell/PageShell';
import styles from './AuthScreen.module.css';

export function AuthScreen({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <PageShell header={<Header showAccountMenu={false} />} variant="auth">
      <h1 className={styles.title}>{title}</h1>
      {children}
    </PageShell>
  );
}
