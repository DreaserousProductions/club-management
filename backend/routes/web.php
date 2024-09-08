<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MUserController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/users', [MUserController::class, 'index']);
Route::post('/users', [MUserController::class, 'store']);