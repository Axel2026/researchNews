import type { CommentReply, CommentThread } from '@/data/comments.types';
import type {
  ArticleDiscussionCopy,
  DiscussionAuthStatus,
} from '../ArticleDiscussionView/ArticleDiscussionView.types';

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
