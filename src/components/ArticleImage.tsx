import Image from 'next/image';

function isSvgSrc(src: string) {
  return /\.svg($|\?)/i.test(src);
}

export function ArticleImage({
  src,
  alt = '',
  sizes,
  priority = false,
}: {
  src: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
}) {
  if (isSvgSrc(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- next/image does not optimize SVG
      <img src={src} alt={alt} />
    );
  }

  return (
    <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
  );
}
