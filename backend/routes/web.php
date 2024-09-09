<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\MUserController;

Route::get('/users', [MUserController::class, 'index']);
Route::post('/users', [MUserController::class, 'store']);