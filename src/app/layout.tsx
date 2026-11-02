import type { Metadata } from 'next';
import '@/design-system/tokens.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Badania',
  description:
    'Opracowania badań naukowych: skrót i pełny opis jednej pracy w każdym newsie.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
