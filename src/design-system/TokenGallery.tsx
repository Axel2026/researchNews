import {
  borders,
  colors,
  fontSizes,
  fonts,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  spacing,
} from './tokens';
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

export function BordersGallery() {
  return (
    <div>
      {borders.map((token) => (
        <div className={styles.row} key={token.variable}>
          <strong>{token.name}</strong>
          <div
            className={styles.borderPreview}
            style={{
              border: `${token.variable.includes('width') ? `var(${token.variable})` : 'var(--border-width)'} solid ${
                token.variable.includes('width')
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

export function DesignSystemOverview() {
  return (
    <div className={styles.stack}>
      <section>
        <h2 className={styles.sectionTitle}>Color</h2>
        <ColorGallery />
      </section>
      <section>
        <h2 className={styles.sectionTitle}>Spacing</h2>
        <SpacingGallery />
      </section>
      <section>
        <h2 className={styles.sectionTitle}>Border radius</h2>
        <RadiiGallery />
      </section>
      <section>
        <h2 className={styles.sectionTitle}>Borders</h2>
        <BordersGallery />
      </section>
      <TypographyGallery />
    </div>
  );
}
