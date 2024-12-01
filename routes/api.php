<?php

use App\Http\Controllers\BukuTamuController;
use App\Http\Controllers\DivisiController;
use App\Http\Controllers\InstitusiTamuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('buku-tamu', BukuTamuController::class);
Route::resource('divisi', DivisiController::class);
Route::resource('institusi-tamu', InstitusiTamuController::class);