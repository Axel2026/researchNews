import { InfoHint } from '@/components/molecules/InfoHint/InfoHint';
import styles from '../ArticleListen.module.css';
import { PlaybackIcon } from '../PlaybackIcon/PlaybackIcon';
import type { ArticleListenViewProps } from './ArticleListenView.types';
import { primaryLabel } from './ArticleListenView.utils';

const SPEECH_VOICE_HELP_URL =
  'https://support.microsoft.com/en-us/windows/hardware/input-devices/manage-the-language-and-keyboard-input-layout-settings-in-windows';

export function ArticleListenView({
  status,
  copy,
  onPlay,
  onPause,
  onResume,
}: ArticleListenViewProps) {
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

  const pressed = unavailable ? undefined : status === 'playing';

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.control}
        disabled={unavailable}
        aria-label={primaryLabel({ status, copy })}
        aria-pressed={pressed}
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
