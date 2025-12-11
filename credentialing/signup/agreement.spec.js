import { test, expect } from '@playwright/test';

test('Complete agreement after signup', async ({ page }) => {
  await page.goto('/agreement');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Use JavaScript to check the checkbox
  await page.evaluate(() => {
    const checkbox = document.querySelector('input[name="agreement"]');
    if (checkbox) {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      checkbox.dispatchEvent(new Event('click', { bubbles: true }));
    }
  });
  
  console.log('Checkbox checked:', await page.locator('input[name="agreement"]').isChecked());
  
  // Listen for network responses
  let responseData = null;
  page.on('response', async response => {
    if (response.url().includes('/agreement') && response.request().method() === 'POST') {
      console.log('Response status:', response.status());
      console.log('Response URL:', response.url());
      try {
        responseData = await response.text();
        console.log('Response body:', responseData.substring(0, 500)); // First 500 chars
      } catch (e) {
        console.log('Could not read response');
      }
    }
  });
  
  // Click submit
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Wait for any response
  await page.waitForTimeout(5000);
  
  // Check current state
  console.log('Current URL:', page.url());
  console.log('Page title:', await page.title());
  
  // Look for error messages
  const errorMessages = page.locator('.error, .alert, .text-danger, [role="alert"]');
  const errorCount = await errorMessages.count();
  console.log('Error message elements found:', errorCount);
  
  for (let i = 0; i < errorCount; i++) {
    const errorText = await errorMessages.nth(i).textContent();
    console.log(`Error ${i}:`, errorText?.trim());
  }
  
  // Take screenshot
  await page.screenshot({ path: 'after-submit-debug.png' });
  
  // Check if we're actually on dashboard but URL didn't change
  const dashboardElement = page.locator('h1, h2, .dashboard, [data-testid="dashboard"]').first();
  if (await dashboardElement.count() > 0) {
    console.log('Dashboard element found:', await dashboardElement.textContent());
  }
});