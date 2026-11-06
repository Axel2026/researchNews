'use client';

import { useState } from 'react';
import { ForgotPasswordFormView } from '../ForgotPasswordFormView/ForgotPasswordFormView';
import type { ForgotPasswordFormStatus } from '../ForgotPasswordFormView/ForgotPasswordFormView.types';

export function ForgotPasswordForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<ForgotPasswordFormStatus>('form');

  function markSent() {
    setStatus('sent');
  }

  return (
    <ForgotPasswordFormView
      status={status}
      formError={formError}
      onFormError={setFormError}
      onSent={markSent}
    />
  );
}
