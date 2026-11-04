import { zIndexes } from './tokens';
import styles from './gallery.module.css';

export function ZIndexGallery() {
  return (
    <div>
      <p className={styles.zNote}>
        Pick a layer from this scale instead of a raw number. Layers only
        compete inside the same stacking context, so a dropdown still sits
        behind page content unless its parent uses Raised.
      </p>
      <div className={styles.zStage} aria-hidden="true">
        {zIndexes.map((token, index) => (
          <div
            className={styles.zCard}
            key={token.variable}
            style={{
              zIndex: Number(token.value),
              left: `calc(${index} * 2.6rem + var(--space-4))`,
              top: `calc(${index} * 2.2rem + var(--space-4))`,
            }}
          >
            <strong>{token.name}</strong>
            <code>{token.value}</code>
          </div>
        ))}
      </div>
      {zIndexes.map((token) => (
        <div className={styles.row} key={token.variable}>
          <strong>{token.name}</strong>
          <p className={styles.zUse}>{token.use}</p>
          <div className={styles.rowMeta}>
            <code>{token.variable}</code>
            <code>{token.value}</code>
          </div>
        </div>
      ))}
    </div>
  );
}
