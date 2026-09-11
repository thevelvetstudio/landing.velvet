import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('responsive layout, portal navigation and accessibility', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const width of [375, 430, 768, 1440, 1920, 2560]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/');
        await expect(page.getByRole('heading', { name: 'VELVET', exact: true })).toBeVisible();
        await expect(page.locator('.split-char')).toHaveCount(0);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await expect(page.locator('.portal')).toHaveCount(0);
        await page.getByRole('link', { name: 'Aplicar ahora' }).click();
        await expect(page).toHaveURL(/\/aplicar$/);
        await expect(page.getByRole('heading', { name: 'Aplicar ahora' })).toBeVisible();
        await page.getByRole('link', { name: 'Volver al inicio' }).click();
        await page.getByRole('link', { name: 'Intranet', exact: true }).click();
        await expect(page).toHaveURL(/\/intranet$/);
        await expect(page.locator('.portal-grid')).not.toHaveClass(/reveal-pending/);
        await expect(page.locator('.portal-grid')).toHaveCSS('opacity', '1');
        const boxes = await page.locator('.portal').evaluateAll(elements => elements.map(el => ({ x: el.getBoundingClientRect().x, y: el.getBoundingClientRect().y })));
        if (width < 768) expect(boxes[1].y).toBeGreaterThan(boxes[0].y);
        else expect(boxes[1].y).toBe(boxes[0].y);
        if (width === 375 || width === 1440) {
            await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
            await page.screenshot({ path: `test-results/velvet-${width}.png`, fullPage: true });
            const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
            expect(results.violations).toEqual([]);
        }
    }
    await expect(page.getByRole('link', { name: 'Enter Finance', exact: true })).toHaveAttribute('href', 'https://finance.thevelvetstudio.co/');
    for (const name of ['App', 'Master']) {
        await page.goto('/intranet');
        await page.getByRole('link', { name: `Enter ${name}`, exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`/${name.toLowerCase()}$`));
        await expect(page.getByRole('heading', { name: `VELVET ${name.toUpperCase()}` })).toBeVisible();
        await page.getByRole('link', { name: 'Back to the system' }).click();
        await expect(page.getByRole('heading', { name: 'Intranet', exact: true })).toBeVisible();
    }
    expect(errors).toEqual([]);
});

test('mobile navigation, keyboard and reduced motion', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'VELVET', exact: true })).toBeVisible();
    await expect(page.locator('.split-char')).toHaveCount(0);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await expect(page.getByRole('banner').getByRole('link')).toHaveCount(1);
    await page.getByRole('link', { name: 'Intranet', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Enter Finance' })).toHaveAttribute('href', 'https://finance.thevelvetstudio.co/');
    await page.getByRole('link', { name: 'Enter App', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'VELVET APP' })).toBeVisible();
    await page.getByRole('link', { name: 'VELVET home' }).click();
    await expect(page).toHaveURL('/');
});
