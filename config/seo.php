<?php

return [
    'url' => env('SEO_URL', 'https://thevelvetstudio.co'),
    'indexable' => env('SEO_INDEXABLE', env('APP_ENV') === 'production'),
    'name' => 'The Velvet Studio',
    'title' => 'The Velvet Studio | Estudio webcam y streaming para adultos',
    'locale' => 'es_CO',
    'language' => 'es-CO',
    'description' => 'Conoce The Velvet Studio: un estudio webcam diferente y una plataforma de streaming para adultos. Descubre nuestra identidad y cómo formar parte de VELVET.',
    'image' => '/assets/og-velvet.png',
    // Only mark pages that actually contain explicit content, not this institutional landing.
    'explicit_paths' => [],
];
