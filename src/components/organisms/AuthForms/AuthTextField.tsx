'use client';

import type { ComponentProps } from 'react';
import { Input } from '@/components/atoms/Field/Input';

export function focusFirstInvalidField(form: HTMLFormElement) {
  window.setTimeout(() => {
    form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, 0);
}

export function AuthTextField(
  props: Omit<ComponentProps<typeof Input>, 'required'>,
) {
  return <Input required {...props} />;
}
