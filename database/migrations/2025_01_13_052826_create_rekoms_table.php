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
        Schema::create('rekoms', function (Blueprint $table) {
            $table->id();
            $table->string('noreg');
            $table->foreignId('institusi_tujuan_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('institusi_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->string('nama_pejabat');
            $table->string('nip_pejabat')->nullable();
            $table->string('nama_pejabat_pengganti')->nullable();
            $table->string('nip_pejabat_pengganti')->nullable();
            $table->string('alamt_pejabat_pengganti')->nullable();
            $table->string('jabatan')->nullable();
            $table->text('konten')->nullable();
            $table->enum('status', ['pengajuan', 'proses', 'disetuji'])->default('pengajuan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekoms');
    }
};
