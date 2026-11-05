import { Button } from '@/components/atoms/Button/Button';
import type { SourceListItem } from '@/data/sources';
import styles from './SourceList.module.css';

export type SourceListCopy = {
  kicker: string;
  title: string;
  dek: string;
  visit: string;
  empty: string;
  opensNewTab: string;
};

export function SourceListView({
  sources,
  copy,
}: {
  sources: SourceListItem[];
  copy: SourceListCopy;
}) {
  return (
    <>
      <p className={styles.kicker}>{copy.kicker}</p>
      <h1 id="sources-heading" className={styles.title}>
        {copy.title}
      </h1>
      <p className={styles.dek}>{copy.dek}</p>
      {sources.length > 0 ? (
        <ul className={styles.list} aria-labelledby="sources-heading">
          {sources.map((source) => (
            <li key={source.id} className={styles.item}>
              <h2 className={styles.name}>{source.name}</h2>
              <p className={styles.summary}>{source.summary}</p>
              <Button
                className={styles.visit}
                href={source.url}
                variant="primary"
                newWindowHint={copy.opensNewTab}
              >
                {copy.visit}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>{copy.empty}</p>
      )}
    </>
  );
}
