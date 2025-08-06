const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Log key network responses
  page.on('response', async (response) => {
    const url = response.url();
    if (
      url.includes('/wp-json/') ||
      url.includes('/contact') ||
      url.includes('/feedback') ||
      url.includes('/form')
    ) {
      const status = response.status();
      let body = '[Preview unavailable]';
      try {
        body = await response.text();
      } catch {}

      const log = `---\nURL: ${url}\nStatus: ${status}\nPreview:\n${body}\n\n`;
      fs.appendFileSync('network_log.txt', log);
      console.log('✅ Logged form response to network_log.txt');
    }
  });

  await page.goto('https://medsitnexus.com/contact-us');
  await page.waitForLoadState('networkidle');

  // Simulate human typing
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  async function typeSlow(locator, text) {
    await locator.click();
    for (let char of text) {
      await locator.type(char);
      await delay(Math.floor(Math.random() * 100) + 50); // 50–150ms delay per char
    }
  }

  // Fill form slowly
  await typeSlow(page.getByRole('textbox', { name: 'Full Name' }), 'test');
  await delay(1000);
  await typeSlow(page.getByRole('textbox', { name: 'Email Address' }), 'qateam.2k25@gmail.com');
  await delay(1000);
  await typeSlow(page.getByRole('textbox', { name: /valid phone/i }), '03151234567');
  await delay(1000);
  await typeSlow(page.getByRole('textbox', { name: 'Job Title' }), 'QA Engineer');
  await delay(1000);
  await page.locator('#dropdownField').selectOption('Credentialing');
  await delay(1000);
  await typeSlow(page.getByRole('textbox', { name: 'Your Message' }), 'Automated testing message');

  // Let user solve CAPTCHA manually if it appears
  console.log('\n🔒 Waiting 10 seconds to manually solve reCAPTCHA (if shown)...');
  await delay(10000);

  // Submit form
  await page.getByRole('button', { name: 'Submit' }).click();
  console.log('📤 Form submitted. Watching network for feedback...');

  // Wait extra time to capture responses
  await delay(10000);
  await browser.close();
})();
