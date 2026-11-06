import type { IsSvgSrcParams } from './ArticleImage.utils.types';
export function isSvgSrc({ src }: IsSvgSrcParams) {
  return /\.svg($|\?)/i.test(src);
}
