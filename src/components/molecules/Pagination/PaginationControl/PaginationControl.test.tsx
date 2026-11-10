import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { PaginationControl } from './PaginationControl';

const pageLabel = (page: number) => `Page ${page}`;

it('marks the current page', () => {
  renderWithIntl(
    <PaginationControl
      target={2}
      className="current"
      current
      pageLabel={pageLabel}
    >
      2
    </PaginationControl>,
  );

  const current = screen.getByText('2');
  expect(current).toHaveAttribute('aria-current', 'page');
  expect(current).toHaveAttribute('aria-label', 'Page 2');
});

it('links to the page address', () => {
  renderWithIntl(
    <PaginationControl
      target={3}
      className="page"
      pageLabel={pageLabel}
      hrefFor={(page) => `/news?page=${page}`}
    >
      3
    </PaginationControl>,
  );

  expect(screen.getByRole('link', { name: 'Page 3' })).toHaveAttribute(
    'href',
    '/news?page=3',
  );
});

it('reports the chosen page', async () => {
  const user = userEvent.setup();
  const onPage = vi.fn();
  renderWithIntl(
    <PaginationControl
      target={3}
      className="page"
      pageLabel={pageLabel}
      onPage={onPage}
    >
      3
    </PaginationControl>,
  );

  await user.click(screen.getByRole('button', { name: 'Page 3' }));
  expect(onPage).toHaveBeenCalledWith(3);
});
