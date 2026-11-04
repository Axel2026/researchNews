import { breakpoints } from './tokens';
import styles from './gallery.module.css';

export function BreakpointsGallery() {
  return (
    <div>
      <p className={styles.zNote}>
        Viewport breakpoints cannot use <code>var()</code> inside{' '}
        <code>@media</code>. Repeat the token length in the query, e.g.{' '}
        <code>@media (min-width: 64rem)</code> for <code>--breakpoint-lg</code>.
      </p>
      {breakpoints.map((token) => (
        <div className={styles.row} key={token.variable}>
          <strong>{token.name}</strong>
          <p className={styles.zUse}>{token.use}</p>
          <div className={styles.rowMeta}>
            <code>{token.variable}</code>
            <code>{token.value}</code>
            <code>@media {token.media}</code>
          </div>
        </div>
      ))}
    </div>
  );
}
