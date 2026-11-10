import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { WithMobileViewport } from './WithMobileViewport';

it('renders children in a narrow frame that matches the mobile query', () => {
  renderWithIntl(
    <WithMobileViewport>
      <p>Mobile story</p>
    </WithMobileViewport>,
  );

  const story = screen.getByText('Mobile story');
  expect(story).toBeInTheDocument();
  expect(story.parentElement?.style.width).toBe('22rem');
  expect(window.matchMedia('(max-width: 40rem)').matches).toBe(true);
});
