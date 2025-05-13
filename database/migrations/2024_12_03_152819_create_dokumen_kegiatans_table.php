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
        Schema::create('dokumen_kegiatans', function (Blueprint $table) {
            $table->id();
            $table->text('nama_dokumen');
            $table->text('alamat_dokumen');
            $table->string('tipe_dokumen');
            $table->foreignId('sppd_pengajuan_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_kegiatans');
    }
};
