import type { Decorator, Preview } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';
import { newsreader, sourceSans } from '@/fonts';
import '@/design-system/tokens.css';
import en from '../src/messages/en.json';

const withDesignTokens: Decorator = (Story) => (
  <NextIntlClientProvider locale="en" messages={en}>
    <div
      className={`${newsreader.variable} ${sourceSans.variable} ${sourceSans.className}`}
      style={{
        minHeight: '100%',
        padding: '1.5rem',
        color: 'var(--color-ink)',
        background: 'var(--color-bg)',
        fontFamily: 'var(--font-sans)',
        fontOpticalSizing: 'auto',
      }}
    >
      <Story />
    </div>
  </NextIntlClientProvider>
);

const preview: Preview = {
  decorators: [withDesignTokens],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'cream',
      values: [
        { name: 'cream', value: '#f6f1e8' },
        { name: 'paper', value: '#fffdf8' },
        { name: 'ink', value: '#1c1917' },
      ],
    },
  },
};

export default preview;
