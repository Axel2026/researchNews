import type { ComponentProps } from 'react';

import { Link } from '@/i18n/navigation';

export type AppHref = ComponentProps<typeof Link>['href'];

export type PaginationProps = {
  label: string;
  previousLabel: string;
  nextLabel: string;
  pageLabel: (page: number) => string;
  page: number;
  pageCount: number;
  hrefFor?: (page: number) => AppHref;
  onPage?: (page: number) => void;
};
