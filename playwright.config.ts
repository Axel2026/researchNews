import { defineConfig, devices } from '@playwright/test';

const port = 3100;
const apiPort = 4100;
const baseURL = `http://localhost:${port}`;
const apiURL = `http://127.0.0.1:${apiPort}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'node e2e/mock-api.mjs',
      url: `${apiURL}/health`,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: `pnpm dev --port ${port}`,
      url: `${baseURL}/login`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: {
        API_URL: apiURL,
        NEXT_PUBLIC_API_URL: apiURL,
        NEXT_PUBLIC_SITE_URL: baseURL,
        NEXT_PUBLIC_SUPABASE_URL: '',
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: '',
      },
    },
  ],
});
