<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Landing')->name('home');
Route::inertia('/intranet', 'Intranet')->name('intranet');
Route::inertia('/aplicar', 'Apply')->name('apply');
Route::inertia('/app', 'App')->name('app');
Route::inertia('/finance', 'Finance')->name('finance');
Route::inertia('/master', 'Master')->name('master');
