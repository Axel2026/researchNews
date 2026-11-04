import type { Decorator, Preview } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';
import { useLayoutEffect, type ReactNode } from 'react';
import { newsreader, sourceSans } from '@/fonts';
import '@/design-system/tokens.css';
import '@/app/globals.css';
import en from '../src/messages/en.json';

const fontVariableClasses = [newsreader.variable, sourceSans.variable];

function DesignTokens({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.classList.add(...fontVariableClasses);
    body.classList.add(sourceSans.className);

    return () => {
      root.classList.remove(...fontVariableClasses);
      body.classList.remove(sourceSans.className);
    };
  }, []);

  return (
    <NextIntlClientProvider locale="en" messages={en}>
      <div
        className={sourceSans.className}
        style={{
          minHeight: '100%',
          padding: '1.5rem',
          color: 'var(--color-ink)',
          background: 'var(--color-bg)',
          fontFamily: 'var(--font-sans)',
          fontOpticalSizing: 'auto',
        }}
      >
        {children}
      </div>
    </NextIntlClientProvider>
  );
}

const withDesignTokens: Decorator = (Story) => (
  <DesignTokens>
    <Story />
  </DesignTokens>
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
    options: {
      storySort: {
        order: [
          'Design System',
          'Atoms',
          'Molecules',
          'Organisms',
          'Templates',
          'Storybook',
        ],
      },
    },
  },
};

export default preview;
