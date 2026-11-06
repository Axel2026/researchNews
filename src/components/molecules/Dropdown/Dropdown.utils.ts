import { type CSSProperties } from 'react';
import type {
  PanelStyleParams,
  SubscribeMobileParams,
} from './Dropdown.utils.types';

export const mobileQuery = '(max-width: 40rem)';

export function subscribeMobile({ onChange }: SubscribeMobileParams) {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

export function subscribeNoop() {
  return () => {};
}

export function isMobile() {
  return window.matchMedia(mobileQuery).matches;
}

export function notMobile() {
  return false;
}

export function panelStyle({ button, align }: PanelStyleParams): CSSProperties {
  const box = button.getBoundingClientRect();

  return {
    top: box.bottom,
    ...(align === 'start'
      ? { left: box.left }
      : { right: window.innerWidth - box.right }),
  };
}
