import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { Button } from './Button';

it('calls onClick when the button is pressed', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  renderWithIntl(<Button onClick={onClick}>Save</Button>);

  await user.click(screen.getByRole('button', { name: 'Save' }));

  expect(onClick).toHaveBeenCalledOnce();
});

it('renders an external address as a new-tab link', () => {
  renderWithIntl(
    <Button href="https://example.com/paper" newWindowHint="opens in a new tab">
      Source
    </Button>,
  );

  const link = screen.getByRole('link', { name: /Source/ });
  expect(link).toHaveAttribute('href', 'https://example.com/paper');
  expect(link).toHaveAttribute('target', '_blank');
});
