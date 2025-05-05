import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const COMMON_WEBSERVER_CONFIG = {
  reuseExistingServer: !process.env.CI,
  stdout: process.env.CI ? 'pipe' : 'pipe',
  stderr: 'pipe',
} as const

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  webServer: [
      {
      command: 'npm run dev --prefix=../backoffice',
      port: 5555,
      ...COMMON_WEBSERVER_CONFIG
    }, 
    {
      command: 'npm run dev --prefix=../client',
      port: 3015,
      ...COMMON_WEBSERVER_CONFIG
    },
    {
      command: 'npm run dev:e2e --prefix=../server',
      port: 60045,
      ...COMMON_WEBSERVER_CONFIG
    },
  ],
  timeout: process.env.CI ? 15_000 : 5_000,
  expect: {
    timeout: process.env.CI ? 15_000 : 5_000,
  },
  // tests are much more stable
  workers: 1,
  maxFailures: process.env.CI ? 5 : undefined,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
};

export default config;
