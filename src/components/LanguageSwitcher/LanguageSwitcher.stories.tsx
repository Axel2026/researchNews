import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite';
import { useLayoutEffect, useRef } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';

const mobileQuery = '(max-width: 40rem)';

const withMobileViewport: Decorator = (Story) => {
  const originalRef = useRef(window.matchMedia.bind(window));

  window.matchMedia = (query: string) => {
    if (query === mobileQuery) {
      return {
        matches: true,
        media: query,
        onchange: null,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() {
          return false;
        },
      };
    }

    return originalRef.current(query);
  };

  useLayoutEffect(() => {
    return () => {
      window.matchMedia = originalRef.current;
    };
  }, []);

  return (
    <div style={{ width: '22rem' }}>
      <Story />
    </div>
  );
};

const meta = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: '16rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  decorators: [withMobileViewport],
};
