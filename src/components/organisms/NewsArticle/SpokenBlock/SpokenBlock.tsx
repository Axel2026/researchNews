'use client';
import { useArticleSpeech } from '../ArticleSpeechProvider/ArticleSpeechProvider.hooks';
import type { SpokenBlockProps } from './SpokenBlock.types';

export function SpokenBlock({
  as: Tag,
  segmentId,
  className,
  activeClassName,
  children,
}: SpokenBlockProps) {
  const { activeSegmentId } = useArticleSpeech();
  const classNames = [
    className,
    activeSegmentId === segmentId ? activeClassName : null,
  ]
    .filter(Boolean)
    .join(' ');
  const blockClassName = classNames || undefined;

  return (
    <Tag className={blockClassName} data-speech-id={segmentId}>
      {children}
    </Tag>
  );
}
