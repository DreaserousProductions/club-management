<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $table = 'announcements'; // Explicitly define the table name if it doesn't follow Laravel's convention

    protected $fillable = [
        'author_name',
        'club_id',
        'title',
        'content',
    ];
}
