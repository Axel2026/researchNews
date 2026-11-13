import { expect, it } from 'vitest';
import { resolveSiteUrl } from './site-url';

it('keeps a public site url', () => {
  expect(
    resolveSiteUrl({
      configured: 'https://research.example',
      appId: 'd3vw1tdhpj4l7',
      branch: 'main',
    }),
  ).toBe('https://research.example');
});

it('uses the Amplify host when the configured url is localhost', () => {
  expect(
    resolveSiteUrl({
      configured: 'http://localhost:3000',
      appId: 'd3vw1tdhpj4l7',
      branch: 'main',
    }),
  ).toBe('https://main.d3vw1tdhpj4l7.amplifyapp.com');
});

it('uses the Amplify host when no site url is configured', () => {
  expect(
    resolveSiteUrl({
      configured: undefined,
      appId: 'd3vw1tdhpj4l7',
      branch: 'main',
    }),
  ).toBe('https://main.d3vw1tdhpj4l7.amplifyapp.com');
});

it('keeps localhost outside Amplify', () => {
  expect(
    resolveSiteUrl({
      configured: undefined,
      appId: undefined,
      branch: undefined,
    }),
  ).toBe('http://localhost:3000');
});
