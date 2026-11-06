import type { PageNumberParams } from './page.utils.types';
const PAGE_NUMBER = /^[1-9][0-9]*$/;

export function pageNumber({ page }: PageNumberParams): number | undefined {
  if (!PAGE_NUMBER.test(page)) {
    return undefined;
  }

  return Number(page);
}
