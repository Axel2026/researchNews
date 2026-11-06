import type { ComponentProps } from 'react';
import { Input } from './Input';

type DateInputProps = Omit<ComponentProps<typeof Input>, 'type'>;

export function DateInput(props: DateInputProps) {
  return <Input {...props} type="date" />;
}
