import Image from 'next/image';
import type { ArticleImageProps } from './ArticleImage.types';

function isSvgSrc(src: string) {
  return /\.svg($|\?)/i.test(src);
}

export function ArticleImage({
  src,
  alt = '',
  sizes,
  priority = false,
}: ArticleImageProps) {
  if (isSvgSrc(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- next/image does not optimize SVG
      <img src={src} alt={alt} />
    );
  }

  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />;
}
