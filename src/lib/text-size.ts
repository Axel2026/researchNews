import type {
  SetTextSizeLargeParams,
  SubscribeTextSizeParams,
} from './text-size.types';

export const TEXT_SIZE_STORAGE_KEY = 'research-news-text-size';

const TEXT_SIZE_LARGE = 'large';

const listeners = new Set<() => void>();

export function subscribeTextSize({ listener }: SubscribeTextSizeParams) {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === TEXT_SIZE_STORAGE_KEY) listener();
  };

  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export function getTextSizeSnapshot() {
  return document.documentElement.dataset.textSize === TEXT_SIZE_LARGE;
}

export function getTextSizeServerSnapshot() {
  return false;
}

export function setTextSizeLarge({ large }: SetTextSizeLargeParams) {
  if (large) {
    document.documentElement.dataset.textSize = TEXT_SIZE_LARGE;
    localStorage.setItem(TEXT_SIZE_STORAGE_KEY, TEXT_SIZE_LARGE);
  } else {
    delete document.documentElement.dataset.textSize;
    localStorage.removeItem(TEXT_SIZE_STORAGE_KEY);
  }

  listeners.forEach((listener) => listener());
}

export function textSizeBootScript() {
  return `(function(){try{if(localStorage.getItem(${JSON.stringify(TEXT_SIZE_STORAGE_KEY)})===${JSON.stringify(TEXT_SIZE_LARGE)})document.documentElement.dataset.textSize=${JSON.stringify(TEXT_SIZE_LARGE)}}catch(e){}})()`;
}
