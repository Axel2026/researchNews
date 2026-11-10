import { createElement } from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import en from '@/messages/en.json';

afterEach(() => {
  cleanup();
});

type MessageTree = { [key: string]: string | MessageTree };

function resolveMessage(path: string) {
  const value = path
    .split('.')
    .reduce<string | MessageTree | undefined>((node, part) => {
      if (node == null || typeof node === 'string') {
        return undefined;
      }

      return node[part];
    }, en as MessageTree);

  return typeof value === 'string' ? value : path;
}

function formatMessage(
  template: string,
  values?: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)(?:,[^}]*)?\}/g, (match, key: string) => {
    if (values && key in values) {
      return String(values[key]);
    }

    return match;
  });
}

function createTranslator(namespace?: string) {
  return (key: string, values?: Record<string, string | number>) =>
    formatMessage(
      resolveMessage(namespace ? `${namespace}.${key}` : key),
      values,
    );
}

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
  permanentRedirect: vi.fn(),
  redirect: vi.fn(),
  usePathname: () => '/',
  useRouter: () => ({
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next/image', () => ({
  default: function Image({
    alt = '',
    src,
  }: {
    alt?: string;
    src?: string | { src?: string };
  }) {
    const resolved = typeof src === 'string' ? src : src?.src;

    return createElement('img', { alt, src: resolved });
  },
}));

vi.mock('next-intl/server', () => ({
  getTranslations: async (options?: string | { namespace?: string }) => {
    const namespace =
      typeof options === 'string' ? options : options?.namespace;

    return createTranslator(namespace);
  },
  setRequestLocale: () => undefined,
}));

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getSession: async () => ({ data: { session: null } }),
      getUser: async () => ({ data: { user: null } }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => undefined } },
      }),
      resetPasswordForEmail: async () => ({ error: null }),
      signInWithOAuth: async () => ({ error: null }),
      signInWithPassword: async () => ({ error: null }),
      signOut: async () => ({ error: null }),
      signUp: async () => ({
        data: { session: null, user: null },
        error: null,
      }),
      updateUser: async () => ({ error: null }),
    },
  }),
}));

const originalMatches = Element.prototype.matches;

Element.prototype.matches = function matches(this: Element, selectors: string) {
  if (selectors === ':popover-open') {
    return this.hasAttribute('data-popover-open');
  }

  return originalMatches.call(this, selectors);
} as typeof Element.prototype.matches;

if (!HTMLElement.prototype.showPopover) {
  HTMLElement.prototype.showPopover = function showPopover() {
    this.setAttribute('data-popover-open', '');
  };
}

if (!HTMLElement.prototype.hidePopover) {
  HTMLElement.prototype.hidePopover = function hidePopover() {
    this.removeAttribute('data-popover-open');
  };
}

if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  });
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => undefined;
}

if (
  typeof HTMLDialogElement !== 'undefined' &&
  typeof HTMLDialogElement.prototype.showModal !== 'function'
) {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function close() {
    this.open = false;
  };
}
