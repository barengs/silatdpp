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
        Schema::create('buku_tamus', function (Blueprint $table) {
            $table->id();
            $table->string('nama_tamu');
            $table->string('alamat');
            $table->string('no_telpon');
            $table->foreignId('institusi_id')->constrained('institusis')->onDelete('cascade');
            $table->foreignId('divisi_id')->constrained('divisis')->onDelete('cascade');
            $table->text('keperluan');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buku_tamus');
    }
};
