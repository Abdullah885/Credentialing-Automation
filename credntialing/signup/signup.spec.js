import { test } from '@playwright/test';

test('Save authenticated state after signup/login', async ({ page }) => {
  await page.goto('https://frontend.thecredentialing.com/login');
  await page.getByRole('link', { name: 'Sign Up' }).click();

  // Fill the signup form
  await page.getByRole('textbox', { name: 'Enter First Name' }).fill('automation');
  await page.getByRole('textbox', { name: 'Enter Last Name' }).fill('test');
  await page.getByRole('textbox', { name: 'Enter Email' }).fill('automationtesting12@gmail.com');
  await page.getByRole('textbox', { name: 'Enter Phone Number' }).fill('7887878787');
  await page.getByRole('textbox', { name: 'Enter Password' }).fill('Admin@12');
  await page.getByRole('textbox', { name: 'Re-enter your password' }).fill('Admin@12');
  await page.getByRole('checkbox', { name: 'I agree to all Terms and' }).check();
  await page.getByRole('button', { name: 'Create Account' }).click();

  // Wait and simulate OTP if needed (hardcoded 1234)
  await page.waitForTimeout(10000);
  await page.getByRole('textbox').nth(0).fill('1');
  await page.getByRole('textbox').nth(1).fill('2');
  await page.getByRole('textbox').nth(2).fill('3');
  await page.getByRole('textbox').nth(3).fill('4');
  await page.getByRole('button', { name: 'Verify' }).click();

  //  await page.pause();

  

  // // ✅ FIXED: Wait for full dashboard URL with query param
  // await page.waitForURL('**/dashboard?message=*', { timeout: 30000 });

  // ✅ Save session storage
  await page.context().storageState({ path: 'auth.json' });

  console.log('✅ Auth session saved to auth.json');
});


