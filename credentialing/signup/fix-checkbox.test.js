import { test, expect } from '@playwright/test';

test('Fix checkbox issue', async ({ page }) => {
  await page.goto('/agreement');
  
  // Method 1: Click label
  console.log('Trying Method 1: Click label');
  await page.locator('label:has-text("I agree with TheCredentialing")').click();
  
  // Check if it worked
  const isChecked1 = await page.locator('input[name="agreement"]').isChecked();
  console.log('After label click - Checked:', isChecked1);
  
  // Take screenshot
  await page.screenshot({ path: 'method1-label-click.png' });
  
  // If not checked, try method 2
  if (!isChecked1) {
    console.log('Trying Method 2: Direct checkbox click');
    await page.locator('input[name="agreement"]').click();
    const isChecked2 = await page.locator('input[name="agreement"]').isChecked();
    console.log('After checkbox click - Checked:', isChecked2);
    await page.screenshot({ path: 'method2-checkbox-click.png' });
  }
  
  // Try to submit
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(2000);
  
  // Check current URL
  console.log('Current URL:', page.url());
});