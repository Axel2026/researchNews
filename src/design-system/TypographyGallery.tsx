import {
  fontSizes,
  fonts,
  fontWeights,
  letterSpacings,
  lineHeights,
} from './tokens';
import styles from './gallery.module.css';

export function TypographyGallery() {
  return (
    <div className={styles.stack}>
      <section>
        <h3 className={styles.sectionTitle}>Families</h3>
        {fonts.map((token) => (
          <div className={styles.row} key={token.variable}>
            <strong>{token.name}</strong>
            <p
              className={styles.fontSample}
              style={{ fontFamily: `var(${token.variable})` }}
            >
              {token.sample}
            </p>
            <div className={styles.rowMeta}>
              <code>{token.variable}</code>
            </div>
          </div>
        ))}
      </section>
      <section>
        <h3 className={styles.sectionTitle}>Sizes</h3>
        {fontSizes.map((token) => (
          <div className={styles.row} key={token.variable}>
            <strong>{token.name}</strong>
            <p
              className={styles.sizeSample}
              style={{ fontSize: `var(${token.variable})` }}
            >
              {token.sample}
            </p>
            <div className={styles.rowMeta}>
              <code>{token.variable}</code>
              <code>{token.value}</code>
            </div>
          </div>
        ))}
      </section>
      <section>
        <h3 className={styles.sectionTitle}>Weights</h3>
        {fontWeights.map((token) => (
          <div className={styles.row} key={token.variable}>
            <strong>{token.name}</strong>
            <p
              className={styles.sizeSample}
              style={{ fontWeight: `var(${token.variable})` }}
            >
              Evidence
            </p>
            <div className={styles.rowMeta}>
              <code>{token.variable}</code>
              <code>{token.value}</code>
            </div>
          </div>
        ))}
      </section>
      <section>
        <h3 className={styles.sectionTitle}>Line height</h3>
        {lineHeights.map((token) => (
          <div className={styles.row} key={token.variable}>
            <strong>{token.name}</strong>
            <p
              className={styles.fontSample}
              style={{ lineHeight: `var(${token.variable})` }}
            >
              Clear evidence and a little more context for research stories.
            </p>
            <div className={styles.rowMeta}>
              <code>{token.variable}</code>
              <code>{token.value}</code>
            </div>
          </div>
        ))}
      </section>
      <section>
        <h3 className={styles.sectionTitle}>Letter spacing</h3>
        {letterSpacings.map((token) => (
          <div className={styles.row} key={token.variable}>
            <strong>{token.name}</strong>
            <p
              className={styles.fontSample}
              style={{
                letterSpacing: `var(${token.variable})`,
                textTransform: token.name === 'Wide' ? 'uppercase' : undefined,
              }}
            >
              Research
            </p>
            <div className={styles.rowMeta}>
              <code>{token.variable}</code>
              <code>{token.value}</code>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
