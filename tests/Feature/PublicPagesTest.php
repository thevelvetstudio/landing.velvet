<?php

namespace Tests\Feature;

use Inertia\Middleware;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PublicPagesTest extends TestCase
{
    public function test_public_pages_render_the_correct_inertia_components(): void
    {
        foreach (['/' => 'Landing', '/intranet' => 'Intranet', '/aplicar' => 'Apply', '/app' => 'App', '/finance' => 'Finance', '/master' => 'Master'] as $url => $component) {
            $this->get($url)->assertOk()->assertInertia(fn (Assert $page) => $page->component($component, false));
        }
    }

    public function test_client_navigation_receives_inertia_json(): void
    {
        foreach (['/' => 'Landing', '/intranet' => 'Intranet', '/aplicar' => 'Apply', '/app' => 'App', '/finance' => 'Finance', '/master' => 'Master'] as $url => $component) {
            $this->get($url, ['X-Inertia' => 'true', 'X-Inertia-Version' => app(Middleware::class)->version(request()) ?? ''])
                ->assertOk()->assertHeader('X-Inertia', 'true')->assertJsonPath('component', $component);
        }
    }
}
