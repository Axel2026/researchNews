import type { AiProvider } from '@/data/ai-keys.types';
import type { AppHref } from '@/components/atoms/Button/Button.types';

export type PopularizeStatus =
  'pending' | 'anonymous' | 'needs-key' | 'ready' | 'busy';

export type PopularizeCopy = {
  action: string;
  pending: string;
  signIn: string;
  needsKey: string;
  provider: string;
  loading: string;
  providers: Record<AiProvider, string>;
};

export type PopularizeButtonViewProps = {
  status: PopularizeStatus;
  providers: AiProvider[];
  provider: AiProvider;
  message: string | null;
  signInHref: AppHref;
  accountHref: AppHref;
  copy: PopularizeCopy;
  onProviderChange: (provider: string) => void;
  onPopularize: () => void;
};
