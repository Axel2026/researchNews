'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { ArticleListenStatus } from '@/components/molecules/ArticleListen/ArticleListenView';
import type { ArticleSpeechEngine, SpeechSegment } from '@/lib/speech/types';
import { webSpeechEngine } from '@/lib/speech/web-speech-engine';

type ArticleSpeechContextValue = {
  status: ArticleListenStatus;
  activeSegmentId: string | null;
  play: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

const ArticleSpeechContext = createContext<ArticleSpeechContextValue | null>(
  null,
);

export function useArticleSpeech(): ArticleSpeechContextValue {
  const value = useContext(ArticleSpeechContext);

  if (!value) {
    throw new Error(
      'useArticleSpeech must be used within ArticleSpeechProvider',
    );
  }

  return value;
}

export function ArticleSpeechProvider({
  articleId,
  segments,
  lang,
  rate = 1,
  engine = webSpeechEngine,
  children,
}: {
  articleId: string;
  segments: SpeechSegment[];
  lang: string;
  rate?: number;
  engine?: ArticleSpeechEngine;
  children: ReactNode;
}) {
  const [trackedArticleId, setTrackedArticleId] = useState(articleId);
  const [status, setStatus] = useState<ArticleListenStatus>('idle');
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null);
  const statusRef = useRef<ArticleListenStatus>('idle');
  const playbackRef = useRef(0);

  if (trackedArticleId !== articleId) {
    setTrackedArticleId(articleId);
    setStatus('idle');
    setActiveSegmentId(null);
  }

  const updateStatus = useCallback((next: ArticleListenStatus) => {
    statusRef.current = next;
    setStatus(next);
  }, []);

  useLayoutEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    if (engine.supported()) {
      return;
    }

    const timeout = window.setTimeout(() => {
      updateStatus('unavailable');
    }, 0);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [articleId, engine, updateStatus]);

  useLayoutEffect(() => {
    return () => {
      playbackRef.current += 1;
      engine.stop();
    };
  }, [articleId, engine]);

  const play = useCallback(() => {
    if (!engine.supported()) {
      updateStatus('unavailable');
      return;
    }

    if (
      statusRef.current === 'playing' ||
      statusRef.current === 'paused' ||
      statusRef.current === 'unavailable'
    ) {
      return;
    }

    const playback = playbackRef.current + 1;
    playbackRef.current = playback;
    statusRef.current = 'playing';

    engine.start({
      segments,
      lang,
      rate,
      onSegmentStart: (id) => {
        if (playbackRef.current !== playback) {
          return;
        }

        updateStatus('playing');
        setActiveSegmentId(id);
      },
      onEnd: () => {
        if (playbackRef.current !== playback) {
          return;
        }

        setActiveSegmentId(null);
        updateStatus('idle');
      },
      onError: (reason) => {
        if (playbackRef.current !== playback) {
          return;
        }

        setActiveSegmentId(null);
        updateStatus(reason === 'no-voice' ? 'noVoice' : 'idle');
      },
    });
  }, [engine, lang, rate, segments, updateStatus]);

  const pause = useCallback(() => {
    if (statusRef.current !== 'playing') {
      return;
    }

    engine.pause();
    updateStatus('paused');
  }, [engine, updateStatus]);

  const resume = useCallback(() => {
    if (statusRef.current !== 'paused') {
      return;
    }

    engine.resume();
    updateStatus('playing');
  }, [engine, updateStatus]);

  const stop = useCallback(() => {
    playbackRef.current += 1;
    engine.stop();
    setActiveSegmentId(null);
    updateStatus(engine.supported() ? 'idle' : 'unavailable');
  }, [engine, updateStatus]);

  const value = useMemo(
    () => ({
      status,
      activeSegmentId,
      play,
      pause,
      resume,
      stop,
    }),
    [activeSegmentId, pause, play, resume, status, stop],
  );

  return (
    <ArticleSpeechContext.Provider value={value}>
      {children}
    </ArticleSpeechContext.Provider>
  );
}
