<?php

namespace App\Support;

use Illuminate\Http\Request;

class Seo
{
    public static function forRequest(Request $request): array
    {
        $base = rtrim(config('seo.url'), '/');
        $path = '/'.trim($request->path(), '/');
        $home = $path === '/';
        $title = $home ? config('seo.title') : match ($path) {
            '/aplicar' => 'Aplicar a The Velvet Studio | Próximamente',
            '/intranet' => 'Intranet | The Velvet Studio',
            default => 'Acceso al sistema | The Velvet Studio',
        };
        $description = $home ? config('seo.description') : ($path === '/aplicar'
            ? 'Próximamente podrás enviar tu solicitud para formar parte de The Velvet Studio. Un estudio webcam diferente, dirigido a personas mayores de 18 años.'
            : 'Acceso a los módulos del ecosistema de The Velvet Studio.');
        $canonical = $base.$path;

        return [
            'title' => $title,
            'description' => $description,
            'canonical' => $canonical,
            'robots' => $home && config('seo.indexable') ? 'index, follow, max-image-preview:large' : 'noindex, follow',
            'name' => config('seo.name'),
            'image' => $base.config('seo.image'),
            'explicit' => in_array($path, config('seo.explicit_paths'), true),
            'schema' => $home ? [
                '@context' => 'https://schema.org',
                '@graph' => [
                    ['@type' => 'Organization', '@id' => $base.'/#organization', 'name' => config('seo.name'), 'url' => $base.'/', 'logo' => $base.'/assets/LOGO.svg', 'description' => $description],
                    ['@type' => 'WebSite', '@id' => $base.'/#website', 'url' => $base.'/', 'name' => config('seo.name'), 'inLanguage' => 'es', 'publisher' => ['@id' => $base.'/#organization']],
                    ['@type' => 'WebPage', '@id' => $base.'/#webpage', 'url' => $canonical, 'name' => $title, 'description' => $description, 'inLanguage' => 'es', 'isPartOf' => ['@id' => $base.'/#website'], 'audience' => ['@type' => 'PeopleAudience', 'suggestedMinAge' => 18]],
                ],
            ] : null,
        ];
    }
}
