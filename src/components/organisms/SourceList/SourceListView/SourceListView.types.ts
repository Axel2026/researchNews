import type { SourceListItem } from '@/data/sources.types';

export type SourceListCopy = {
  kicker: string;
  title: string;
  dek: string;
  visit: string;
  empty: string;
  opensNewTab: string;
};

export type SourceListViewProps = {
  sources: SourceListItem[];
  copy: SourceListCopy;
};
