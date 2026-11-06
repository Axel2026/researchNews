import styles from '../ArticleListen.module.css';
import type { PlaybackIconProps } from './PlaybackIcon.types';

export function PlaybackIcon({ playing }: PlaybackIconProps) {
  if (playing) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M7.2 5.2h3.1a.8.8 0 0 1 .8.8v12a.8.8 0 0 1-.8.8H7.2a.8.8 0 0 1-.8-.8v-12a.8.8 0 0 1 .8-.8Zm6.5 0h3.1a.8.8 0 0 1 .8.8v12a.8.8 0 0 1-.8.8h-3.1a.8.8 0 0 1-.8-.8v-12a.8.8 0 0 1 .8-.8Z"
        />
      </svg>
    );
  }

  return (
    <svg
      className={styles.play}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M8.2 5.4a1 1 0 0 1 1.53-.85l9.2 6.1a1 1 0 0 1 0 1.7l-9.2 6.1A1 1 0 0 1 8.2 17.6V5.4Z"
      />
    </svg>
  );
}
