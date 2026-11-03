import {
  borders,
  breakpoints,
  colors,
  fontSizes,
  fonts,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  spacing,
  zIndexes,
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

export function BreakpointsGallery() {
  return (
    <div>
      <p className={styles.zNote}>
        Viewport breakpoints cannot use <code>var()</code> inside{' '}
        <code>@media</code>. Repeat the token length in the query, e.g.{' '}
        <code>@media (min-width: 64rem)</code> for{' '}
        <code>--breakpoint-lg</code>.
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
      <section>
        <h2 className={styles.sectionTitle}>Z-index</h2>
        <ZIndexGallery />
      </section>
      <section>
        <h2 className={styles.sectionTitle}>Breakpoints</h2>
        <BreakpointsGallery />
      </section>
      <TypographyGallery />
    </div>
  );
}
