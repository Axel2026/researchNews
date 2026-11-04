import { BordersGallery } from './BordersGallery';
import { BreakpointsGallery } from './BreakpointsGallery';
import { ColorGallery } from './ColorGallery';
import { RadiiGallery } from './RadiiGallery';
import { SpacingGallery } from './SpacingGallery';
import { TypographyGallery } from './TypographyGallery';
import { ZIndexGallery } from './ZIndexGallery';
import styles from './gallery.module.css';

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
