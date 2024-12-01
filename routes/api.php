<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DivisiController;
use App\Http\Controllers\Api\BukuTamuController;
use App\Http\Controllers\Api\InstitusiTamuController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\UserController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('register', RegisterController::class)->name('auth.register');
Route::post('login', AuthController::class)->name('auth.login');
Route::middleware('auth:api')->get('user', function (Request $request) {
    return $request->user();
});

Route::apiResource('buku-tamu', BukuTamuController::class);
Route::apiResource('divisi', DivisiController::class);
Route::apiResource('institusi-tamu', InstitusiTamuController::class);
// Route::apiResource('user', UserController::class);