import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ErrorScreen } from '@/components/templates/ErrorScreen/ErrorScreen';
import { noIndexRobots } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Error');

  return {
    title: t('notFoundTitle'),
    robots: noIndexRobots,
  };
}

export default async function NotFound() {
  const t = await getTranslations('Error');

  return (
    <ErrorScreen
      code="404"
      title={t('notFoundTitle')}
      homeLabel={t('backHome')}
    />
  );
}
