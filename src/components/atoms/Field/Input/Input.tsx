import { useId } from 'react';
import styles from '../field.module.css';
import type { InputProps } from './Input.types';

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
}: InputProps) {
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
  const ariaRequired = required || undefined;
  const ariaInvalid = isInvalid || undefined;
  const ariaDescribedBy = described || undefined;

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
            aria-required={ariaRequired}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
          />
          {action}
        </div>
      ) : (
        <input
          {...inputProps}
          id={inputId}
          className={controlClass}
          required={required}
          aria-required={ariaRequired}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
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
