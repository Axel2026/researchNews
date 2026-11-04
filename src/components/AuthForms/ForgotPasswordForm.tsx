'use client';

import { useState } from 'react';
import {
  ForgotPasswordFormView,
  type ForgotPasswordFormStatus,
} from './ForgotPasswordFormView';

export function ForgotPasswordForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<ForgotPasswordFormStatus>('form');

  return (
    <ForgotPasswordFormView
      status={status}
      formError={formError}
      onFormError={setFormError}
      onSent={() => setStatus('sent')}
    />
  );
}
