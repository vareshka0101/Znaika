<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumTopic extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'views',
        'is_pinned',
        'is_locked'
    ];

    protected $casts = [
        'views' => 'integer',
        'is_pinned' => 'boolean',
        'is_locked' => 'boolean',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function posts()
    {
        return $this->hasMany(ForumPost::class);
    }


    public function getRepliesCountAttribute()
    {
        return $this->posts()->count();
    }
}
