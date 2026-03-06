<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'author',
        'child_name',
        'years_in_garden',
        'text',
        'rating',
        'date',
        'is_approved',
        'is_active'
    ];

    protected $casts = [
        'date' => 'date',
        'rating' => 'integer',
        'is_approved' => 'boolean',
        'is_active' => 'boolean'
    ];
}
