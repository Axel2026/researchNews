import type { AiProvider, StoredAiKey } from '@/data/ai-keys.types';

export type AccountPanelStatus =
  | 'loading'
  | 'idle'
  | 'saving'
  | 'removing'
  | 'saved'
  | 'removed'
  | 'invalid'
  | 'error';

export type AccountPanelCopy = {
  provider: string;
  model: string;
  apiKey: string;
  save: string;
  remove: string;
  saved: string;
  removed: string;
  empty: string;
  listHeading: string;
  listEmpty: string;
  editSaved: (name: string) => string;
  current: (last4: string) => string;
  invalid: string;
  error: string;
  loading: string;
  providers: Record<AiProvider, string>;
};

export type AccountPanelViewProps = {
  keys: StoredAiKey[];
  provider: AiProvider;
  model: string;
  apiKey: string;
  status: AccountPanelStatus;
  copy: AccountPanelCopy;
  onProviderChange: (provider: string) => void;
  onModelChange: (model: string) => void;
  onApiKeyChange: (value: string) => void;
  onSave: () => void;
  onRemove: () => void;
};
