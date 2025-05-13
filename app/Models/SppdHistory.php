<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SppdHistory extends Model
{
    protected $fillable = ['sppd_pengajuan_id', 'history_id'];

    public function sppd(): BelongsTo
    {
        return $this->belongsTo(SppdPengajuan::class);
    }

    public function history(): BelongsTo
    {
        return $this->belongsTo(History::class);
    }
}
