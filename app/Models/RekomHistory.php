<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RekomHistory extends Model
{
    protected $gurded = ['id'];

    public function rekom()
    {
        return $this->belongsTo(Rekom::class);
    }

    public function history()
    {
        return $this->belongsTo(History::class);
    }
}
