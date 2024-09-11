<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MingleUserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::get('/users', [MingleUserController::class, 'index']);
Route::post('/otp/send', [MingleUserController::class, 'sendOtp']);
Route::post('/otp/verify', [MingleUserController::class, 'verifyOtp']);
Route::post('/user/create-password', [MingleUserController::class, 'createPassword']);
Route::post('/user/login', [MingleUserController::class, 'login']);

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::get('/member', [MemberController::class, 'index']);
});