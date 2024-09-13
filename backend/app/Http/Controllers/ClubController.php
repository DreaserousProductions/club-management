<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Club;

class ClubController extends Controller
{
    // Display a listing of the clubs
    public function index()
    {
        // try {
        //     if (!$user = JWTAuth::parseToken()->authenticate()) {
        //         return response()->json(['message' => 'User not found'], 404);
        //     }
        // } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
        //     return response()->json(['message' => 'Token expired'], 401);
        // } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
        //     return response()->json(['message' => 'Token invalid'], 401);
        // } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
        //     return response()->json(['message' => 'Token absent'], 401);
        // }

        $clubs = Club::all();
        return response()->json($clubs);
    }

    public function getClub($id, Request $request)
    {
        // Validate the request for authentication token
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Find the club by id
        $club = Club::find($id);
        
        // Check if the club was found
        if (!$club) {
            return response()->json(['error' => 'Club not found'], 404);
        }

        return response()->json($club);
    }
}
