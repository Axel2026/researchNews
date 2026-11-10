import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { ErrorScreen } from './ErrorScreen';

it('shows the error and a link back home', () => {
  renderWithIntl(
    <ErrorScreen
      code="404"
      title="This page does not exist."
      homeLabel="Back to the home page"
    />,
  );

  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  expect(screen.getByText('This page does not exist.')).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Back to the home page' }),
  ).toHaveAttribute('href', '/');
});
