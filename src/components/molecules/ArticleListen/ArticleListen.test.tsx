import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { ArticleSpeechProvider } from '@/components/organisms/NewsArticle/ArticleSpeechProvider/ArticleSpeechProvider';
import type { ArticleSpeechEngine } from '@/lib/speech/speech.types';
import { renderWithIntl } from '@/test/render';
import { ArticleListen } from './ArticleListen';

const segments = [{ id: 'body', text: 'Short peptides fight bacteria.' }];

function engine(supported: boolean): ArticleSpeechEngine {
  return {
    supported: () => supported,
    start: (options) => {
      const first = options.segments[0];
      if (first) {
        options.onSegmentStart(first.id);
      }
    },
    pause: () => undefined,
    resume: () => undefined,
    stop: () => undefined,
  };
}

it('plays, pauses, and resumes read-aloud', async () => {
  const user = userEvent.setup();
  renderWithIntl(
    <ArticleSpeechProvider
      articleId="1"
      segments={segments}
      lang="en"
      engine={engine(true)}
    >
      <ArticleListen />
    </ArticleSpeechProvider>,
  );

  await user.click(screen.getByRole('button', { name: 'Listen' }));
  const pause = screen.getByRole('button', { name: 'Pause' });
  expect(pause).toHaveAttribute('aria-pressed', 'true');

  await user.click(pause);
  const resume = screen.getByRole('button', { name: 'Resume' });
  expect(resume).toHaveAttribute('aria-pressed', 'false');

  await user.click(resume);
  expect(screen.getByRole('button', { name: 'Pause' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

it('shows that read-aloud is unavailable when speech is unsupported', async () => {
  renderWithIntl(
    <ArticleSpeechProvider
      articleId="1"
      segments={segments}
      lang="en"
      engine={engine(false)}
    >
      <ArticleListen />
    </ArticleSpeechProvider>,
  );

  expect(
    await screen.findByText('Read-aloud is unavailable in this browser.'),
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Listen' })).toBeDisabled();
});
