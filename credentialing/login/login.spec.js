import { test, expect } from '@playwright/test';

test('Save authenticated state after \login', async ({ page }) => {
  await page.goto('https://frontend.thecredentialing.com/login');

  // Perform login
  await page.getByRole('textbox', { name: 'Email' }).fill('flow.user@thecredentialing.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@12');
  await page.getByRole('button', { name: 'Sign In' }).click();

  

   // Wait and simulate OTP if needed (hardcoded 1234)
  await page.waitForTimeout(10000);
  await page.getByRole('textbox').nth(0).fill('1');
  await page.getByRole('textbox').nth(1).fill('2');
  await page.getByRole('textbox').nth(2).fill('3');
  await page.getByRole('textbox').nth(3).fill('4');
  await page.getByRole('button', { name: 'Verify' }).click();


  // Save session state
  await page.context().storageState({ path: './auth.json' }); // ✅ saves in the current folder
  await page.pause();
});
