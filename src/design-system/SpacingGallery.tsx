import { spacing } from './tokens';
import styles from './gallery.module.css';

export function SpacingGallery() {
  return (
    <div>
      {spacing.map((token) => (
        <div className={styles.row} key={token.variable}>
          <strong>{token.name}</strong>
          <div
            className={styles.bar}
            style={{ width: `var(${token.variable})` }}
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
