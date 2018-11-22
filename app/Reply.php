<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    public $glaicon;

    public function user()
    {
        return $this->belongsTo(\App\User::class);
    }

    public function thread()
    {
        return $this->belongsTo(\App\Thread::class);
    }
}