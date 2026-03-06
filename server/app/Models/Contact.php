<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'message',
        'type',
        'additional_data',
        'is_processed'
    ];

    protected $casts = [
        'additional_data' => 'array',
        'is_processed' => 'boolean'
    ];
}
