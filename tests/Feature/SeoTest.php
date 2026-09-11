<?php

namespace Tests\Feature;

use Tests\TestCase;

class SeoTest extends TestCase
{
    public function test_home_metadata_is_in_the_original_html_and_query_strings_are_not_canonical(): void
    {
        config(['seo.indexable' => true, 'seo.url' => 'https://thevelvetstudio.co']);
        $response = $this->get('/?utm_source=test');
        $response->assertOk()
            ->assertSee('lang="es"', false)
            ->assertSee('<title data-inertia="">'.config('seo.title').'</title>', false)
            ->assertSee('href="https://thevelvetstudio.co/"', false)
            ->assertSee('content="index, follow, max-image-preview:large"', false)
            ->assertSee('https://thevelvetstudio.co/assets/og-velvet.png', false)
            ->assertDontSee('name="rating"', false);
        preg_match('/<script data-inertia="schema" type="application\/ld\+json">(.*?)<\/script>/s', $response->getContent(), $match);
        $schema = json_decode($match[1], true, 512, JSON_THROW_ON_ERROR);
        $this->assertSame('Organization', $schema['@graph'][0]['@type']);
        $this->assertSame(18, $schema['@graph'][2]['audience']['suggestedMinAge']);
    }

    public function test_internal_and_unfinished_pages_are_noindex_in_production(): void
    {
        config(['seo.indexable' => true]);
        foreach (['/intranet', '/aplicar', '/app', '/finance', '/master'] as $path) {
            $this->get($path)->assertOk()->assertSee('content="noindex, follow"', false)->assertDontSee('data-inertia="schema"', false);
        }
    }

    public function test_sitemap_only_includes_the_public_home_and_robots_allow_reading_noindex(): void
    {
        config(['seo.indexable' => true, 'seo.url' => 'https://thevelvetstudio.co']);
        $this->get('/robots.txt')->assertOk()->assertSee('Allow: /')->assertSee('Sitemap: https://thevelvetstudio.co/sitemap.xml');
        $xml = $this->get('/sitemap.xml')->assertOk()->assertHeader('Content-Type', 'application/xml; charset=UTF-8')->getContent();
        $sitemap = simplexml_load_string($xml);
        $this->assertNotFalse($sitemap);
        $this->assertCount(1, $sitemap->url);
        $this->assertSame('https://thevelvetstudio.co/', (string) $sitemap->url->loc);
    }

    public function test_preview_environments_are_not_indexable_and_explicit_rating_is_opt_in(): void
    {
        config(['seo.indexable' => false, 'seo.explicit_paths' => ['/']]);
        $this->get('/')->assertSee('content="noindex, follow"', false)->assertSee('name="rating" content="adult"', false);
        $this->get('/robots.txt')->assertSee('Disallow: /');
        $this->get('/sitemap.xml')->assertDontSee('<loc>', false);
    }
}
