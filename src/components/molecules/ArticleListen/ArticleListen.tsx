'use client';

import { useTranslations } from 'next-intl';
import { useArticleSpeech } from '@/components/organisms/NewsArticle/ArticleSpeechProvider/ArticleSpeechProvider.hooks';
import { ArticleListenView } from './ArticleListenView/ArticleListenView';

export function ArticleListen() {
  const t = useTranslations();
  const speech = useArticleSpeech();

  return (
    <ArticleListenView
      status={speech.status}
      onPlay={speech.play}
      onPause={speech.pause}
      onResume={speech.resume}
      copy={{
        listen: t('News.listen'),
        pause: t('News.pause'),
        resume: t('News.resume'),
        unavailable: t('News.listenUnavailable'),
        noVoice: t('News.listenNoVoice'),
        noVoiceHint: t('News.listenNoVoiceHint'),
        noVoiceHintLink: t('News.listenNoVoiceHintLink'),
        noVoiceHintLabel: t('News.listenNoVoiceHintLabel'),
        opensNewTab: t('News.opensNewTab'),
      }}
    />
  );
}
