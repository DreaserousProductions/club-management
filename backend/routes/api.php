<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MUserController;

Route::get('/users', [MUserController::class, 'index']);
Route::post('/users', [MUserController::class, 'store']);