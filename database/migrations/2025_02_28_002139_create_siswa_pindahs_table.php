<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('siswa_pindahs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sekolah_asal_id');
            $table->unsignedBigInteger('sekolah_tujuan_id');
            $table->string('nama_siswa');
            $table->string('nis');
            $table->enum('jenis_kelamin', ['l', 'p'])->default('l');
            $table->string('tingkat_kelas');
            $table->string('nama_wali');
            $table->string('alamat_wali');
            $table->string('kontak_wali');
            $table->enum('status', ['proses', 'disetujui'])->default('proses');
            $table->string('file')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswa_pindahs');
    }
};
