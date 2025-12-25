import { test, expect } from '@playwright/test';

// Reuse saved login session
test.use({ storageState: 'auth.json' });

test('Profile Update', async ({ page }) => {
  test.setTimeout(60000); // Optional: Extend timeout to 60s

  // Go to Profile Update page
  await page.goto('https://frontend.thecredentialing.com/before-credentialing/profile-update');

  // Fill Practice Info
  await page.getByRole('textbox', { name: 'Practice Name *' }).fill('Premium');
  await page.locator('#group_npi-0').fill('1234567890');
  await page.getByRole('textbox', { name: 'TIN/EIN *' }).fill('0987654321');

  // Open Specialty dropdown
   await page.locator('.select__input-container').click();
  await page.getByRole('option', { name: 'Endodontist' }).click();

  // Unique Group ID
  await page.getByRole('textbox', { name: 'Unique Group Id' }).fill('1234567890');

  // Address Autocomplete
  await page.locator('#address-0 #react-select-2-input').fill('res');
  await page.getByRole('option', { name: 'Resorts World Las Vegas,' }).click();

  // DBA Section
  await page.getByRole('textbox', { name: 'DBA *' }).fill('Chelsea');
  await page.getByRole('textbox', { name: 'TIN *' }).fill('222222222');
  // Contact Info
  await page.getByRole('textbox', { name: 'Contact No *' }).fill('5555555555');
  await page.locator('#group_npi-0').fill('3333333333');
  

  // Proceed
  await page.getByRole('button', { name: 'Proceed to Providers' }).click();

  

  // Final proceed
  await page.getByRole('button', { name: 'Proceed to Providers' }).click();

  await page.pause();
});


