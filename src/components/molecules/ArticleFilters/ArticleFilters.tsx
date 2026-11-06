'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/atoms/Button/Button';
import { DateInput } from '@/components/atoms/Field/DateInput';
import { Input } from '@/components/atoms/Field/Input';
import { Select } from '@/components/atoms/Field/Select';
import type { ArticleCategory } from '@/data/articles';
import styles from './ArticleFilters.module.css';

export type ArticleFilterValues = {
  field: string;
  sort: 'newest' | 'popular';
  author: string;
  from: string;
  to: string;
};

export function ArticleFilters({
  categories,
  values,
  onChange,
  onClear,
  dateError,
  lockedField,
}: {
  categories: ArticleCategory[];
  values: ArticleFilterValues;
  onChange: (next: ArticleFilterValues) => void;
  onClear: () => void;
  dateError?: string;
  lockedField?: string;
}) {
  const t = useTranslations('Filters');
  const dateErrorId = useId();

  return (
    <fieldset className={styles.root}>
      <legend className={styles.legend}>{t('legend')}</legend>
      {lockedField == null ? (
        <Select
          className={styles.control}
          label={t('field')}
          value={values.field}
          options={[
            { value: '', label: t('allFields') },
            ...categories.map((category) => ({
              value: category.slug,
              label: category.field,
            })),
          ]}
          onChange={(field) => onChange({ ...values, field })}
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
        onChange={(event) =>
          onChange({ ...values, author: event.target.value })
        }
      />
      <DateInput
        className={styles.control}
        label={t('from')}
        value={values.from}
        invalid={Boolean(dateError)}
        describedBy={dateError ? dateErrorId : undefined}
        onChange={(event) => onChange({ ...values, from: event.target.value })}
      />
      <DateInput
        className={styles.control}
        label={t('to')}
        value={values.to}
        invalid={Boolean(dateError)}
        describedBy={dateError ? dateErrorId : undefined}
        onChange={(event) => onChange({ ...values, to: event.target.value })}
      />
      <Select
        className={styles.control}
        label={t('sort')}
        value={values.sort}
        options={[
          { value: 'newest', label: t('newest') },
          { value: 'popular', label: t('popular') },
        ]}
        onChange={(sort) =>
          onChange({
            ...values,
            sort: sort === 'popular' ? 'popular' : 'newest',
          })
        }
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
