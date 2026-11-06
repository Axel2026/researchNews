import { Input } from '@/components/atoms/Field/Input/Input';
import type { AuthTextFieldProps } from './AuthTextField.types';

export function AuthTextField({ ...fields }: AuthTextFieldProps) {
  return <Input required {...fields} />;
}
