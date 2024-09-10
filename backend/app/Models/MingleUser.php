<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MingleUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'rollnumber',
        'role',
        'otp',
        'registered',
        'name',
        'avatar_img_path',
        'clubs_enrolled_in',
        'club_admin'
    ];
    
    protected $table = 'mingle_users';
}
