import type { Metadata } from 'next';

import { hasLocale } from 'next-intl';

import { getTranslations } from 'next-intl/server';

import { getCategoryBySlug } from '@/data/articles';

import { getPathname } from '@/i18n/navigation';

import { routing } from '@/i18n/routing';

import {
  categoryPagePath,
  defaultSocialImage,
  ogLocaleByAppLocale,
  pageAlternates,
} from '@/lib/seo';
import type { CategoryMetadataParams } from './CategoryListing.utils.types';

export async function categoryMetadata({
  locale,
  slug,
  page,
}: CategoryMetadataParams): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const category = await getCategoryBySlug({ slug, locale, page });

  if (!category) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const href = categoryPagePath({ slug, page });
  const description = t('categoryDescription', { field: category.field });

  return {
    title: category.field,
    description,
    alternates: pageAlternates({ locale, href }),
    openGraph: {
      type: 'website',
      locale: ogLocaleByAppLocale[locale],
      siteName: t('title'),
      title: category.field,
      description,
      url: getPathname({ locale, href }),
      images: [{ ...defaultSocialImage, alt: category.field }],
    },
    twitter: {
      card: 'summary',
      title: category.field,
      description,
      images: [defaultSocialImage.url],
    },
  };
}
