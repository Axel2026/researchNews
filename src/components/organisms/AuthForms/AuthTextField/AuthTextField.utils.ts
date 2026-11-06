import type { FocusFirstInvalidFieldParams } from './AuthTextField.utils.types';
export function focusFirstInvalidField({ form }: FocusFirstInvalidFieldParams) {
  window.setTimeout(() => {
    form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, 0);
}
