import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('dashboard access', async ({ page }) => {
  await page.goto('https://frontend.thecredentialing.com/agreement');
  
  
 await page.waitForTimeout(10000);
await page.locator('input[name="agreement"]').click({ force: true });
await page.getByRole('button', { name: 'Submit' }).click();
await page.pause(); 
});
