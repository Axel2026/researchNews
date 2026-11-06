import type { QueryStringParams, PageNumberParams } from './page.utils.types';
export function queryString({ value }: QueryStringParams): string {
  return typeof value === 'string' ? value : '';
}

export function pageNumber({ value }: PageNumberParams): number {
  if (typeof value !== 'string' || !/^[1-9][0-9]*$/.test(value)) {
    return 1;
  }

  return Number(value);
}
