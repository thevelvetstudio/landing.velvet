# VELVET

Landing pública creada desde cero con Laravel, Inertia, React y TypeScript. El hero enlaza a `/intranet`, donde se muestran los tres módulos, y a `/aplicar`, una página provisional para futuras solicitudes. Los módulos ya no aparecen debajo del hero.

## Ejecutar localmente

```powershell
composer run dev
```

Abre http://127.0.0.1:8015. Se eligió 8015 porque 8000 ya estaba ocupado por otra aplicación. Dependencias, clave de aplicación y SQLite ya están preparadas en este entorno. El comando inicia Laravel y Vite; Ctrl+C los detiene. También puedes ejecutarlos por separado con `php artisan serve --port=8015` y `npm run dev`.

Para un checkout nuevo (PHP 8.2+, Composer, Node 22.12+):

```powershell
composer install
Copy-Item .env.example .env
php artisan key:generate
New-Item database/database.sqlite -ItemType File -ErrorAction SilentlyContinue
php artisan migrate
npm ci
npm run build
composer run dev
```

## Versiones instaladas

| Componente | Versión |
| --- | --- |
| PHP / Composer | 8.2.12 / 2.9.5 |
| Node / npm | 22.22.0 / 10.9.4 |
| Laravel | 12.69.2 |
| Inertia Laravel / React | 3.3.3 / 3.7.0 |
| React / React DOM | 19.3.0 |
| TypeScript | 5.9.3 |
| Tailwind CSS | 4.3.3 |
| Vite | 8.3.0 |
| GSAP | 3.15.0 |

Laravel 12 es la rama estable más reciente compatible con el PHP 8.2 disponible; Laravel 13 requiere PHP 8.3. Los lockfiles fijan las versiones instaladas.

## Estructura

- `resources/js/app.tsx`: arranque Inertia, resolver tipado y páginas con carga diferida.
- `resources/js/pages/`: Landing, Intranet, Apply, App, Finance y Master.
- `resources/js/components/landing/`: Navbar, Hero, ModulePortal y ModulesSection.
- `resources/js/components/landing/MetalBackground.tsx`: paleta, carga diferida y fallback del fondo del hero.
- `resources/js/components/ui/MoltenMetal.tsx`: fondo Molten Metal de React Bits con OGL.
- `resources/js/config/modules.ts`: URLs, índices, nombres, descripciones y CTA centralizados.
- `resources/js/types/module.ts`: contrato TypeScript de módulos.
- `resources/css/app.css`: Tailwind, paleta, geometrías y estilos responsive.
- `resources/views/app.blade.php`: documento HTML, metadata y entrada Vite.
- `routes/web.php`: rutas públicas GET `/`, `/intranet`, `/aplicar`, `/app`, `/finance`, `/master`.

## Validación

```powershell
npm run build
npm run typecheck
npm run lint
php artisan test
php artisan route:list
php vendor/bin/pint --test
npm run test:browser
```

Build, TypeScript y ESLint aprobados. Laravel: 4 tests, 50 assertions. Chrome: 2 escenarios aprobados que cubren 375, 430, 768, 1440, 1920 y 2560 px, ausencia de overflow horizontal, navegación de los tres portales, menú móvil, Escape, teclado y reduced-motion. Axe no detectó infracciones WCAG A/AA en las comprobaciones móvil y escritorio.

Las pruebas de navegador requieren Google Chrome instalado y levantan un servidor temporal en 8765. En este Windows, la limpieza del servidor puede quedarse esperando después de mostrar ambos tests aprobados; Ctrl+C finaliza el proceso. Capturas en `test-results/`, excluido de Git.

## Decisiones

Tailwind 4 se integra mediante `@tailwindcss/vite` y declara los paths Blade y TSX con `@source`; no necesita `tailwind.config.js`. Fuente system-first sin descargas externas. El hero usa el SVG oficial y Molten Metal de React Bits con OGL/WebGL2, cargado bajo demanda. La paleta combina el rojo #d6263b del logo, burdeos y reflejos claros; una capa oscura conserva el contraste. El efecto se pausa fuera de pantalla y en pestañas ocultas, limita la densidad de píxeles a 1.25 y usa un fondo CSS estático sin WebGL2 o con reduced-motion. El scroll usa requestAnimationFrame e IntersectionObserver.

Molten Metal se integró manualmente desde la fuente oficial. SplitText se conserva como componente disponible, pero el logo SVG actual tiene una entrada CSS. Procedencia y licencia en [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) y [REACT_BITS_LICENSE.md](REACT_BITS_LICENSE.md).

Los módulos son placeholders públicos, sin autenticación ni lógica de negocio. La configuración global de PHP emite una advertencia de OpenSSL duplicado; no impide las comprobaciones y no se modificó.

Referencias: [Laravel](https://laravel.com/docs/12.x/releases), [Inertia 3](https://inertiajs.com/docs/v3/installation/client-side-setup), [React Bits](https://reactbits.dev/get-started/installation).
