'use client';

import { useTranslations } from 'next-intl';
import { ErrorScreen } from '@/components/templates/ErrorScreen/ErrorScreen';

export default function ErrorPage() {
  const t = useTranslations('Error');

  return (
    <ErrorScreen
      code="500"
      title={t('serverTitle')}
      homeLabel={t('backHome')}
    />
  );
}
