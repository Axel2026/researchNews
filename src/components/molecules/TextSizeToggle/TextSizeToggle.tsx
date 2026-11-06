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

  const mark = large ? 'A-' : 'A+';
  const actionLabel = large ? t('defaultText') : t('largerText');
  const name = `${mark}, ${actionLabel}`;

  return (
    <button
      type="button"
      className={styles.button}
      aria-pressed={large}
      aria-label={name}
      onClick={toggleTextSize}
    >
      <span aria-hidden="true">{mark}</span>
    </button>
  );
}
