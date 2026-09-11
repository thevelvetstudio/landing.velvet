# VELVET

## Confirmación de edad

Antes de cargar React, el hero o WebGL, Laravel muestra una pantalla de acceso +18 (`resources/views/age-gate.blade.php`). El formulario funciona sin JavaScript y envía la decisión a `POST /age-confirmation`, con CSRF y límite de solicitudes. La cookie `velvet_age` queda cifrada/autenticada por Laravel, es HttpOnly y SameSite=Lax, y usa Secure en HTTPS. La aceptación dura 30 días; la denegación, 24 horas. Una cookie denegada no se sustituye por una aceptación mientras siga vigente. La navegación regresa a la ruta local solicitada.

Es una autodeclaración de mayoría de edad, no verificación documental ni autenticación de usuarios. No se recogen fecha de nacimiento ni documentos. La cookie se aplica a este host; el servicio externo Finance gestiona sus propios controles. El visitante puede borrar las cookies de su navegador. Los metadatos SEO permanecen en el HTML inicial; no se hacen excepciones de acceso basadas en el User-Agent de buscadores.

## SEO

Configuración central en `config/seo.php`. Metadatos originales servidos por Laravel y sincronizados por Inertia: título, descripción, canonical sin parámetros de campaña, Open Graph, Twitter y JSON-LD (Organization, WebSite y WebPage). Idioma español y contenido visible que identifica el estudio webcam y la plataforma de streaming para adultos. No se declaran reseñas, ubicación, precios ni transmisiones que no existen en esta landing.

En producción configura `SEO_URL=https://thevelvetstudio.co` con el dominio final confirmado y `SEO_INDEXABLE=true`. En local y staging usa `SEO_INDEXABLE=false`. Tras cambiar estas variables, actualiza la caché de configuración de Laravel. `/robots.txt` y `/sitemap.xml` se generan desde esa configuración. El sitemap incluye solo la landing; intranet, módulos y la solicitud provisional llevan `noindex, follow` (esto no sustituye autenticación).

Vista previa social: `public/assets/og-velvet.png`, 1200 × 630. Se regenera con `node scripts/generate-social-image.mjs` usando Chrome. El contenido principal sigue siendo React; los metadatos y datos estructurados ya están disponibles sin ejecutar JavaScript. No se ha añadido un servidor SSR.

La landing institucional no contiene material explícito. `seo.explicit_paths` permite aplicar `rating=adult` a páginas que lo contengan; no se marca indiscriminadamente todo el dominio. La actividad para adultos y la audiencia +18 se indican en texto y datos estructurados. Referencia: [Google Search Central](https://developers.google.com/search/docs/specialty/explicit/guidelines).

Tras publicar, verifica la propiedad del dominio y envía `/sitemap.xml` en Google Search Console. Esa gestión requiere acceso a la cuenta y no se realizó desde este proyecto. `/aplicar` debe completarse antes de habilitar su indexación. Añade ubicación y perfiles sociales verificados cuando estén disponibles.

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
