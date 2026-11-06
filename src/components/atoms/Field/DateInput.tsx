import { Input } from './Input';
import type { DateInputProps } from './DateInput.types';

export function DateInput(props: DateInputProps) {
  return <Input {...props} type="date" />;
}
