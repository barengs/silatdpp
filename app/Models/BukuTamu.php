<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
