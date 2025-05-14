<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class History extends Model
{
    protected $fillable = ['nama'];

    public function sppds(): BelongsToMany
    {
        return $this->belongsToMany(SppdPengajuan::class, 'sppd_histories');
    }

    public function rekom()
    {
        return $this->belongsToMany(RekomHistory::class, 'rekom_histories');
    }
}
