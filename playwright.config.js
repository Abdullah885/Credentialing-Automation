import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './credentialing',
  
  use: {
    baseURL: process.env.BASE_URL || 'https://frontend.thecredentialing.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  
  projects: [
    {
      name: 'signup',
      testMatch: /signup\.spec\.js/,
      use: { storageState: undefined },
    },
    {
      name: 'agreement', 
      testMatch: /agreement\.spec\.js/,
      use: { storageState: 'auth.json' },
    },
    {
      name: 'dashboard',
      testMatch: /dashboard\.spec\.js/,
      use: { storageState: 'auth.json' },
    },
    {
      name: 'profile-update',
      testMatch: /Profile_update\.spec\.js/,
      use: { storageState: 'auth.json' },
    },
    // Add a catch-all project for when running specific files
    {
      name: 'default',
      testIgnore: [/signup\.spec\.js/, /agreement\.spec\.js/, /dashboard\.spec\.js/, /Profile_update\.spec\.js/],
    }
  ],
});


// Simpler config without projects
// import { defineConfig } from '@playwright/test';

// export default defineConfig({
//   testDir: './credentialing',
  
//   use: {
//     baseURL: process.env.BASE_URL || 'https://frontend.thecredentialing.com',
//     trace: 'on-first-retry',
//     screenshot: 'only-on-failure',
//     // Use auth.json for all tests except signup
//     storageState: ({}, testInfo) => 
//       testInfo.title.includes('signup') || testInfo.file.includes('signup') 
//         ? undefined 
//         : 'auth.json',
//   },
  
//   // Single project - no filtering
//   projects: [
//     {
//       name: 'chromium',
//       use: { browserName: 'chromium' },
//     }
//   ],
// });