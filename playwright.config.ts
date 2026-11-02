import path from 'node:path';
import os from 'node:os';
import { defineConfig } from '@playwright/test';

const port = 3100;
export const e2eMessagesFile = path.join(os.tmpdir(), `cfc-e2e-${port}`, 'messages.jsonl');

export default defineConfig({
  testDir: 'tests/e2e',
  workers: 1,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: `http://127.0.0.1:${port}` },
  webServer: {
    command: 'npm run build && npm start',
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    env: { PORT: String(port), MESSAGES_FILE: e2eMessagesFile },
  },
});
