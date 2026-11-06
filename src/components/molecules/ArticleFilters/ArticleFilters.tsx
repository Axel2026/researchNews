'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/atoms/Button/Button';
import { DateInput } from '@/components/atoms/Field/DateInput/DateInput';
import { Input } from '@/components/atoms/Field/Input/Input';
import { Select } from '@/components/atoms/Field/Select/Select';
import styles from './ArticleFilters.module.css';
import type { ArticleFiltersProps } from './ArticleFilters.types';

export function ArticleFilters({
  categories,
  values,
  onChange,
  onClear,
  dateError,
  lockedField,
}: ArticleFiltersProps) {
  const t = useTranslations('Filters');
  const dateErrorId = useId();
  const fieldOptions = [
    { value: '', label: t('allFields') },
    ...categories.map((category) => ({
      value: category.slug,
      label: category.field,
    })),
  ];
  const sortOptions = [
    { value: 'newest', label: t('newest') },
    { value: 'popular', label: t('popular') },
  ];
  const dateDescribedBy = dateError ? dateErrorId : undefined;

  function changeField(field: string) {
    onChange({ ...values, field });
  }

  function changeAuthor(event: { target: { value: string } }) {
    onChange({ ...values, author: event.target.value });
  }

  function changeFrom(event: { target: { value: string } }) {
    onChange({ ...values, from: event.target.value });
  }

  function changeTo(event: { target: { value: string } }) {
    onChange({ ...values, to: event.target.value });
  }

  function changeSort(sort: string) {
    onChange({
      ...values,
      sort: sort === 'popular' ? 'popular' : 'newest',
    });
  }

  return (
    <fieldset className={styles.root}>
      <legend className={styles.legend}>{t('legend')}</legend>
      {lockedField == null ? (
        <Select
          className={styles.control}
          label={t('field')}
          value={values.field}
          options={fieldOptions}
          onChange={changeField}
        />
      ) : null}
      <Input
        className={styles.control}
        label={t('author')}
        type="text"
        value={values.author}
        placeholder={t('authorPlaceholder')}
        autoComplete="off"
        maxLength={200}
        onChange={changeAuthor}
      />
      <DateInput
        className={styles.control}
        label={t('from')}
        value={values.from}
        invalid={Boolean(dateError)}
        describedBy={dateDescribedBy}
        onChange={changeFrom}
      />
      <DateInput
        className={styles.control}
        label={t('to')}
        value={values.to}
        invalid={Boolean(dateError)}
        describedBy={dateDescribedBy}
        onChange={changeTo}
      />
      <Select
        className={styles.control}
        label={t('sort')}
        value={values.sort}
        options={sortOptions}
        onChange={changeSort}
      />
      {dateError ? (
        <p className={styles.error} id={dateErrorId} role="alert">
          {dateError}
        </p>
      ) : null}
      <Button
        className={styles.clear}
        type="button"
        variant="secondary"
        onClick={onClear}
      >
        {t('clear')}
      </Button>
    </fieldset>
  );
}
