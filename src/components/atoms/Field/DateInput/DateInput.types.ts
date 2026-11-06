import type { ComponentProps } from 'react';

import { Input } from '../Input/Input';

export type DateInputProps = Omit<ComponentProps<typeof Input>, 'type'>;
