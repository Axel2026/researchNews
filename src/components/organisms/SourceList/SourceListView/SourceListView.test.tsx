import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { sampleSources } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { SourceListView } from './SourceListView';
import type { SourceListCopy } from './SourceListView.types';

const copy: SourceListCopy = {
  kicker: 'Origin',
  title: 'Sources',
  dek: 'Where we get the papers we write about.',
  visit: 'Source website',
  empty: 'There are no sources yet.',
  opensNewTab: 'opens in a new tab',
};

it('lists each source and links to its website', () => {
  renderWithIntl(<SourceListView sources={sampleSources} copy={copy} />);

  expect(screen.getByText('Origin')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Sources' })).toBeInTheDocument();
  expect(
    screen.getByText('Where we get the papers we write about.'),
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'CORE API' })).toBeInTheDocument();
  expect(screen.getByText(sampleSources[0].summary)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Source website/ })).toHaveAttribute(
    'href',
    'https://core.ac.uk/',
  );
});

it('shows an empty message when there are no sources', () => {
  renderWithIntl(<SourceListView sources={[]} copy={copy} />);

  expect(screen.getByRole('status')).toHaveTextContent(
    'There are no sources yet.',
  );
  expect(
    screen.queryByRole('link', { name: /Source website/ }),
  ).not.toBeInTheDocument();
});
