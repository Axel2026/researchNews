import { apiUrl } from '@/lib/api';

export const COMMENT_MAX_LENGTH = 2000;
export const COMMENT_EDIT_WINDOW_MS = 60 * 60 * 1000;

export function isWithinCommentEditWindow(
  createdAt: string,
  now = Date.now(),
): boolean {
  const created = Date.parse(createdAt);
  return Number.isFinite(created) && now - created < COMMENT_EDIT_WINDOW_MS;
}

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

export class CommentsApiError extends Error {
  constructor(
    public readonly code: string,
    public readonly status: number,
  ) {
    super(code);
  }
}

function commentsUrl(slug: string): URL {
  return new URL(`/articles/${encodeURIComponent(slug)}/comments`, apiUrl());
}

async function throwFrom(response: Response): Promise<never> {
  const payload = (await response.json().catch(() => null)) as {
    error?: unknown;
  } | null;
  const code =
    payload && typeof payload.error === 'string' ? payload.error : 'unknown';
  throw new CommentsApiError(code, response.status);
}

export async function listComments(slug: string): Promise<CommentsList> {
  const response = await fetch(commentsUrl(slug), { cache: 'no-store' });

  if (!response.ok) {
    await throwFrom(response);
  }

  return response.json() as Promise<CommentsList>;
}

export async function createComment(
  slug: string,
  body: string,
  accessToken: string,
  parentId?: string,
): Promise<CommentReply | CommentThread> {
  const response = await fetch(commentsUrl(slug), {
    method: 'POST',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parentId ? { body, parentId } : { body }),
  });

  if (!response.ok) {
    await throwFrom(response);
  }

  return response.json() as Promise<CommentReply | CommentThread>;
}

export async function updateComment(
  id: string,
  body: string,
  accessToken: string,
): Promise<CommentReply> {
  const response = await fetch(
    new URL(`/comments/${encodeURIComponent(id)}`, apiUrl()),
    {
      method: 'PATCH',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body }),
    },
  );

  if (!response.ok) {
    await throwFrom(response);
  }

  return response.json() as Promise<CommentReply>;
}

export async function deleteComment(
  id: string,
  accessToken: string,
): Promise<{ id: string; deleted: true }> {
  const response = await fetch(
    new URL(`/comments/${encodeURIComponent(id)}`, apiUrl()),
    {
      method: 'DELETE',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    await throwFrom(response);
  }

  return response.json() as Promise<{ id: string; deleted: true }>;
}
