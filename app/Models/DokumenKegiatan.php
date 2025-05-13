<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DokumenKegiatan extends Model
{
    //
    protected $fillable = ['sppd_pengajuan_id', 'nama_dokumen', 'alamat_dokumen', 'tipe_dokumen'];

    public function sppd(): BelongsTo
    {
        return $this->belongsTo(SppdPengajuan::class);
    }
}
