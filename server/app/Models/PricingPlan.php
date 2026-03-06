<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PricingPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'price',
        'period',
        'description',
        'features',
        'is_popular',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'price' => 'integer',
        'features' => 'array',
        'is_popular' => 'boolean',
        'is_active' => 'boolean'
    ];
}
