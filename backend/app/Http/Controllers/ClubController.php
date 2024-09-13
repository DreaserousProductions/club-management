<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Club;

class ClubController extends Controller
{
    // Display a listing of the clubs
    public function index()
    {
        $clubs = Club::select('id', 'name', DB::raw("JSON_EXTRACT(description, '$.about_us') as about_us"))->get();
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
