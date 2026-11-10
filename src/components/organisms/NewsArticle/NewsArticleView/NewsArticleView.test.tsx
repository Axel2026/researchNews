import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { sampleArticleDetail } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { formatPaperPublishedAt } from '@/lib/dates';
import { NewsArticleView } from './NewsArticleView';
import type { NewsArticleCopy } from './NewsArticleView.types';

const copy: NewsArticleCopy = {
  bodyHeading: 'Article',
  source: 'Source paper',
  published: (date: string) => `Published ${date}`,
  viewOriginal: 'View original paper',
  download: 'Download',
  opensNewTab: 'opens in a new tab',
};

it('shows the story, source links, and listen control', () => {
  const paperDate = formatPaperPublishedAt({
    iso: sampleArticleDetail.paperPublishedAt ?? '',
    locale: 'en',
  });

  renderWithIntl(
    <NewsArticleView
      article={sampleArticleDetail}
      locale="en"
      copy={copy}
      bookmarkAction={<button type="button">Save to bookmarks</button>}
      discussion={<p>Discussion thread</p>}
    />,
  );

  expect(
    screen.getByRole('heading', { name: sampleArticleDetail.title }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(sampleArticleDetail.shortPopularization),
  ).toBeInTheDocument();
  expect(screen.getAllByText(`Published ${paperDate}`).length).toBeGreaterThan(
    0,
  );
  expect(screen.getByText('Ada Lovelace · Jane Doe')).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Go to category Biochemistry' }),
  ).toHaveAttribute('href', '/category/biochemistry');
  expect(
    screen.getByRole('button', { name: 'Save to bookmarks' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Listen' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Article' })).toBeInTheDocument();
  expect(
    screen.getByText(
      'The team sequenced the peptides and compared variants with and without the unusual residue.',
    ),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Source paper' }),
  ).toBeInTheDocument();
  expect(screen.getByText(sampleArticleDetail.realTitle)).toBeInTheDocument();
  expect(screen.getByText('Ada Lovelace, Jane Doe')).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /View original paper/ }),
  ).toHaveAttribute('href', sampleArticleDetail.sourceUrl);
  expect(screen.getByRole('link', { name: /^Download/ })).toHaveAttribute(
    'href',
    sampleArticleDetail.downloadUrl,
  );
  expect(screen.getByText('Discussion thread')).toBeInTheDocument();
});

it('shows a community notice and hides paper links without urls', () => {
  renderWithIntl(
    <NewsArticleView
      article={{
        ...sampleArticleDetail,
        sourceUrl: null,
        downloadUrl: null,
      }}
      locale="en"
      copy={{ ...copy, communityNotice: 'A reader summary by Ada Lovelace.' }}
    />,
  );

  expect(
    screen.getByText('A reader summary by Ada Lovelace.'),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: /View original paper/ }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: /^Download/ }),
  ).not.toBeInTheDocument();
});
