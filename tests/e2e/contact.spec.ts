import { readFile, rm } from 'node:fs/promises';
import { expect, test } from '@playwright/test';
import { e2eMessagesFile } from '../../playwright.config.js';

test.beforeEach(async () => {
  await rm(e2eMessagesFile, { force: true });
});

test('a valid message is confirmed and saved', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Name').fill('Ann');
  await page.getByLabel('E-mail').fill('ann@example.com');
  await page.getByLabel('Message').fill('Hello from the browser');
  await page.getByRole('button', { name: 'Send' }).click();

  await expect(page.getByText('Your message was saved.')).toBeVisible();
  const lines = (await readFile(e2eMessagesFile, 'utf8')).trim().split('\n');
  expect(lines).toHaveLength(1);
  expect(JSON.parse(lines[0] ?? '')).toMatchObject({
    name: 'Ann',
    email: 'ann@example.com',
    message: 'Hello from the browser',
  });
});

test('an invalid e-mail address is refused and nothing is saved', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Name').fill('Ann');
  await page.getByLabel('E-mail').fill('not-an-email');
  await page.getByLabel('Message').fill('Hello');
  await page.getByRole('button', { name: 'Send' }).click();

  await expect(page.locator('#email-error')).toHaveText('Please enter a valid e-mail address.');
  await expect(page.getByLabel('Name')).toHaveValue('Ann');
  await expect(page.getByLabel('E-mail')).toHaveValue('not-an-email');
  await expect(page.getByLabel('Message')).toHaveValue('Hello');
  await expect(readFile(e2eMessagesFile, 'utf8')).rejects.toThrow();
});
