import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { sampleCategories } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { Header } from './Header';

it('shows the brand and the articles link', () => {
  renderWithIntl(<Header categories={sampleCategories} />);

  expect(screen.getByRole('img', { name: 'ResearchNews' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Articles' })).toBeInTheDocument();
});
