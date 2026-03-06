<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'type',
        'event_date',
        'time',
        'duration',
        'description',
        'icon',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'event_date' => 'date',
        'is_active' => 'boolean'
    ];

    public function scopeUpcoming($query)
    {
        return $query->where('type', 'upcoming');
    }

    public function scopeArchive($query)
    {
        return $query->where('type', 'archive');
    }
}
