<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SeoController extends Controller
{
    public function robots(): Response
    {
        $rules = config('seo.indexable') ? "Allow: /\n" : "Disallow: /\n";

        return response("User-agent: *\n".$rules.'Sitemap: '.rtrim(config('seo.url'), '/')."/sitemap.xml\n", 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }

    public function sitemap(): Response
    {
        return response()->view('sitemap', ['base' => rtrim(config('seo.url'), '/'), 'indexable' => config('seo.indexable')])->header('Content-Type', 'application/xml; charset=UTF-8');
    }
}
