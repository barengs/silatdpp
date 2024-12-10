<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SppdPengajuan extends Model
{
    protected $fillable = [
        'user_id',
        'nama_kegiatan',
        'tempat_kegiatan',
        'tanggal_kegiatan',
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
}
