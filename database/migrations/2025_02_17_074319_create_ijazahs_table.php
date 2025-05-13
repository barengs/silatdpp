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
        Schema::create('ijazahs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('institusi_id')->constrained('institusis')->onDelete('cascade');
            $table->string('nomor_ijazah');
            $table->string('nama_siswa');
            $table->string('nis');
            $table->string('perubahan');
            $table->text('alasan');
            $table->string('file');
            $table->foreignId('user_id');
            $table->enum('status', ['pengajuan', 'diproses', 'selesai'])->default('pengajuan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ijazahs');
    }
};
