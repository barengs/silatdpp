<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RekomApproval extends Model
{
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function rekom()
    {
        return $this->belongsTo(Rekom::class);
    }
}
