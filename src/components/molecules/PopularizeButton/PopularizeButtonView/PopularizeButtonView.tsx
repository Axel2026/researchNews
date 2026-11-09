import { Button } from '@/components/atoms/Button/Button';
import { Select } from '@/components/atoms/Field/Select/Select';
import styles from '../PopularizeButton.module.css';
import type { PopularizeButtonViewProps } from './PopularizeButtonView.types';

export function PopularizeButtonView({
  status,
  providers,
  provider,
  message,
  signInHref,
  accountHref,
  copy,
  onProviderChange,
  onPopularize,
}: PopularizeButtonViewProps) {
  if (status === 'pending') {
    return (
      <p className={styles.pending} role="status">
        {copy.loading}
      </p>
    );
  }

  if (status === 'anonymous') {
    return (
      <Button href={signInHref} variant="secondary">
        {copy.signIn}
      </Button>
    );
  }

  if (status === 'needs-key') {
    return (
      <Button href={accountHref} variant="secondary">
        {copy.needsKey}
      </Button>
    );
  }

  const busy = status === 'busy';
  const options = providers.map((value) => ({
    value,
    label: copy.providers[value],
  }));
  const showProvider = providers.length > 1;

  return (
    <div className={styles.root}>
      {showProvider ? (
        <Select
          label={copy.provider}
          value={provider}
          options={options}
          disabled={busy}
          onChange={onProviderChange}
        />
      ) : null}
      <Button
        type="button"
        disabled={busy}
        aria-busy={busy}
        onClick={onPopularize}
      >
        {busy ? copy.pending : copy.action}
      </Button>
      {message ? (
        <p className={styles.message} role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
