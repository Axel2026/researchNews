import type { CommentReply, CommentThread } from '@/data/comments.types';

export type DiscussionLoadStatus = 'pending' | 'ready' | 'error';

export type DiscussionAuthStatus = 'pending' | 'anonymous' | 'authenticated';

export type ArticleDiscussionCopy = {
  title: string;
  empty: string;
  loading: string;
  error: string;
  signIn: string;
  placeholder: string;
  replyPlaceholder: string;
  submit: string;
  replySubmit: string;
  reply: string;
  edit: string;
  save: string;
  cancel: string;
  delete: string;
  deleted: string;
  edited: string;
  truncated: string;
  required: string;
  tooLong: string;
  composerLabel: string;
  replyLabel: string;
  editLabel: string;
  editHint: string;
  editHintLabel: string;
};

export type ArticleDiscussionViewProps = {
  status: DiscussionLoadStatus;
  authStatus: DiscussionAuthStatus;
  comments: CommentThread[];
  truncated?: boolean;
  currentUserId?: string | null;
  nextPath: string;
  replyToId?: string | null;
  editingId?: string | null;
  busy?: boolean;
  formError?: string | null;
  composerKey?: number;
  copy: ArticleDiscussionCopy;
  formatDate: (iso: string) => string;
  onSubmit?: (body: string, parentId?: string) => void;
  onReply?: (id: string | null) => void;
  onEdit?: (id: string | null) => void;
  onDelete?: (id: string) => void;
};

export type CommentEntryProps = {
  comment: CommentThread | CommentReply;
  currentUserId: string | null;
  authStatus: DiscussionAuthStatus;
  replyToId: string | null;
  editingId: string | null;
  busy: boolean;
  formError: string | null;
  copy: ArticleDiscussionCopy;
  formatDate: (iso: string) => string;
  onSubmit?: (body: string, parentId?: string) => void;
  onReply?: (id: string | null) => void;
  onEdit?: (id: string | null) => void;
  onDelete?: (id: string) => void;
};

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
