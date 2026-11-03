import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { AuthScreen } from '@/components/AuthScreen/AuthScreen';
import { CredentialsForm } from '@/components/AuthForms/CredentialsForm';
import { routing } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/login'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Auth' });
  return { title: t('loginTitle') };
}

export default async function LoginPage({
  params,
}: PageProps<'/[locale]/login'>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'Auth' });

  return (
    <AuthScreen title={t('loginTitle')}>
      <Suspense fallback={<p>{t('loading')}</p>}>
        <CredentialsForm mode="login" />
      </Suspense>
    </AuthScreen>
  );
}
