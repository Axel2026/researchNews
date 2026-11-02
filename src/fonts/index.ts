import localFont from 'next/font/local';

export const newsreader = localFont({
  src: [
    {
      path: './newsreader/Newsreader-Variable.ttf',
      style: 'normal',
    },
    {
      path: './newsreader/Newsreader-Italic-Variable.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-newsreader',
  display: 'swap',
  weight: '200 800',
  adjustFontFallback: 'Times New Roman',
});

export const sourceSans = localFont({
  src: [
    {
      path: './source-sans-3/SourceSans3-Variable.ttf',
      style: 'normal',
    },
    {
      path: './source-sans-3/SourceSans3-Italic-Variable.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-source-sans',
  display: 'swap',
  weight: '200 900',
  adjustFontFallback: 'Arial',
});
