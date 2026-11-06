'use client';
import { useLayoutEffect, useRef } from 'react';
import type { WithMobileViewportProps } from './WithMobileViewport.types';

const mobileQuery = '(max-width: 40rem)';

export function WithMobileViewport({ children }: WithMobileViewportProps) {
  const originalRef = useRef(window.matchMedia.bind(window));

  // Storybook test double must apply before children read matchMedia.
  // eslint-disable-next-line react-hooks/immutability -- mock window API
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
    const original = originalRef.current;

    return () => {
      window.matchMedia = original;
    };
  }, []);

  return <div style={{ width: '22rem' }}>{children}</div>;
}
