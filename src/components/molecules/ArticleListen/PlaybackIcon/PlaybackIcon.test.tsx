import { expect, it } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { PlaybackIcon } from './PlaybackIcon';

const playPath =
  'M8.2 5.4a1 1 0 0 1 1.53-.85l9.2 6.1a1 1 0 0 1 0 1.7l-9.2 6.1A1 1 0 0 1 8.2 17.6V5.4Z';

const pausePath =
  'M7.2 5.2h3.1a.8.8 0 0 1 .8.8v12a.8.8 0 0 1-.8.8H7.2a.8.8 0 0 1-.8-.8v-12a.8.8 0 0 1 .8-.8Zm6.5 0h3.1a.8.8 0 0 1 .8.8v12a.8.8 0 0 1-.8.8h-3.1a.8.8 0 0 1-.8-.8v-12a.8.8 0 0 1 .8-.8Z';

it('draws a play triangle while audio is stopped', () => {
  const { container } = renderWithIntl(<PlaybackIcon playing={false} />);

  expect(container.querySelector('path')).toHaveAttribute('d', playPath);
});

it('draws pause bars while audio is playing', () => {
  const { container } = renderWithIntl(<PlaybackIcon playing />);

  expect(container.querySelector('path')).toHaveAttribute('d', pausePath);
});
