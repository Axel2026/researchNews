import type { ArticleSpeechEngine } from './speech.types';
import type {
  SpeechChunk,
  SpeechSession,
  VoiceRankParams,
  PickVoiceParams,
  SplitSentencesParams,
  SplitLongPieceParams,
  ChunksForSegmentParams,
  CreateWebSpeechEngineParams,
} from './web-speech-engine.types';

const VOICE_WAIT_MS = 1000;
const SPEAK_DELAY_MS = 50;
const NUDGE_MS = 10000;
const MAX_CHUNK_LENGTH = 160;

/** Returns the browser speech synthesizer, or null during SSR and in browsers without the API. */
function defaultSynth(): SpeechSynthesis | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return null;
  }

  return window.speechSynthesis;
}

/**
 * Scores how well a voice matches the requested language.
 * An exact locale ranks above a shared language prefix, and a local voice ranks above a remote one.
 * Returns null when the language does not match at all.
 */
function voiceRank({ voice, lang }: VoiceRankParams): number | null {
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

/** Chooses the highest-ranked installed voice for the requested language. */
function pickVoice({
  voices,
  lang,
}: PickVoiceParams): SpeechSynthesisVoice | undefined {
  let selected: SpeechSynthesisVoice | undefined;
  let bestRank = -1;

  for (const voice of voices) {
    const rank = voiceRank({ voice, lang });

    if (rank !== null && rank > bestRank) {
      selected = voice;
      bestRank = rank;
    }
  }

  return selected;
}

/** Splits text into sentences and keeps the trailing punctuation on each one. */
function splitSentences({ text }: SplitSentencesParams): string[] {
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

/** Breaks a long sentence into word-bounded pieces no longer than MAX_CHUNK_LENGTH. */
function splitLongPiece({ text }: SplitLongPieceParams): string[] {
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

/**
 * Turns one article segment into speakable chunks.
 * Only the first chunk is marked for announcement, so segment highlighting fires once per segment.
 */
function chunksForSegment({ segment }: ChunksForSegmentParams): SpeechChunk[] {
  const sentences = splitSentences({ text: segment.text });
  const pieces = sentences.length > 0 ? sentences : [segment.text];
  const chunks: SpeechChunk[] = [];

  for (const piece of pieces) {
    const parts =
      piece.length <= MAX_CHUNK_LENGTH
        ? [piece]
        : splitLongPiece({ text: piece });

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

/** Builds an article reader on top of the Web Speech API, with one active session at a time. */
export function createWebSpeechEngine({
  synth = defaultSynth(),
}: CreateWebSpeechEngineParams = {}): ArticleSpeechEngine {
  let session: SpeechSession | null = null;
  let nudgeTimer: number | null = null;

  /** Stops the keep-alive interval that prevents Chrome from dropping long playback. */
  const clearNudge = () => {
    if (nudgeTimer === null || typeof window === 'undefined') {
      nudgeTimer = null;
      return;
    }

    window.clearInterval(nudgeTimer);
    nudgeTimer = null;
  };

  /**
   * Starts a pause/resume nudge while speech is active.
   * Chrome drops speechSynthesis after about 15s unless it is nudged.
   */
  const ensureNudge = () => {
    if (!synth || nudgeTimer !== null || typeof window === 'undefined') {
      return;
    }

    nudgeTimer = window.setInterval(() => {
      if (!session || session.paused || !synth.speaking || synth.paused) {
        return;
      }

      synth.pause();
      synth.resume();
    }, NUDGE_MS);
  };

  /** Cancels a session's delayed-speak timer. */
  const clearTimer = (current: SpeechSession) => {
    if (current.timer === null || typeof window === 'undefined') {
      current.timer = null;
      return;
    }

    window.clearTimeout(current.timer);
    current.timer = null;
  };

  /** Drops the current session, pending timers, and anything already queued in the synthesizer. */
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

  /** Speaks the next chunk, or ends the session when the queue is empty. */
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

  /** Speaks the next chunk after a short delay so the synthesizer can settle between utterances. */
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

  /** Resolves a voice for the session and starts playback unless the session is paused. */
  const begin = (current: SpeechSession) => {
    if (!synth || session !== current) {
      return;
    }

    const voice = pickVoice({
      voices: synth.getVoices(),
      lang: current.options.lang,
    });
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
    /** Reports whether this environment exposes speechSynthesis. */
    supported() {
      return synth !== null;
    },

    /**
     * Stops any current reading, queues the article segments, and starts once a matching voice is available.
     * If the voice list is still empty, waits for voiceschanged or a short timeout.
     */
    start(options) {
      halt();

      if (!synth) {
        options.onError('failed');
        return;
      }

      const queue = options.segments.flatMap((segment) =>
        chunksForSegment({ segment }),
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

      if (pickVoice({ voices: synth.getVoices(), lang: options.lang })) {
        begin(next);
        return;
      }

      let settled = false;

      /** Ends the voice wait and starts the session, ignoring later voiceschanged or timeout events. */
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

    /** Pauses the current session and the synthesizer without discarding the queue. */
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

    /**
     * Continues a paused session.
     * Resumes the synthesizer when it is mid-utterance, otherwise speaks the next queued chunk.
     */
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

    /** Stops reading and clears the session. */
    stop() {
      halt();
    },
  };
}

/** Shared engine used by the article speech controls. */
export const webSpeechEngine = createWebSpeechEngine({});
