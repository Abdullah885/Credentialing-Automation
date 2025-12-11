import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('dashboard access', async ({ page }) => {
  await page.goto('https://frontend.thecredentialing.com/dashboard');
  await page.pause();
});
