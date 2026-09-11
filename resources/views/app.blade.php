<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @php($seo = \App\Support\Seo::forRequest(request()))
        <meta data-inertia="description" name="description" content="{{ $seo['description'] }}">
        <meta data-inertia="robots" name="robots" content="{{ $seo['robots'] }}">
        <link data-inertia="canonical" rel="canonical" href="{{ $seo['canonical'] }}">
        @foreach (['type' => 'website', 'site_name' => $seo['name'], 'locale' => 'es_CO', 'title' => $seo['title'], 'description' => $seo['description'], 'url' => $seo['canonical'], 'image' => $seo['image'], 'image:width' => '1200', 'image:height' => '630', 'image:alt' => 'The Velvet Studio — Un estudio webcam diferente'] as $key => $value)
            <meta data-inertia="og:{{ $key }}" property="og:{{ $key }}" content="{{ $value }}">
        @endforeach
        @foreach (['card' => 'summary_large_image', 'title' => $seo['title'], 'description' => $seo['description'], 'image' => $seo['image']] as $key => $value)
            <meta data-inertia="twitter:{{ $key }}" name="twitter:{{ $key }}" content="{{ $value }}">
        @endforeach
        @if ($seo['explicit'])
            <meta data-inertia="rating" name="rating" content="adult">
        @endif
        @if ($seo['schema'])
            <script data-inertia="schema" type="application/ld+json">{!! json_encode($seo['schema'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) !!}</script>
        @endif
        <meta name="theme-color" content="#050505">
        <meta name="color-scheme" content="dark">
        <title data-inertia="">{{ $seo['title'] }}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        @vite('resources/css/app.css')
        @if (request()->cookie('velvet_age') === 'confirmed')
            @viteReactRefresh
            @vite('resources/js/app.tsx')
        @endif
        @inertiaHead
    </head>
    <body>
        @if (request()->cookie('velvet_age') === 'confirmed')
            @inertia
            <noscript><p>The Velvet Studio: un estudio webcam diferente. Plataforma de streaming para adultos, exclusivamente para mayores de 18 años. Activa JavaScript para explorar VELVET.</p></noscript>
        @else
            @include('age-gate')
        @endif
    </body>
</html>
