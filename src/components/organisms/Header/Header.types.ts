import type { ReactNode } from 'react';

import type { ArticleCategory } from '@/data/articles.types';

export type HeaderCurrent = 'stories' | 'category' | 'sources' | 'search';

export type HeaderProps = {
  current?: HeaderCurrent;
  categories?: ArticleCategory[];
  currentCategorySlug?: string;
  children?: ReactNode;
  actions?: ReactNode;
  showAccountMenu?: boolean;
  showSearch?: boolean;
  showLanguageSwitcher?: boolean;
};
