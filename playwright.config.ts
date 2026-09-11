import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests/Browser',
    fullyParallel: false,
    timeout: 90000,
    use: { baseURL: 'http://127.0.0.1:8765', channel: 'chrome', headless: true },
    webServer: { command: 'php artisan serve --host=127.0.0.1 --port=8765 --tries=1', url: 'http://127.0.0.1:8765', reuseExistingServer: false },
});
