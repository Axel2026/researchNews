import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { ArticleListen } from '@/components/molecules/ArticleListen/ArticleListen';
import { renderWithIntl } from '@/test/render';
import type { ArticleSpeechEngine } from '@/lib/speech/speech.types';
import { ArticleSpeechProvider } from './ArticleSpeechProvider';

const engine: ArticleSpeechEngine = {
  supported: () => true,
  start: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  stop: vi.fn(),
};

it('renders a Listen button that starts playback', async () => {
  const user = userEvent.setup();

  renderWithIntl(
    <ArticleSpeechProvider
      articleId="frog-peptides"
      segments={[
        {
          id: 'title',
          text: 'A rare skin compound helps peptides last longer',
        },
      ]}
      lang="en"
      engine={engine}
    >
      <ArticleListen />
    </ArticleSpeechProvider>,
  );

  await user.click(screen.getByRole('button', { name: 'Listen' }));

  expect(engine.start).toHaveBeenCalledOnce();
});
