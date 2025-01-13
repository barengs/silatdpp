<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DivisiController;
use App\Http\Controllers\Api\BukuTamuController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\InstitusiController;
use App\Http\Controllers\Api\TingkatBiayaController;
use App\Http\Controllers\Api\SppdPengajuanController;
use App\Http\Controllers\Api\AlatTransportasiController;

Route::post('register', [AuthController::class, 'register'])->name('auth.register');
Route::post('login', [AuthController::class, 'login'])->name('auth.login');

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('auth.refresh');
    Route::post('user', [AuthController::class, 'me'])->name('auth.user');
});

// Route::post('login', AuthController::class)->name('auth.login');
// Route::middleware('auth:api')->get('user', function (Request $request) {
//     return $request->user();
// });

Route::apiResource('buku-tamu', BukuTamuController::class);
Route::apiResource('divisi', DivisiController::class);
Route::apiResource('institusi', InstitusiController::class);
Route::apiResource('sppd', SppdPengajuanController::class);
Route::apiResource('transportasi', AlatTransportasiController::class);
Route::apiResource('biaya', TingkatBiayaController::class);
// Route::apiResource('user', UserController::class);