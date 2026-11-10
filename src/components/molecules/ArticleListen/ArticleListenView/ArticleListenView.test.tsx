import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderWithIntl } from '@/test/render';
import { ArticleListenView } from './ArticleListenView';
import type { ArticleListenCopy } from './ArticleListenView.types';

const copy: ArticleListenCopy = {
  listen: 'Listen',
  pause: 'Pause',
  resume: 'Resume',
  unavailable: 'Read-aloud is unavailable in this browser.',
  noVoice: 'This system has no voice for this language.',
  noVoiceHint:
    'Add the language in Windows Settings under Time & language, then Language & region, and install its text-to-speech voice.',
  noVoiceHintLink: 'Microsoft instructions',
  noVoiceHintLabel: 'How to install a voice',
  opensNewTab: 'opens in a new tab',
};

const voiceHelp =
  'https://support.microsoft.com/en-us/windows/hardware/input-devices/manage-the-language-and-keyboard-input-layout-settings-in-windows';

it('starts, pauses, and resumes playback', async () => {
  const user = userEvent.setup();
  const onPlay = vi.fn();
  const onPause = vi.fn();
  const onResume = vi.fn();
  const { rerender } = renderWithIntl(
    <ArticleListenView status="idle" copy={copy} onPlay={onPlay} />,
  );

  await user.click(screen.getByRole('button', { name: 'Listen' }));
  expect(onPlay).toHaveBeenCalledOnce();

  rerender(
    <ArticleListenView
      status="playing"
      copy={copy}
      onPause={onPause}
      onPlay={onPlay}
    />,
  );
  const pause = screen.getByRole('button', { name: 'Pause' });
  expect(pause).toHaveAttribute('aria-pressed', 'true');
  await user.click(pause);
  expect(onPause).toHaveBeenCalledOnce();

  rerender(
    <ArticleListenView
      status="paused"
      copy={copy}
      onResume={onResume}
      onPlay={onPlay}
    />,
  );
  await user.click(screen.getByRole('button', { name: 'Resume' }));
  expect(onResume).toHaveBeenCalledOnce();
});

it('disables the control when read-aloud is unavailable', () => {
  renderWithIntl(<ArticleListenView status="unavailable" copy={copy} />);

  expect(screen.getByRole('button', { name: 'Listen' })).toBeDisabled();
  expect(
    screen.getByText('Read-aloud is unavailable in this browser.'),
  ).toBeInTheDocument();
});

it('links to voice-install help when no voice is available', async () => {
  const user = userEvent.setup();
  renderWithIntl(<ArticleListenView status="noVoice" copy={copy} />);

  expect(
    screen.getByText('This system has no voice for this language.'),
  ).toBeInTheDocument();
  await user.click(
    screen.getByRole('button', { name: 'How to install a voice' }),
  );

  const help = screen.getByRole('link', { name: /Microsoft instructions/ });
  expect(help).toHaveAttribute('href', voiceHelp);
  expect(help).toHaveAttribute('target', '_blank');
});
