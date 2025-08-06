import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://frontend.thecredentialing.com',
    storageState: 'auth.json', // ✅ use saved session
  },
});
