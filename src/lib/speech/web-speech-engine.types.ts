import type { ArticleSpeechStartOptions, SpeechSegment } from './speech.types';

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

export type VoiceRankParams = {
  voice: SpeechSynthesisVoice;
  lang: string;
};

export type PickVoiceParams = {
  voices: SpeechSynthesisVoice[];
  lang: string;
};

export type SplitSentencesParams = {
  text: string;
};

export type SplitLongPieceParams = {
  text: string;
};

export type ChunksForSegmentParams = {
  segment: SpeechSegment;
};

export type CreateWebSpeechEngineParams = {
  synth?: SpeechSynthesis | null;
};
