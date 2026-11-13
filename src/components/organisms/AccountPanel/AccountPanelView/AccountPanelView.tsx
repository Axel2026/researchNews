import type { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Field/Input/Input';
import { Select } from '@/components/atoms/Field/Select/Select';
import { AI_MODELS } from '@/data/ai-models';
import { AI_PROVIDERS, type AiProvider } from '@/data/ai-keys.types';
import styles from '../AccountPanel.module.css';
import type { AccountPanelViewProps } from './AccountPanelView.types';

export function AccountPanelView({
  keys,
  provider,
  model,
  apiKey,
  status,
  copy,
  onProviderChange,
  onModelChange,
  onApiKeyChange,
  onSave,
  onRemove,
}: AccountPanelViewProps) {
  const saved = keys.find((key) => key.provider === provider);
  const busy =
    status === 'saving' || status === 'removing' || status === 'loading';
  const options = AI_PROVIDERS.map((value) => ({
    value,
    label: copy.providers[value],
  }));
  const catalog = AI_MODELS[provider];
  const modelIds = catalog.includes(model) ? catalog : [model, ...catalog];
  const modelOptions = modelIds.map((value) => ({ value, label: value }));
  const currentText = saved ? copy.current(saved.last4) : copy.empty;
  const stateText = status === 'loading' ? copy.loading : currentText;
  const feedback =
    status === 'saved'
      ? copy.saved
      : status === 'removed'
        ? copy.removed
        : status === 'invalid'
          ? copy.invalid
          : status === 'error'
            ? copy.error
            : null;
  const saveDisabled = busy || (!saved && apiKey.trim().length === 0);
  const savedRows = AI_PROVIDERS.flatMap((value) => {
    const key = keys.find((item) => item.provider === value);
    if (!key) {
      return [];
    }

    const name = copy.providers[key.provider];
    return [
      {
        provider: key.provider,
        name,
        model: key.model,
        ending: copy.current(key.last4),
        selected: key.provider === provider,
        label: copy.editSaved(name),
      },
    ];
  });
  const listNote = status === 'loading' ? copy.loading : copy.listEmpty;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave();
  }

  function changeKey(event: ChangeEvent<HTMLInputElement>) {
    onApiKeyChange(event.currentTarget.value);
  }

  function changeProvider(value: string) {
    onProviderChange(value as AiProvider);
  }

  function chooseSaved(event: MouseEvent<HTMLButtonElement>) {
    onProviderChange(event.currentTarget.value);
  }

  return (
    <div className={styles.panel}>
      <section className={styles.saved} aria-labelledby="saved-keys-heading">
        <h2 id="saved-keys-heading" className={styles.savedTitle}>
          {copy.listHeading}
        </h2>
        {savedRows.length === 0 ? (
          <p className={styles.status}>{listNote}</p>
        ) : (
          <ul className={styles.savedList}>
            {savedRows.map((row) => (
              <li key={row.provider}>
                <button
                  type="button"
                  className={styles.savedItem}
                  value={row.provider}
                  aria-pressed={row.selected}
                  aria-labelledby={`${row.provider}-saved-action ${row.provider}-saved-name ${row.provider}-saved-model ${row.provider}-saved-ending`}
                  disabled={busy}
                  onClick={chooseSaved}
                >
                  <span
                    id={`${row.provider}-saved-action`}
                    className={styles.visuallyHidden}
                  >
                    {row.label}
                  </span>
                  <span
                    id={`${row.provider}-saved-name`}
                    className={styles.savedProvider}
                  >
                    {row.name}
                  </span>
                  <span
                    id={`${row.provider}-saved-model`}
                    className={styles.savedModel}
                  >
                    {row.model}
                  </span>
                  <span
                    id={`${row.provider}-saved-ending`}
                    className={styles.savedEnding}
                  >
                    {row.ending}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <form className={styles.form} onSubmit={submit}>
        <Select
          label={copy.provider}
          value={provider}
          options={options}
          disabled={busy}
          onChange={changeProvider}
        />
        <Select
          label={copy.model}
          value={model}
          options={modelOptions}
          disabled={busy}
          onChange={onModelChange}
        />
        <Input
          label={copy.apiKey}
          type="password"
          name="apiKey"
          autoComplete="off"
          value={apiKey}
          disabled={busy}
          required={!saved}
          onChange={changeKey}
        />
        <p className={styles.status}>{stateText}</p>
        {feedback ? (
          <p className={styles.message} role="status">
            {feedback}
          </p>
        ) : null}
        <div className={styles.actions}>
          <Button type="submit" disabled={saveDisabled} aria-busy={busy}>
            {copy.save}
          </Button>
          {saved ? (
            <Button
              type="button"
              variant="secondary"
              disabled={busy}
              onClick={onRemove}
            >
              {copy.remove}
            </Button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
