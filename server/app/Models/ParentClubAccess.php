<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentClubAccess extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'has_access',
        'accessed_at',
    ];

    protected $casts = [
        'has_access' => 'boolean',
        'accessed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
