import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './credentialing',       
  projects: [
    {
      name: 'signup',
      testMatch: /signup\.spec\.js/,
      use: {
        baseURL: 'https://frontend.thecredentialing.com',
      },
    },
    {
      name: 'agreement',
      testMatch: /agreement\.spec\.js/,
      use: {
        baseURL: 'https://frontend.thecredentialing.com',
        storageState: 'auth.json',
      },
      dependencies: ['signup'],
    }
  ]
});
