import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { sampleArticle } from '@/components/storyData';
import { renderWithIntl } from '@/test/render';
import type { ArticleSpeechEngine } from '@/lib/speech/speech.types';
import { ArticleSpeechProvider } from '../ArticleSpeechProvider/ArticleSpeechProvider';
import { SpokenBlock } from './SpokenBlock';

const engine: ArticleSpeechEngine = {
  supported: () => true,
  start: () => undefined,
  pause: () => undefined,
  resume: () => undefined,
  stop: () => undefined,
};

it('renders the spoken title from the provider', () => {
  renderWithIntl(
    <ArticleSpeechProvider
      articleId={sampleArticle.slug}
      segments={[{ id: 'title', text: sampleArticle.title }]}
      lang="en"
      engine={engine}
    >
      <SpokenBlock as="h1" segmentId="title" activeClassName="speaking">
        {sampleArticle.title}
      </SpokenBlock>
    </ArticleSpeechProvider>,
  );

  expect(
    screen.getByRole('heading', { name: sampleArticle.title }),
  ).toBeInTheDocument();
});
