import type { ViewKeyParams } from './ArticleViewBeacon.utils.types';
export function viewKey({ slug }: ViewKeyParams): string {
  return `view:${slug}:${new Date().toISOString().slice(0, 10)}`;
}
