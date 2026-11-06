import { Button } from '@/components/atoms/Button/Button';
import styles from './SourceList.module.css';
import type { SourceListViewProps } from './SourceListView.types';

export function SourceListView({ sources, copy }: SourceListViewProps) {
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
