import { colors } from './tokens';
import styles from './gallery.module.css';

export function ColorGallery() {
  return (
    <div className={styles.grid}>
      {colors.map((token) => (
        <article className={styles.swatch} key={token.variable}>
          <div
            className={styles.swatchFill}
            style={{ background: token.value }}
          />
          <div className={styles.swatchMeta}>
            <strong>{token.name}</strong>
            <code>{token.variable}</code>
            <code>{token.value}</code>
          </div>
        </article>
      ))}
    </div>
  );
}
