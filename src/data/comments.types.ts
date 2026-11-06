export type CommentAuthor = {
  id: string;
  displayName: string;
};

export type CommentReply = {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  author: CommentAuthor;
};

export type CommentThread = CommentReply & {
  replies: CommentReply[];
};

export type CommentsList = {
  comments: CommentThread[];
  truncated: boolean;
};
