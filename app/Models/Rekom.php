<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rekom extends Model
{
    protected $fillable = [
        'noreg',
        'user_id',
        'mitra_id',
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

    public function mitra()
    {
        return $this->belongsTo(Mitra::class);
    }
    public function institusi()
    {
        return $this->belongsTo(Institusi::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
