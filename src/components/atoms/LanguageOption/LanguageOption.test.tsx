import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { LanguageOption } from './LanguageOption';

it('marks the current language', () => {
  renderWithIntl(<LanguageOption code="en" current pathname="/" />);

  const option = screen.getByRole('link', { name: /English/ });
  expect(option).toHaveAttribute('aria-current', 'true');
  expect(option).toHaveTextContent('EN');
});
