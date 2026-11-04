import { radii } from './tokens';
import styles from './gallery.module.css';

export function RadiiGallery() {
  return (
    <div>
      {radii.map((token) => (
        <div className={styles.row} key={token.variable}>
          <strong>{token.name}</strong>
          <div
            className={styles.radiusPreview}
            style={{ borderRadius: `var(${token.variable})` }}
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
