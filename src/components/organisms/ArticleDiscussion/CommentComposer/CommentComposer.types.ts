import type { ArticleDiscussionCopy } from '../ArticleDiscussionView/ArticleDiscussionView.types';

export type CommentComposerProps = {
  initialBody?: string;
  label: string;
  placeholder: string;
  submitLabel: string;
  cancelLabel?: string;
  error: string | null;
  busy: boolean;
  copy: Pick<ArticleDiscussionCopy, 'required' | 'tooLong'>;
  onSubmit: (body: string) => void;
  onCancel?: () => void;
};
