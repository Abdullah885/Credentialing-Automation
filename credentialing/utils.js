// utils.js

export function generateRandomEmail() {
  const timestamp = Date.now();
  return `auto_${timestamp}@gmail.com`;
}

export async function waitAndTypeOTP(page, otp = "1234") {
  const digits = otp.split('');

  // Wait until all 4 OTP fields are present
  await page.waitForFunction(() => {
    return document.querySelectorAll('input[type="text"]').length === 4;
  });

  const inputs = await page.locator('input[type="text"]').elementHandles();

  if (inputs.length !== digits.length) {
    throw new Error(`Only found ${inputs.length} OTP fields. Expected ${digits.length}. Cannot proceed.`);
  }

  for (let i = 0; i < digits.length; i++) {
    await inputs[i].fill(digits[i]);
  }
}
