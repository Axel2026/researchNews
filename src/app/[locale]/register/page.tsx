import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CredentialsForm } from '@/components/organisms/AuthForms/CredentialsForm';
import { AuthScreen } from '@/components/templates/AuthScreen/AuthScreen';
import { routing } from '@/i18n/routing';
import { authPageMetadata } from '@/lib/seo';
import type { RegisterPageProps } from './page.types';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/register'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Auth' });
  return authPageMetadata(locale, '/register', t('registerTitle'));
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'Auth' });

  return (
    <AuthScreen title={t('registerTitle')}>
      <Suspense fallback={<p>{t('loading')}</p>}>
        <CredentialsForm mode="register" />
      </Suspense>
    </AuthScreen>
  );
}
