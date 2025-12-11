import { test } from '@playwright/test';
import { generateRandomEmail, waitAndTypeOTP } from '../utils.js';


test('Save authenticated state after signup', async ({ page }) => {
  await page.goto('/login');

  await page.getByRole('link', { name: 'Sign Up' }).click();

  // Generate unique email
  const email = generateRandomEmail();
  console.log("Using email:", email);

  await page.getByRole('textbox', { name: 'Enter First Name' }).fill('automation');
  await page.getByRole('textbox', { name: 'Enter Last Name' }).fill('test');
  await page.getByRole('textbox', { name: 'Enter Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Enter Phone Number' }).fill('7887878787');
  await page.getByRole('textbox', { name: 'Enter Password' }).fill('Admin@12');
  await page.getByRole('textbox', { name: 'Re-enter your password' }).fill('Admin@12');
  await page.getByRole('checkbox', { name: 'I agree to all Terms and' }).check();
  await page.getByRole('button', { name: 'Create Account' }).click();

  // OTP handler
  await waitAndTypeOTP(page, "1234");
  await page.getByRole('button', { name: 'Verify' }).click();

  // Save logged-in session
  await page.context().storageState({ path: 'auth.json' });

  console.log('✅ Auth session saved');
});
