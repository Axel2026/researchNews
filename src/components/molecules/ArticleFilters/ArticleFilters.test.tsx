import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { sampleCategories } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import { ArticleFilters } from './ArticleFilters';
import type { ArticleFilterValues } from './ArticleFilters.types';

const values: ArticleFilterValues = {
  field: '',
  sort: 'newest',
  author: '',
  from: '',
  to: '',
};

it('reports a field, an author, and a sort change', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  renderWithIntl(
    <ArticleFilters
      categories={sampleCategories}
      values={values}
      onChange={onChange}
      onClear={() => undefined}
    />,
  );

  expect(screen.getByRole('group', { name: 'Filters' })).toBeInTheDocument();

  screen.getByRole('combobox', { name: 'Field' }).focus();
  await user.keyboard('b');
  expect(onChange).toHaveBeenCalledWith({
    ...values,
    field: 'biochemistry',
  });

  await user.type(screen.getByRole('textbox', { name: 'Author' }), 'A');
  expect(onChange).toHaveBeenCalledWith({ ...values, author: 'A' });

  screen.getByRole('combobox', { name: 'Sort' }).focus();
  await user.keyboard('m');
  expect(onChange).toHaveBeenCalledWith({ ...values, sort: 'popular' });
});

it('clears the filters and shows a date error', async () => {
  const user = userEvent.setup();
  const onClear = vi.fn();
  renderWithIntl(
    <ArticleFilters
      categories={sampleCategories}
      values={values}
      onChange={() => undefined}
      onClear={onClear}
      dateError="The start date is after the end date."
    />,
  );

  expect(screen.getByRole('alert')).toHaveTextContent(
    'The start date is after the end date.',
  );

  await user.click(screen.getByRole('button', { name: 'Clear filters' }));
  expect(onClear).toHaveBeenCalledOnce();
});

it('hides the field control when the field is locked', () => {
  renderWithIntl(
    <ArticleFilters
      categories={sampleCategories}
      values={{ ...values, field: 'biochemistry' }}
      onChange={() => undefined}
      onClear={() => undefined}
      lockedField="biochemistry"
    />,
  );

  expect(
    screen.queryByRole('combobox', { name: 'Field' }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: 'Sort' })).toBeInTheDocument();
});
