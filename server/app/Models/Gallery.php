<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'image',
        'title',
        'delay',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'delay' => 'integer',
        'sort_order' => 'integer',
        'is_active' => 'boolean'
    ];

    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
