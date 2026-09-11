import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('gate blocks loading until confirmation and remembers the choice', async ({ page, context }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/intranet');
    await expect(page.getByRole('heading', { name: '¿Tienes 18 años o más?' })).toBeVisible();
    await expect(page.locator('#app')).toHaveCount(0);
    await expect(page.locator('canvas')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(accessibility.violations).toEqual([]);
    await page.screenshot({ path: 'test-results/age-gate-mobile.png' });
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Sí, tengo 18 años o más' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.locator('.age-gate')).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { name: 'Intranet', exact: true })).toBeVisible();
    await expect(page).toHaveURL('/intranet');
    const cookie = (await context.cookies()).find(item => item.name === 'velvet_age');
    expect(cookie?.httpOnly).toBe(true);
    expect(cookie?.sameSite).toBe('Lax');
    expect(cookie?.value).not.toBe('confirmed');
    expect(cookie!.expires).toBeGreaterThan(Date.now() / 1000 + 29 * 86400);
    await page.reload();
    await expect(page.locator('.age-gate')).toHaveCount(0);
    await page.goto('/');
    await expect(page.locator('.hero-logo')).toBeVisible();
});

test('decline persists and unsigned cookie cannot bypass the gate', async ({ page, context }) => {
    await context.addCookies([{ name: 'velvet_age', value: 'confirmed', url: 'http://127.0.0.1:8765' }]);
    await page.goto('/');
    await expect(page.locator('.age-gate')).toBeVisible();
    await page.getByRole('button', { name: 'No, soy menor de 18 años' }).click();
    await expect(page.getByRole('heading', { name: 'Acceso no permitido' })).toBeVisible();
    await page.goto('/master');
    await expect(page.getByRole('heading', { name: 'Acceso no permitido' })).toBeVisible();
    await expect(page.locator('#app')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Sí, tengo 18 años o más' })).toHaveCount(0);
});

test('confirmation also works without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:8765/');
    await page.getByRole('button', { name: 'Sí, tengo 18 años o más' }).click();
    await expect(page.locator('.age-gate')).toHaveCount(0);
    await expect(page.locator('noscript p')).toBeVisible();
    expect((await context.cookies()).some(cookie => cookie.name === 'velvet_age')).toBe(true);
    await context.close();
});
