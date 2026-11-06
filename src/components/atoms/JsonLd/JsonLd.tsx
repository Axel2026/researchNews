import type { JsonLdProps } from './JsonLd.types';

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replaceAll('<', '\\u003c'),
      }}
    />
  );
}
