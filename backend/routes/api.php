<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MingleUserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::get('/users', [MingleUserController::class, 'index']);
Route::post('/registration', [MingleUserController::class, 'sendOtp']);
Route::post('/verifyingRegistration', [MingleUserController::class, 'verifyOtp']);