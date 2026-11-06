export type SpeechSegment = {
  id: string;
  text: string;
};

export type ArticleSpeechStartOptions = {
  segments: SpeechSegment[];
  lang: string;
  rate: number;
  onSegmentStart: (id: string) => void;
  onEnd: () => void;
  onError: (reason: 'failed' | 'no-voice') => void;
};

export type ArticleSpeechEngine = {
  supported(): boolean;
  start(options: ArticleSpeechStartOptions): void;
  pause(): void;
  resume(): void;
  stop(): void;
};
