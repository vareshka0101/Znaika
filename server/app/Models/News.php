<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'date',
        'image',
        'views',
        'excerpt',
        'content',
        'tags',
        'is_active'
    ];

    protected $casts = [
        'date' => 'date',
        'tags' => 'array',
        'is_active' => 'boolean'
    ];
}
