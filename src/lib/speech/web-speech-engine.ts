import type {
  ArticleSpeechEngine,
  ArticleSpeechStartOptions,
  SpeechSegment,
} from './types';

const VOICE_WAIT_MS = 1000;
const SPEAK_DELAY_MS = 50;
const NUDGE_MS = 10000;
const MAX_CHUNK_LENGTH = 160;

type SpeechChunk = {
  segmentId: string;
  text: string;
  announce: boolean;
};

type SpeechSession = {
  options: ArticleSpeechStartOptions;
  queue: SpeechChunk[];
  voice: SpeechSynthesisVoice | undefined;
  paused: boolean;
  ready: boolean;
  timer: number | null;
  cancelVoiceWait: (() => void) | null;
};

function defaultSynth(): SpeechSynthesis | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return null;
  }

  return window.speechSynthesis;
}

function voiceRank(voice: SpeechSynthesisVoice, lang: string): number | null {
  const voiceLang = voice.lang.toLowerCase().replaceAll('_', '-');
  const wanted = lang.toLowerCase();

  if (voiceLang === wanted) {
    return voice.localService ? 3 : 2;
  }

  const wantedPrefix = wanted.split('-')[0];
  const voicePrefix = voiceLang.split('-')[0];

  if (wantedPrefix && voicePrefix === wantedPrefix) {
    return voice.localService ? 1 : 0;
  }

  return null;
}

function pickVoice(
  voices: SpeechSynthesisVoice[],
  lang: string,
): SpeechSynthesisVoice | undefined {
  let selected: SpeechSynthesisVoice | undefined;
  let bestRank = -1;

  for (const voice of voices) {
    const rank = voiceRank(voice, lang);

    if (rank !== null && rank > bestRank) {
      selected = voice;
      bestRank = rank;
    }
  }

  return selected;
}

function splitSentences(text: string): string[] {
  const parts = text.split(/([.!?…]+)(?:\s+|$)/u);
  const sentences: string[] = [];

  for (let index = 0; index < parts.length; index += 2) {
    const words = parts[index]?.trim() ?? '';
    const punctuation = parts[index + 1] ?? '';
    const sentence = `${words}${punctuation}`.trim();

    if (sentence) {
      sentences.push(sentence);
    }
  }

  return sentences;
}

function splitLongPiece(text: string): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (next.length > MAX_CHUNK_LENGTH && current) {
      chunks.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
}

function chunksForSegment(segment: SpeechSegment): SpeechChunk[] {
  const sentences = splitSentences(segment.text);
  const pieces = sentences.length > 0 ? sentences : [segment.text];
  const chunks: SpeechChunk[] = [];

  for (const piece of pieces) {
    const parts =
      piece.length <= MAX_CHUNK_LENGTH ? [piece] : splitLongPiece(piece);

    for (const text of parts) {
      chunks.push({
        segmentId: segment.id,
        text,
        announce: chunks.length === 0,
      });
    }
  }

  return chunks;
}

export function createWebSpeechEngine(
  synth: SpeechSynthesis | null = defaultSynth(),
): ArticleSpeechEngine {
  let session: SpeechSession | null = null;
  let nudgeTimer: number | null = null;

  const clearNudge = () => {
    if (nudgeTimer === null || typeof window === 'undefined') {
      nudgeTimer = null;
      return;
    }

    window.clearInterval(nudgeTimer);
    nudgeTimer = null;
  };

  const ensureNudge = () => {
    if (!synth || nudgeTimer !== null || typeof window === 'undefined') {
      return;
    }

    // Chrome drops speechSynthesis after about 15s unless it is nudged.
    nudgeTimer = window.setInterval(() => {
      if (!session || session.paused || !synth.speaking || synth.paused) {
        return;
      }

      synth.pause();
      synth.resume();
    }, NUDGE_MS);
  };

  const clearTimer = (current: SpeechSession) => {
    if (current.timer === null || typeof window === 'undefined') {
      current.timer = null;
      return;
    }

    window.clearTimeout(current.timer);
    current.timer = null;
  };

  const halt = () => {
    const current = session;
    session = null;
    clearNudge();

    if (current) {
      clearTimer(current);
      current.cancelVoiceWait?.();
    }

    synth?.cancel();
  };

  const speakNext = (current: SpeechSession) => {
    if (!synth || session !== current || current.paused) {
      return;
    }

    const chunk = current.queue.shift();

    if (!chunk) {
      session = null;
      clearNudge();
      current.options.onEnd();
      return;
    }

    if (chunk.announce) {
      current.options.onSegmentStart(chunk.segmentId);
    }

    if (!current.voice) {
      session = null;
      clearNudge();
      current.options.onError('no-voice');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunk.text);
    utterance.lang = current.voice.lang;
    utterance.rate = current.options.rate;
    utterance.voice = current.voice;

    utterance.onend = () => {
      if (session !== current) {
        return;
      }

      speakNext(current);
    };

    utterance.onerror = (event) => {
      if (session !== current) {
        return;
      }

      if (event.error === 'interrupted' || event.error === 'canceled') {
        if (!current.paused && !synth.speaking && !synth.paused) {
          scheduleSpeak(current);
        }
        return;
      }

      session = null;
      clearNudge();
      current.options.onError('failed');
    };

    ensureNudge();
    synth.speak(utterance);
  };

  const scheduleSpeak = (current: SpeechSession) => {
    if (typeof window === 'undefined') {
      speakNext(current);
      return;
    }

    clearTimer(current);
    current.timer = window.setTimeout(() => {
      current.timer = null;
      speakNext(current);
    }, SPEAK_DELAY_MS);
  };

  const begin = (current: SpeechSession) => {
    if (!synth || session !== current) {
      return;
    }

    const voice = pickVoice(synth.getVoices(), current.options.lang);
    current.cancelVoiceWait = null;

    if (!voice) {
      session = null;
      current.options.onError('no-voice');
      return;
    }

    current.voice = voice;
    current.ready = true;

    if (!current.paused) {
      scheduleSpeak(current);
    }
  };

  return {
    supported() {
      return synth !== null;
    },

    start(options) {
      halt();

      if (!synth) {
        options.onError('failed');
        return;
      }

      const queue = options.segments.flatMap((segment) =>
        chunksForSegment(segment),
      );
      const next: SpeechSession = {
        options,
        queue,
        voice: undefined,
        paused: false,
        ready: false,
        timer: null,
        cancelVoiceWait: null,
      };

      session = next;

      if (queue.length === 0) {
        session = null;
        options.onEnd();
        return;
      }

      if (pickVoice(synth.getVoices(), options.lang)) {
        begin(next);
        return;
      }

      let settled = false;
      const finish = () => {
        if (settled || session !== next) {
          return;
        }

        settled = true;
        window.clearTimeout(timeout);
        synth.removeEventListener('voiceschanged', finish);
        begin(next);
      };

      const voiceWaitMs = synth.getVoices().length > 0 ? 500 : VOICE_WAIT_MS;
      const timeout = window.setTimeout(finish, voiceWaitMs);
      next.cancelVoiceWait = () => {
        if (settled) {
          return;
        }

        settled = true;
        window.clearTimeout(timeout);
        synth.removeEventListener('voiceschanged', finish);
      };
      synth.addEventListener('voiceschanged', finish);
    },

    pause() {
      if (!session) {
        return;
      }

      session.paused = true;
      clearTimer(session);

      if (synth?.speaking) {
        synth.pause();
      }
    },

    resume() {
      if (!synth || !session?.paused) {
        return;
      }

      session.paused = false;

      if (!session.ready) {
        return;
      }

      if (synth.paused && synth.speaking) {
        synth.resume();
        return;
      }

      if (synth.speaking) {
        return;
      }

      scheduleSpeak(session);
    },

    stop() {
      halt();
    },
  };
}

export const webSpeechEngine = createWebSpeechEngine();
