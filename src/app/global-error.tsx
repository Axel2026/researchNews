'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ErrorScreen } from '@/components/templates/ErrorScreen/ErrorScreen';
import { newsreader, sourceSans } from '@/fonts';
import en from '@/messages/en.json';
import '@/design-system/tokens.css';
import './globals.css';

export default function GlobalError() {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${sourceSans.variable}`}
    >
      <body className={sourceSans.className}>
        <NextIntlClientProvider locale="en" messages={en}>
          <ErrorScreen
            code="500"
            title={en.Error.serverTitle}
            homeLabel={en.Error.backHome}
            showLanguageSwitcher={false}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
