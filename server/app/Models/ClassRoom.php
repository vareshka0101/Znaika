<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassRoom extends Model
{
    use HasFactory;

    protected $table = 'class_rooms';

    protected $fillable = [
        'title',
        'description',
        'image',
        'icon_class',
        'margin_top',
        'margin_bottom',
        'delay',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'margin_top' => 'integer',
        'margin_bottom' => 'integer',
        'delay' => 'integer',
        'sort_order' => 'integer',
        'is_active' => 'boolean'
    ];
}
