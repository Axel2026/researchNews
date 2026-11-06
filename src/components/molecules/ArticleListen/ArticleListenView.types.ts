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

export type PlaybackIconProps = { playing: boolean };

export type ArticleListenViewProps = {
  status: ArticleListenStatus;
  copy: ArticleListenCopy;
  onPlay?: () => void;
  onPause?: () => void;
  onResume?: () => void;
};
