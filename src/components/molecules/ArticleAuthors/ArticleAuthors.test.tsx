import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { ArticleAuthors } from './ArticleAuthors';

it('lists author names when the trigger is opened', async () => {
  const user = userEvent.setup();
  renderWithIntl(<ArticleAuthors authors={['Ada Lovelace', 'Jane Doe']} />);

  const trigger = screen.getByRole('button', { name: 'Authors' });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  await user.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText('Ada Lovelace')).toBeVisible();
  expect(screen.getByText('Jane Doe')).toBeVisible();

  await user.keyboard('{Escape}');

  expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

it('renders nothing when there are no authors', () => {
  const { container } = renderWithIntl(<ArticleAuthors authors={[]} />);

  expect(container).toBeEmptyDOMElement();
});
