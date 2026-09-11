<?php

namespace App\Http\Middleware;

use App\Support\Seo;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Middleware;
use Symfony\Component\HttpFoundation\Response;

class HandleInertiaRequests extends Middleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->isMethod('GET') && $request->header('X-Inertia') && $request->cookie('velvet_age') !== 'confirmed') {
            return Inertia::location($request->getRequestUri());
        }

        return parent::handle($request, $next);
    }

    public function share(Request $request): array
    {
        return [...parent::share($request), 'seo' => Seo::forRequest($request)];
    }
}
