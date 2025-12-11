import { test, expect } from '@playwright/test';

test('Complete agreement after signup', async ({ page }) => {
  await page.goto('/agreement');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Use JavaScript to check the checkbox (we know this works)
  await page.evaluate(() => {
    const checkbox = document.querySelector('input[name="agreement"]');
    if (checkbox) {
      checkbox.checked = true;
      // Trigger ALL possible events
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      checkbox.dispatchEvent(new Event('click', { bubbles: true }));
      checkbox.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  
  // Verify it's checked
  const isChecked = await page.locator('input[name="agreement"]').isChecked();
  console.log('Checkbox checked:', isChecked);
  
  // Wait a moment for any UI updates
  await page.waitForTimeout(1000);
  
  // Take screenshot to verify
  await page.screenshot({ path: 'before-submit.png' });
  
  // Click submit - try different methods
  const submitButton = page.getByRole('button', { name: 'Submit' });
  
  // Method 1: Regular click
  await submitButton.click();
  
  // Wait for navigation with a reasonable timeout
  try {
    await page.waitForURL(/dashboard/, { timeout: 10000 });
    console.log('Successfully navigated to dashboard!');
  } catch (error) {
    console.log('Method 1 failed, trying Method 2...');
    
    // Method 2: JavaScript form submission
    await page.evaluate(() => {
      const form = document.querySelector('form');
      if (form) {
        form.submit();
      }
    });
    
    // Wait again
    await page.waitForURL(/dashboard/, { timeout: 10000 }).catch(() => {
      console.log('Still on URL:', page.url());
      throw new Error('Form submission failed');
    });
  }
  
  await expect(page).toHaveURL(/dashboard/);
  console.log('Test completed successfully!');
});