import { expect, test } from '@playwright/test';

test('metadata remains unique and follows Inertia navigation', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.getByRole('button', { name: 'Sí, tengo 18 años o más' }).click();
    await expect(page).toHaveTitle('The Velvet Studio | Estudio webcam y streaming para adultos');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('head meta[name="description"]')).toHaveCount(1);
    await expect(page.locator('head link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', 'https://thevelvetstudio.co/');
    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
    expect(schema['@graph'][0].name).toBe('The Velvet Studio');
    await page.getByRole('link', { name: 'Aplicar ahora' }).click();
    await expect(page).toHaveTitle('Aplicar a The Velvet Studio | Próximamente');
    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', 'https://thevelvetstudio.co/aplicar');
    await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
    await expect(page.locator('head meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
    await page.getByRole('link', { name: 'Volver al inicio' }).click();
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
});
