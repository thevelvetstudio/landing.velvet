import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';

const logo = (await readFile(new URL('../public/assets/LOGO.svg', import.meta.url))).toString('base64');
const browser = await chromium.launch({ channel: 'chrome' });
try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await page.setContent(`<!doctype html><html lang="es"><meta charset="utf-8"><style>
        *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:radial-gradient(ellipse at 85% 20%,#390d19,transparent 65%),#050505;color:#f5f5f5;font-family:Arial,sans-serif;padding:100px 110px}
        .logo{position:relative;width:980px;aspect-ratio:1920/520;overflow:hidden}.logo img{position:absolute;top:-53.8462%;width:100%;height:auto}
        p{margin:40px 0 14px;font-size:30px;font-weight:400;letter-spacing:.02em}small{color:#b3a5a8;font-size:18px;letter-spacing:.03em}.domain{position:absolute;bottom:40px;left:110px;font-size:14px;color:#a3a3a3}
    </style><div class="logo"><img alt="The Velvet Studio" src="data:image/svg+xml;base64,${logo}"></div><p>Un estudio webcam diferente.</p><small>Plataforma de streaming para adultos · +18</small><div class="domain">thevelvetstudio.co</div></html>`);
    await page.locator('img').evaluate(image => image.decode());
    await page.screenshot({ path: fileURLToPath(new URL('../public/assets/og-velvet.png', import.meta.url)) });
} finally {
    await browser.close();
}
