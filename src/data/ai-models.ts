import type { AiProvider } from './ai-keys.types';

export const AI_MODELS: Record<AiProvider, readonly string[]> = {
  openai: ['gpt-6.1-sol', 'gpt-6-astra', 'gpt-6-luna'],
  xai: ['grok-4.7', 'grok-4.3', 'grok-4.20-0309-non-reasoning'],
  anthropic: ['claude-sonnet-5-5', 'claude-haiku-5-5', 'claude-opus-5-5'],
};

export function defaultAiModel(provider: AiProvider): string {
  return AI_MODELS[provider][0];
}
