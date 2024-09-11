<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // Change this to extend Authenticatable
use Tymon\JWTAuth\Contracts\JWTSubject; // JWTSubject interface

class MingleUser extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $fillable = [
        'rollnumber',
        'role',
        'otp',
        'registered',
        'password',
        'name',
        'avatar_img_path',
        'clubs_enrolled_in',
        'club_admin'
    ];

    protected $table = 'mingle_users';

    // Add JWT methods
    /**
     * Get the identifier that will be stored in the JWT subject claim.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey(); // Typically the primary key (id or rollnumber)
    }

    /**
     * Return a key-value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        // Add any custom claims you want to include in the token
        return [];
    }
}
