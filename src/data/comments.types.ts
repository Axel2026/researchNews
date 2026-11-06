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

export type IsWithinCommentEditWindowParams = {
  createdAt: string;
  now?: number;
};

export type CommentsUrlParams = {
  slug: string;
};

export type ThrowFromParams = {
  response: Response;
};

export type ListCommentsParams = {
  slug: string;
};

export type CreateCommentParams = {
  slug: string;
  body: string;
  accessToken: string;
  parentId?: string;
};

export type UpdateCommentParams = {
  id: string;
  body: string;
  accessToken: string;
};

export type DeleteCommentParams = {
  id: string;
  accessToken: string;
};
