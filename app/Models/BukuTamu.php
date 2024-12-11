<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BukuTamu extends Model
{
    //
    protected $fillable = [
        'nama_tamu',
        'alamat',
        'no_telpon',
        'institusi_tamu_id',
        'divisi_id',
        'keperluan',
        'user_id',
    ];

    public function institusi_tamu(): BelongsTo
    {
        return $this->belongsTo(InstitusiTamu::class);
    }

    public function divisi(): BelongsTo
    {
        return $this->belongsTo(Divisi::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
