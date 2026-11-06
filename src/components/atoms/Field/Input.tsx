import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './field.module.css';

export function Input({
  label,
  error,
  action,
  describedBy,
  invalid,
  className,
  id,
  required,
  ...inputProps
}: {
  label: string;
  error?: string;
  action?: ReactNode;
  describedBy?: string;
  invalid?: boolean;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id'> & {
    id?: string;
  }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const showError = Boolean(error);
  const isInvalid = showError || Boolean(invalid);
  const described = [describedBy, showError ? errorId : undefined]
    .filter(Boolean)
    .join(' ');
  const controlClass = [
    styles.control,
    inputProps.type === 'date' ? styles.date : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      {action ? (
        <div className={styles.row}>
          <input
            {...inputProps}
            id={inputId}
            className={controlClass}
            required={required}
            aria-required={required || undefined}
            aria-invalid={isInvalid || undefined}
            aria-describedby={described || undefined}
          />
          {action}
        </div>
      ) : (
        <input
          {...inputProps}
          id={inputId}
          className={controlClass}
          required={required}
          aria-required={required || undefined}
          aria-invalid={isInvalid || undefined}
          aria-describedby={described || undefined}
        />
      )}
      {showError ? (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
