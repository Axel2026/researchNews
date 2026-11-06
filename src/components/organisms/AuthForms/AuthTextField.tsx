'use client';
import { Input } from '@/components/atoms/Field/Input';
import type { AuthTextFieldProps } from './AuthTextField.types';

export function focusFirstInvalidField(form: HTMLFormElement) {
  window.setTimeout(() => {
    form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, 0);
}

export function AuthTextField(props: AuthTextFieldProps) {
  return <Input required {...props} />;
}
