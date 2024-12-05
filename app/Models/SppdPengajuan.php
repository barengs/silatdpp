<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SppdPengajuan extends Model
{
    protected $fillable = [
        'user_id',
        'nama_kegiatan',
        'tempat_kegiatan',
        'tanggal_kegiatan',
    ];
}
