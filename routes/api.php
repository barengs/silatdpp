<?php

use App\Http\Controllers\Api\MitraController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BeritaConroller;
use App\Http\Controllers\Api\BiayaController;
use App\Http\Controllers\Api\IjazahConroller;
use App\Http\Controllers\Api\RekomController;
use App\Http\Controllers\Api\DivisiController;
use App\Http\Controllers\Api\RekananController;
use App\Http\Controllers\Api\BukuTamuController;
use App\Http\Controllers\Api\KaryawanController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\InstitusiController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\SiswaPindahConroller;
use App\Http\Controllers\Api\SppdPengajuanController;
use App\Http\Controllers\Api\AlatTransportasiController;

Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('auth.refresh');
    Route::post('user', [AuthController::class, 'me'])->name('auth.user');
});

// Route::post('login', AuthController::class)->name('auth.login');
// Route::middleware('auth:api')->get('user', function (Request $request) {
//     return $request->user();
// });
Route::group(['middleware' => 'auth:api'], function () {
    Route::apiResource('buku-tamu', BukuTamuController::class);
    Route::apiResource('sppd', SppdPengajuanController::class);
    Route::post('sppd/{id}/approval', [SppdPengajuanController::class, 'approval'])->name('sppd.approval');
    Route::post('sppd/{id}/proses', [SppdPengajuanController::class, 'proses'])->name('sppd.proses');

});
Route::apiResource('divisi', DivisiController::class);
Route::apiResource('institusi', InstitusiController::class);
Route::apiResource('transportasi', AlatTransportasiController::class);
Route::apiResource('biaya', BiayaController::class);
Route::apiResource('mitra', MitraController::class);
Route::apiResource('rekom', RekomController::class);
Route::post('rekom/{id}/approval', [RekomController::class, 'approval'])->name('rekom.approval');
Route::post('rekom/{id}/proses', [RekomController::class, 'proses'])->name('rekom.proses');

Route::apiResource('karyawan', KaryawanController::class);
Route::apiResource('tugas', RoleController::class);
Route::apiResource('hak-akses', PermissionController::class);
Route::post('hak-akses-tugas', [RoleController::class, 'permissionRole'])->name('role-permission');

Route::apiResource('ijazah', IjazahConroller::class);
Route::apiResource('pindahan/siswa', SiswaPindahConroller::class);
Route::apiResource('berita', BeritaConroller::class);
