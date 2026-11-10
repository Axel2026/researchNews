import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { sampleSources } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { SourceList } from './SourceList';

it('renders source names and website links', async () => {
  const view = await SourceList({ sources: sampleSources, locale: 'en' });
  renderWithIntl(view);

  expect(screen.getByRole('heading', { name: 'Sources' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'CORE API' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Source website/ })).toHaveAttribute(
    'href',
    'https://core.ac.uk/',
  );
});

it('renders the empty sources message', async () => {
  const view = await SourceList({ sources: [], locale: 'en' });
  renderWithIntl(view);

  expect(screen.getByRole('status')).toHaveTextContent(
    'There are no sources yet.',
  );
});
