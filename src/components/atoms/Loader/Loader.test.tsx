import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { Loader } from './Loader';

it('exposes the loading label to assistive tech', () => {
  renderWithIntl(<Loader label="Loading…" />);

  expect(screen.getByRole('status')).toHaveTextContent('Loading…');
});
