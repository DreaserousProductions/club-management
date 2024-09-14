<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MingleUserController;
use App\Http\Controllers\ClubJoinController;
use App\Http\Controllers\ClubController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::get('/users', [MingleUserController::class, 'index']);
Route::post('/otp/send', [MingleUserController::class, 'sendOtp']);
Route::post('/otp/verify', [MingleUserController::class, 'verifyOtp']);
Route::post('/user/create-password', [MingleUserController::class, 'createPassword']);
Route::post('/user/login', [MingleUserController::class, 'login']);

// Route::get('/get-clubs', [ClubController::class, 'index']);

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::get('/get-clubs', [ClubController::class, 'index'])->middleware('jwt.auth');
    Route::get('/get-club/{id}', [ClubController::class, 'getClub'])->middleware('jwt.auth');
    Route::post('/join-club', [ClubJoinController::class, 'store'])->middleware('jwt.auth');
    Route::post('/update-profile', [MingleUserController::class, 'updateProfile'])->middleware('jwt.auth');
});