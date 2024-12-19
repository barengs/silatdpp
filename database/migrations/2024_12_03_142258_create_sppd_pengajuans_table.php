<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sppd_pengajuans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('maksud_kegiatan');
            $table->string('tempat_berangkat');
            $table->timestamp('tanggal_kegiatan');
            $table->foreignId('alat_transportasi_id')->constrained()->cascadeOnDelete();
            $table->string('tempat_tujuan');
            $table->integer('lama_perjalanan')->nullable();
            $table->timestamp('tanggal_berangkat')->useCurrent();
            $table->timestamp('tanggal_kembali')->useCurrent();
            $table->foreignId('tingkat_biaya_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sppd_pengajuans');
    }
};
