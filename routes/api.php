<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DivisiController;
use App\Http\Controllers\Api\BukuTamuController;
use App\Http\Controllers\Api\InstitusiTamuController;
use App\Http\Controllers\Api\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('buku-tamu', BukuTamuController::class);
Route::apiResource('divisi', DivisiController::class);
Route::apiResource('institusi-tamu', InstitusiTamuController::class);
Route::apiResource('user', UserController::class);