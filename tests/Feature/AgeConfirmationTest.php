<?php

namespace Tests\Feature;

use Tests\TestCase;

class AgeConfirmationTest extends TestCase
{
    public function test_unconfirmed_visitors_get_gate_without_the_application_bundle(): void
    {
        foreach (['/', '/intranet', '/aplicar', '/app', '/finance', '/master'] as $path) {
            $this->get($path)->assertOk()->assertSee('¿Tienes 18 años o más?')->assertDontSee('id="app"', false)->assertDontSee('resources/js/app.tsx', false);
        }
    }

    public function test_confirmation_sets_cookie_and_keeps_the_destination(): void
    {
        $this->post('/age-confirmation', ['decision' => 'confirm', 'return_to' => '/intranet'])
            ->assertStatus(303)->assertRedirect('/intranet')->assertCookie('velvet_age', 'confirmed');
        $this->withCookie('velvet_age', 'confirmed')->get('/')->assertSee('id="app"', false)->assertDontSee('¿Tienes 18 años o más?');
    }

    public function test_declining_blocks_entry_and_cannot_be_overridden_by_posting_confirm(): void
    {
        $this->post('/age-confirmation', ['decision' => 'deny', 'return_to' => '/'])->assertCookie('velvet_age', 'denied');
        $this->withCookie('velvet_age', 'denied')->get('/')->assertSee('Acceso no permitido')->assertDontSee('name="decision"', false);
        $this->withCookie('velvet_age', 'denied')->post('/age-confirmation', ['decision' => 'confirm', 'return_to' => '/'])->assertCookie('velvet_age', 'denied');
    }

    public function test_invalid_confirmation_and_external_redirect_are_rejected(): void
    {
        $this->post('/age-confirmation', ['decision' => 'yes', 'return_to' => 'https://example.com'])->assertSessionHasErrors(['decision', 'return_to'])->assertCookieMissing('velvet_age');
    }

    public function test_unconfirmed_inertia_navigation_requires_the_gate(): void
    {
        $this->get('/intranet', ['X-Inertia' => 'true'])->assertStatus(409)->assertHeader('X-Inertia-Location', '/intranet');
    }
}
