<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'role',
        'description',
        'image',
        'subjects',
        'languages',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'subjects' => 'array',
        'languages' => 'array',
        'is_active' => 'boolean'
    ];
}
