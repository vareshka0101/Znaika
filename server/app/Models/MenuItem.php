<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'day',
        'category',
        'title',
        'description',
        'image',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function scopeDay($query, $day)
    {
        return $query->where('day', $day);
    }

    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
