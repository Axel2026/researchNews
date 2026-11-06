import { type ReactNode } from 'react';

import type { ArticleListenStatus } from '@/components/molecules/ArticleListen/ArticleListenView.types';

import type {
  ArticleSpeechEngine,
  SpeechSegment,
} from '@/lib/speech/speech.types';

export type ArticleSpeechContextValue = {
  status: ArticleListenStatus;
  activeSegmentId: string | null;
  play: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

export type ArticleSpeechProviderProps = {
  articleId: string;
  segments: SpeechSegment[];
  lang: string;
  rate?: number;
  engine?: ArticleSpeechEngine;
  children: ReactNode;
};
