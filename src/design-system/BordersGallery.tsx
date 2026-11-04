import { borders } from './tokens';
import styles from './gallery.module.css';

export function BordersGallery() {
  return (
    <div>
      {borders.map((token) => (
        <div className={styles.row} key={token.variable}>
          <strong>{token.name}</strong>
          <div
            className={styles.borderPreview}
            style={{
              border: `${token.value.endsWith('px') ? `var(${token.variable})` : 'var(--border-width)'} solid ${
                token.value.endsWith('px')
                  ? 'var(--color-ink)'
                  : `var(${token.variable})`
              }`,
            }}
          />
          <div className={styles.rowMeta}>
            <code>{token.variable}</code>
            <code>{token.value}</code>
          </div>
        </div>
      ))}
    </div>
  );
}
