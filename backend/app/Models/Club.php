<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'president_id', // ID of the president
        'secretary_id', // ID of the secretary
        'treasurer_id', // ID of the treasurer
    ];

    // Define relationships
    public function president()
    {
        return $this->belongsTo(MingleUser::class, 'president_id');
    }

    public function secretary()
    {
        return $this->belongsTo(MingleUser::class, 'secretary_id');
    }

    public function treasurer()
    {
        return $this->belongsTo(MingleUser::class, 'treasurer_id');
    }

    // Use the pivot table for members
    public function members()
    {
        return $this->belongsToMany(MingleUser::class, 'club_member', 'club_id', 'member_id');
    }
}
