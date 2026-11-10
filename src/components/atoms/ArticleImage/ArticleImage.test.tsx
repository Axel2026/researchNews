import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { ArticleImage } from './ArticleImage';

it('renders an svg source as an image with the given alt text', () => {
  renderWithIntl(
    <ArticleImage
      src="/images/news-placeholder.svg"
      alt="Frog skin"
      sizes="16rem"
    />,
  );

  expect(screen.getByRole('img', { name: 'Frog skin' })).toHaveAttribute(
    'src',
    '/images/news-placeholder.svg',
  );
});
