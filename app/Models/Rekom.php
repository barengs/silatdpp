<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rekom extends Model
{
    protected $fillables = [
        'regno',
        'user_id',
        'rekanan_id',
        'institusi_id',
        'nama_pejabat',
        'nip_pejabat',
        'nama_pejabat_pengganti',
        'nip_pejabat_pengganti',
        'alamat_pejabat_pengganti',
        'jabatan',
        'konten',
        'status',
    ];
}
