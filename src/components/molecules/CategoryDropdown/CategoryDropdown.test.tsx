import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { sampleCategories } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { CategoryDropdown } from './CategoryDropdown';

it('opens field links and marks the current category', async () => {
  const user = userEvent.setup();
  renderWithIntl(
    <CategoryDropdown
      categories={sampleCategories}
      currentSlug="biochemistry"
    />,
  );

  const trigger = screen.getByRole('button', { name: 'Fields' });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  await user.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('list', { hidden: true })).toHaveAttribute(
    'data-popover-open',
  );
  const current = screen.getByRole('link', {
    name: 'Biochemistry',
    hidden: true,
  });
  expect(current).toHaveAttribute('href', '/category/biochemistry');
  expect(current).toHaveAttribute('aria-current', 'page');
  expect(
    screen.getByRole('link', { name: 'Microbial ecology', hidden: true }),
  ).toHaveAttribute('href', '/category/microbial-ecology');
});

it('renders nothing when there are no categories', () => {
  const { container } = renderWithIntl(<CategoryDropdown categories={[]} />);

  expect(container).toBeEmptyDOMElement();
});
