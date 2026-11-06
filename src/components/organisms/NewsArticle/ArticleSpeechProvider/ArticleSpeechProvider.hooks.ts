'use client';

import { createContext, useContext } from 'react';
import type { ArticleSpeechContextValue } from './ArticleSpeechProvider.types';

export const ArticleSpeechContext =
  createContext<ArticleSpeechContextValue | null>(null);

export function useArticleSpeech(): ArticleSpeechContextValue {
  const value = useContext(ArticleSpeechContext);

  if (!value) {
    throw new Error(
      'useArticleSpeech must be used within ArticleSpeechProvider',
    );
  }

  return value;
}
