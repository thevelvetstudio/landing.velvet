import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';

void createInertiaApp({
    title: (title) => title === 'VELVET' ? title : `${title} — VELVET`,
    resolve: (name) => resolvePageComponent<ComponentType>(`./pages/${name}.tsx`, import.meta.glob<ComponentType>('./pages/**/*.tsx', { import: 'default' })),
    setup({ el, App, props }) { createRoot(el).render(<App {...props} />); },
    progress: { color: '#d4d4d4', showSpinner: false },
});
