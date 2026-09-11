<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AgeConfirmationController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'decision' => ['required', Rule::in(['confirm', 'deny'])],
            'return_to' => ['required', Rule::in(['/', '/intranet', '/aplicar', '/app', '/finance', '/master'])],
        ]);

        $confirmed = $data['decision'] === 'confirm' && $request->cookie('velvet_age') !== 'denied';

        return redirect($data['return_to'], 303)->withCookie(cookie(
            'velvet_age',
            $confirmed ? 'confirmed' : 'denied',
            $confirmed ? 60 * 24 * 30 : 60 * 24,
            '/',
            null,
            $request->isSecure(),
            true,
            false,
            'lax',
        ));
    }
}
