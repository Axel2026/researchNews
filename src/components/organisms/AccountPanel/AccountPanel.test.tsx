import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { AccountPanel } from './AccountPanel';

it('shows the empty panel when there is no session', async () => {
  renderWithIntl(<AccountPanel />);

  expect(await screen.findByRole('status')).toHaveTextContent(
    'Could not update the key. Try again.',
  );
  expect(
    screen.getByRole('heading', { name: 'Saved keys' }),
  ).toBeInTheDocument();
  expect(screen.getByText('No keys saved yet.')).toBeInTheDocument();
  expect(screen.getByText('No key for this provider.')).toBeInTheDocument();
});
