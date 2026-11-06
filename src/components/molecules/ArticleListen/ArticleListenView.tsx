import { InfoHint } from '@/components/molecules/InfoHint/InfoHint';
import styles from './ArticleListen.module.css';

const SPEECH_VOICE_HELP_URL =
  'https://support.microsoft.com/en-us/windows/hardware/input-devices/manage-the-language-and-keyboard-input-layout-settings-in-windows';

export type ArticleListenStatus =
  'idle' | 'playing' | 'paused' | 'unavailable' | 'noVoice';

export type ArticleListenCopy = {
  listen: string;
  pause: string;
  resume: string;
  unavailable: string;
  noVoice: string;
  noVoiceHint: string;
  noVoiceHintLink: string;
  noVoiceHintLabel: string;
  opensNewTab: string;
};

function primaryLabel(status: ArticleListenStatus, copy: ArticleListenCopy) {
  if (status === 'playing') {
    return copy.pause;
  }

  if (status === 'paused') {
    return copy.resume;
  }

  return copy.listen;
}

function PlaybackIcon({ playing }: { playing: boolean }) {
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

export function ArticleListenView({
  status,
  copy,
  onPlay,
  onPause,
  onResume,
}: {
  status: ArticleListenStatus;
  copy: ArticleListenCopy;
  onPlay?: () => void;
  onPause?: () => void;
  onResume?: () => void;
}) {
  const unavailable = status === 'unavailable';
  const note =
    status === 'unavailable'
      ? copy.unavailable
      : status === 'noVoice'
        ? copy.noVoice
        : null;

  const onPrimary = () => {
    if (status === 'playing') {
      onPause?.();
      return;
    }

    if (status === 'paused') {
      onResume?.();
      return;
    }

    onPlay?.();
  };

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.control}
        disabled={unavailable}
        aria-label={primaryLabel(status, copy)}
        aria-pressed={unavailable ? undefined : status === 'playing'}
        onClick={onPrimary}
      >
        <PlaybackIcon playing={status === 'playing'} />
      </button>
      {status === 'noVoice' ? (
        <p className={styles.note}>
          <InfoHint
            label={copy.noVoiceHintLabel}
            description={copy.noVoiceHint}
            hint={
              <>
                {copy.noVoiceHint}{' '}
                <a
                  href={SPEECH_VOICE_HELP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.noVoiceHintLink}
                  <span className={styles.visuallyHidden}>
                    {copy.opensNewTab}
                  </span>
                </a>
              </>
            }
          >
            {copy.noVoice}
          </InfoHint>
        </p>
      ) : note ? (
        <p className={styles.note}>{note}</p>
      ) : null}
    </div>
  );
}
