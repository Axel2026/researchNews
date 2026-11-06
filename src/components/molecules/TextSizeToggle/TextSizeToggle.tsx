'use client';

import { useTranslations } from 'next-intl';
import { useSyncExternalStore } from 'react';
import {
  getTextSizeServerSnapshot,
  getTextSizeSnapshot,
  setTextSizeLarge,
  subscribeTextSize,
} from '@/lib/text-size';
import styles from './TextSizeToggle.module.css';

export function TextSizeToggle() {
  const t = useTranslations('Nav');
  const large = useSyncExternalStore(
    (listener) => subscribeTextSize({ listener }),
    getTextSizeSnapshot,
    getTextSizeServerSnapshot,
  );

  function toggleTextSize() {
    setTextSizeLarge({ large: !large });
  }

  return (
    <button
      type="button"
      className={styles.button}
      aria-pressed={large}
      aria-label={t('largerText')}
      onClick={toggleTextSize}
    >
      <span aria-hidden="true">{large ? 'A-' : 'A+'}</span>
    </button>
  );
}
