import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { CategoryChip } from './CategoryChip';

it('links to a category with an accessible name', () => {
  renderWithIntl(
    <CategoryChip field="Biochemistry" href="/category/biochemistry" />,
  );

  expect(
    screen.getByRole('link', { name: 'Go to category Biochemistry' }),
  ).toHaveAttribute('href', '/category/biochemistry');
});

it('renders the field as text when there is no link', () => {
  renderWithIntl(<CategoryChip field="Biochemistry" />);

  expect(screen.getByText('Biochemistry').tagName).toBe('P');
});
