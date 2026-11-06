import type { ComponentProps } from 'react';

import { Input } from '@/components/atoms/Field/Input';

export type AuthTextFieldProps = Omit<ComponentProps<typeof Input>, 'required'>;
