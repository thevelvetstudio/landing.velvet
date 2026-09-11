<?php

use App\Http\Controllers\AgeConfirmationController;
use App\Http\Controllers\SeoController;
use Illuminate\Support\Facades\Route;

Route::get('/robots.txt', [SeoController::class, 'robots']);
Route::get('/sitemap.xml', [SeoController::class, 'sitemap']);

Route::inertia('/', 'Landing')->name('home');
Route::post('/age-confirmation', [AgeConfirmationController::class, 'store'])->middleware('throttle:20,1')->name('age.confirm');
Route::inertia('/intranet', 'Intranet')->name('intranet');
Route::inertia('/aplicar', 'Apply')->name('apply');
Route::inertia('/app', 'App')->name('app');
Route::inertia('/finance', 'Finance')->name('finance');
Route::inertia('/master', 'Master')->name('master');
