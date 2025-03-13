<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SppdPengajuan extends Model
{
    protected $fillable = [
        'user_id',
        'maksud_kegiatan',
        'tempat_berangkat',
        'tanggal_kegiatan',
        'alat_transportasi_id',
        'tempat_tujuan',
        'lama_perjalanan',
        'tanggal_berangkat',
        'tanggal_kembali',
        'biaya_id',
    ];

    public function dokumens(): HasMany
    {
        return $this->hasMany(DokumenKegiatan::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function approval(): BelongsTo
    {
        return $this->belongsTo(SppdApproval::class);
    }

    public function history(): BelongsToMany
    {
        return $this->belongsToMany(History::class, 'sppd_histories');
    }

    public function biaya(): HasMany
    {
        return $this->hasMany(Biaya::class);
    }

    public function alat_transportasi(): BelongsTo
    {
        return $this->belongsTo(AlatTransportasi::class);
    }
}
