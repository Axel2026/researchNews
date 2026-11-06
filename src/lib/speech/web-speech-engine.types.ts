import type { ArticleSpeechStartOptions } from './speech.types';

export type SpeechChunk = {
  segmentId: string;
  text: string;
  announce: boolean;
};

export type SpeechSession = {
  options: ArticleSpeechStartOptions;
  queue: SpeechChunk[];
  voice: SpeechSynthesisVoice | undefined;
  paused: boolean;
  ready: boolean;
  timer: number | null;
  cancelVoiceWait: (() => void) | null;
};
