import { Input } from '../Input/Input';
import type { DateInputProps } from './DateInput.types';

export function DateInput({ ...fields }: DateInputProps) {
  return <Input {...fields} type="date" />;
}
