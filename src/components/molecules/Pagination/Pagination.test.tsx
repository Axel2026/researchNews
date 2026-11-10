import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { Pagination } from './Pagination';

const labels = {
  label: 'Pagination',
  previousLabel: 'Previous',
  nextLabel: 'Next',
  pageLabel: (page: number) => `Page ${page}`,
};

it('renders nothing when there is only one page', () => {
  const { container } = renderWithIntl(
    <Pagination {...labels} page={1} pageCount={1} />,
  );

  expect(container).toBeEmptyDOMElement();
});

it('selects the next and previous page', async () => {
  const user = userEvent.setup();
  const onPage = vi.fn();
  renderWithIntl(
    <Pagination {...labels} page={2} pageCount={5} onPage={onPage} />,
  );

  expect(
    screen.getByRole('navigation', { name: 'Pagination' }),
  ).toBeInTheDocument();
  expect(screen.getByText('2')).toHaveAttribute('aria-current', 'page');

  await user.click(screen.getByRole('button', { name: 'Next' }));
  expect(onPage).toHaveBeenCalledWith(3);

  await user.click(screen.getByRole('button', { name: 'Previous' }));
  expect(onPage).toHaveBeenCalledWith(1);
});

it('links each page when addresses are provided', () => {
  renderWithIntl(
    <Pagination
      {...labels}
      page={1}
      pageCount={3}
      hrefFor={(page) => `/news?page=${page}`}
    />,
  );

  expect(screen.getByRole('link', { name: 'Page 2' })).toHaveAttribute(
    'href',
    '/news?page=2',
  );
  expect(screen.getByRole('link', { name: 'Next' })).toHaveAttribute(
    'href',
    '/news?page=2',
  );
  expect(screen.getByText('Previous')).toHaveAttribute('aria-disabled', 'true');
});

it('marks skipped pages with an ellipsis', () => {
  renderWithIntl(<Pagination {...labels} page={5} pageCount={10} />);

  expect(
    screen.getByRole('navigation', { name: 'Pagination' }),
  ).toHaveTextContent('…');
});
