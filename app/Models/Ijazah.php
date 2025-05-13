<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ijazah extends Model
{
    protected $guarded = ['id'];

    public function institusi()
    {
        return $this->belongsTo(Institusi::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
