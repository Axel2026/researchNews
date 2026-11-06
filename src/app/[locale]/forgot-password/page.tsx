import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ForgotPasswordForm } from '@/components/organisms/AuthForms/ForgotPasswordForm';
import { AuthScreen } from '@/components/templates/AuthScreen/AuthScreen';
import { routing } from '@/i18n/routing';
import { authPageMetadata } from '@/lib/seo';
import type { ForgotPasswordPageProps } from './page.types';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/forgot-password'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Auth' });
  return authPageMetadata(locale, '/forgot-password', t('forgotTitle'));
}

export default async function ForgotPasswordPage({
  params,
}: ForgotPasswordPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'Auth' });

  return (
    <AuthScreen title={t('forgotTitle')}>
      <ForgotPasswordForm />
    </AuthScreen>
  );
}
