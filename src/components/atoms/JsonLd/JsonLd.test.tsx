import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { JsonLd } from './JsonLd';

it('embeds the structured data as JSON', () => {
  const { container } = renderWithIntl(
    <JsonLd data={{ '@type': 'NewsArticle', headline: 'Peptides' }} />,
  );
  const script = container.querySelector('script[type="application/ld+json"]');

  expect(script?.textContent).toContain('"headline":"Peptides"');
});
