<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DashboardData extends Model
{
    protected $fillable = ['user_id', 'role', 'data'];

    protected $casts = [
        'data' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}