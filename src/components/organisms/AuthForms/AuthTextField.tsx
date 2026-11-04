'use client';

import { useId, type InputHTMLAttributes } from 'react';
import styles from './AuthForms.module.css';

export function focusFirstInvalidField(form: HTMLFormElement) {
  window.setTimeout(() => {
    form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, 0);
}

export function AuthTextField({
  label,
  error,
  ...inputProps
}: {
  label: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id'>) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        className={styles.input}
        aria-invalid={Boolean(error)}
        aria-required="true"
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <span id={errorId} className={styles.fieldError}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
