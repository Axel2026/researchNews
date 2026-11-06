import { borders } from './tokens';
import styles from './gallery.module.css';

export function BordersGallery() {
  return (
    <div>
      {borders.map((token) => {
        const width = token.value.endsWith('px')
          ? `var(${token.variable})`
          : 'var(--border-width)';
        const color = token.value.endsWith('px')
          ? 'var(--color-ink)'
          : `var(${token.variable})`;
        const borderStyle = { border: `${width} solid ${color}` };

        return (
          <div className={styles.row} key={token.variable}>
            <strong>{token.name}</strong>
            <div className={styles.borderPreview} style={borderStyle} />
            <div className={styles.rowMeta}>
              <code>{token.variable}</code>
              <code>{token.value}</code>
            </div>
          </div>
        );
      })}
    </div>
  );
}
