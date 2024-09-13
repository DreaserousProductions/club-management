<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Club;
use App\Models\MingleUser;

class ClubJoinRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'club_id',
        'approved',
    ];

    /**
     * Get the student that owns the request.
     */
    public function user()
    {
        return $this->belongsTo(MingleUser::class);
    }

    /**
     * Get the club that owns the request.
     */
    public function club()
    {
        return $this->belongsTo(Club::class);
    }
}
