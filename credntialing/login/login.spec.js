import { test, expect } from '@playwright/test';

test('Save authenticated state after \login', async ({ page }) => {
  await page.goto('https://frontend.thecredentialing.com/login');

  // Perform login
  await page.getByRole('textbox', { name: 'Email' }).fill('automationtesting12@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@12');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Wait for dashboard
  await page.waitForURL('**/dashboard', { timeout: 30000 });

  // Save session state
  await page.context().storageState({ path: './auth.json' }); // ✅ saves in the current folder
  await page.pause();
});
