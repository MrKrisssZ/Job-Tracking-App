<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    //
    protected $fillable = [
        'company',
        'position',
        'url',
        'status',
        'applied_at',
        'last_update',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
