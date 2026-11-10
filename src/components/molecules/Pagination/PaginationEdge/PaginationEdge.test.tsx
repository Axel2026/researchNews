import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { PaginationEdge } from './PaginationEdge';

const pageLabel = (page: number) => `Page ${page}`;

it('disables an edge that would leave the page range', () => {
  renderWithIntl(
    <PaginationEdge
      target={0}
      text="Previous"
      pageCount={5}
      pageLabel={pageLabel}
    />,
  );

  expect(screen.getByText('Previous')).toHaveAttribute('aria-disabled', 'true');
  expect(
    screen.queryByRole('button', { name: 'Previous' }),
  ).not.toBeInTheDocument();
});

it('moves to the neighbouring page', async () => {
  const user = userEvent.setup();
  const onPage = vi.fn();
  renderWithIntl(
    <PaginationEdge
      target={2}
      text="Next"
      pageCount={5}
      pageLabel={pageLabel}
      onPage={onPage}
    />,
  );

  await user.click(screen.getByRole('button', { name: 'Next' }));
  expect(onPage).toHaveBeenCalledWith(2);
});

it('links to the neighbouring page', () => {
  renderWithIntl(
    <PaginationEdge
      target={2}
      text="Next"
      pageCount={5}
      pageLabel={pageLabel}
      hrefFor={(page) => `/news?page=${page}`}
    />,
  );

  expect(screen.getByRole('link', { name: 'Next' })).toHaveAttribute(
    'href',
    '/news?page=2',
  );
});
