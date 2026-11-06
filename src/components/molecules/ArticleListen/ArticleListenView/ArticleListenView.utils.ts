import type { PrimaryLabelParams } from './ArticleListenView.utils.types';

export function primaryLabel({ status, copy }: PrimaryLabelParams) {
  if (status === 'playing') {
    return copy.pause;
  }

  if (status === 'paused') {
    return copy.resume;
  }

  return copy.listen;
}
