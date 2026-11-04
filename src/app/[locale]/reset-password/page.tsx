import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ResetPasswordForm } from '@/components/organisms/AuthForms/ResetPasswordForm';
import { AuthScreen } from '@/components/templates/AuthScreen/AuthScreen';
import { routing } from '@/i18n/routing';
import { authPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/reset-password'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Auth' });
  return authPageMetadata(locale, '/reset-password', t('resetTitle'));
}

export default async function ResetPasswordPage({
  params,
}: PageProps<'/[locale]/reset-password'>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'Auth' });

  return (
    <AuthScreen title={t('resetTitle')}>
      <ResetPasswordForm />
    </AuthScreen>
  );
}
