import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { PageShell } from './PageShell';

it('renders the header and main content', () => {
  renderWithIntl(
    <PageShell header={<p>Site header</p>}>
      <p>Story body</p>
    </PageShell>,
  );

  expect(screen.getByText('Site header')).toBeInTheDocument();
  const main = screen.getByRole('main');
  expect(main).toHaveAttribute('id', 'main');
  expect(main).toHaveTextContent('Story body');
});

it('omits main when there is no content', () => {
  renderWithIntl(<PageShell header={<p>Site header</p>} />);

  expect(screen.getByText('Site header')).toBeInTheDocument();
  expect(screen.queryByRole('main')).not.toBeInTheDocument();
});
