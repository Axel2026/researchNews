'use client';

import type { ReactNode } from 'react';
import { useArticleSpeech } from './ArticleSpeechProvider';

export function SpokenBlock({
  as: Tag,
  segmentId,
  className,
  activeClassName,
  children,
}: {
  as: 'h1' | 'h2' | 'p';
  segmentId: string;
  className?: string;
  activeClassName: string;
  children: ReactNode;
}) {
  const { activeSegmentId } = useArticleSpeech();
  const classNames = [
    className,
    activeSegmentId === segmentId ? activeClassName : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classNames || undefined} data-speech-id={segmentId}>
      {children}
    </Tag>
  );
}
