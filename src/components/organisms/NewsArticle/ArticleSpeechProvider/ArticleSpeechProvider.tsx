'use client';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ArticleListenStatus } from '@/components/molecules/ArticleListen/ArticleListenView/ArticleListenView.types';
import { webSpeechEngine } from '@/lib/speech/web-speech-engine';
import type { ArticleSpeechProviderProps } from './ArticleSpeechProvider.types';
import { ArticleSpeechContext } from './ArticleSpeechProvider.hooks';

export function ArticleSpeechProvider({
  articleId,
  segments,
  lang,
  rate = 1,
  engine = webSpeechEngine,
  children,
}: ArticleSpeechProviderProps) {
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
